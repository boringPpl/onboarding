import express from 'express'
import passport from 'passport'
import React from 'react'
import ReactDOM from 'react-dom/server'
import './auth'
import oauth2 from './oauth2'
import Login from '../containers/Login'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/login', (req, res, next) => {
  res.render('index', {
    html: ReactDOM.renderToString(<Login />),
    js: 'login',
    css: 'login'
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login'
}))

router.post('/oauth/token', oauth2.token)
router.use('/api', passport.authenticate('bearer', { session: false }))
router.use('/admin', (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
})

export default router
