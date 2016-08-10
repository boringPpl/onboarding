import mongoose from 'mongoose'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import request from 'request-promise'
import find from 'lodash/find'
import { Strategy as LocalStrategy } from 'passport-local'
import { BasicStrategy } from 'passport-http'
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as GitHubStrategy } from 'passport-github2'

const Client = mongoose.model('Client')
const User = mongoose.model('User')

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      let user = await User.findOne({ email }).exec()
      if (!user) return done(null, false, { message: 'This email is not existed.' })
      if (!user.roles.length) return done(null, false, { message: 'Not authorized.' })

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false, { message: 'Wrong password.' })

        done(null, user)
      })
    } catch (err) {
      done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  let { _id, email, name, roles } = user
  done(null, { _id, email, name, roles })
})

passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser)
})

passport.use(new BasicStrategy(
  async (clientId, clientSecret, done) => {
    try {
      let client = await Client.findOne({ clientId }).exec()
      if (!client) return done(null, false)
      if (client.clientSecret !== clientSecret) return done(null, false)
      return done(null, client)
    } catch (err) {
      done(err)
    }
  }
))

passport.use(new ClientPasswordStrategy(
  async (clientId, clientSecret, done) => {
    try {
      let client = await Client.findOne({ clientId }).exec()
      if (!client) return done(null, false)
      if (client.clientSecret !== clientSecret) return done(null, false)
      return done(null, client)
    } catch (err) {
      done(err)
    }
  }
))

passport.use(new BearerStrategy(
  async (accessToken, done) => {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_KEY)
      let user = await User.findById(decoded.userId).select('_id name email').exec()
      if (!user) return done(null, false)
      done(null, user)
    } catch (err) {
      done(err)
    }
  }
))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let emails = await request.get({ url: `https://api.github.com/user/emails?access_token=${accessToken}`, headers: { 'user-agent': 'node.js' } })
    let orgs = await request.get({ url: `https://api.github.com/user/orgs?access_token=${accessToken}`, headers: { 'user-agent': 'node.js' } })
    let primaryEmail = find(JSON.parse(emails), 'primary').email
    let user = await User.findOne({ email: primaryEmail }).exec()

    if (user) {
      user.githubId = profile.id
      user.githubProfile = profile
      user.githubOrganizations = JSON.parse(orgs)
    } else {
      user = new User({
        email: primaryEmail,
        githubId: profile.id,
        githubProfile: profile,
        githubOrganizations: JSON.parse(orgs)
      })
    }
    await user.save()
    done(null, user)
  } catch (err) {
    done(err)
  }
}))
