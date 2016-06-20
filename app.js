import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
// import multer from 'multer'
// import favicon from 'serve-favicon'

// load environment variables
dotenv.config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI)

import './models'
import routes from './routes/index'
import api from './routes/api'
import admin from './routes/admin'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)
app.use('/api/v1', api)
app.use('/admin', admin)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

export default app
