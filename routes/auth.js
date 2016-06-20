import mongoose from 'mongoose'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Strategy as LocalStrategy } from 'passport-local'
import { BasicStrategy } from 'passport-http'
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

const Client = mongoose.model('Client')
const User = mongoose.model('User')

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (username, password, done) => {
    try {
      let user = await User.findOne({ email: username }).exec()
      if (!user) return done(null, false)

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false)

        done(null, user)
      })
    } catch (err) {
      done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
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
