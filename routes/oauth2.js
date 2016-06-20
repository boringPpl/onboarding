import mongoose from 'mongoose'
import oauth2orize from 'oauth2orize'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const server = oauth2orize.createServer()

const User = mongoose.model('User')

server.exchange(oauth2orize.exchange.password(
  async (client, username, password, scope, done) => {
    try {
      let user = await User.findOne({ email: username }).exec()
      if (!user) return done(null, false)

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false)

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY)
        done(null, accessToken)
      })
    } catch (err) {
      done(err)
    }
  }
))

export default {
  token: [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
  ]
}
