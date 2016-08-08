import express from 'express'
import passport from 'passport'
import React from 'react'
import ReactDOM from 'react-dom/server'
import './auth'
import oauth2 from './oauth2'
import Login from '../views/containers/Login'
import Home from '../views/containers/Home'
import * as middlewares from './middlewares'

const router = express.Router()

router.get('/', (req, res, next) => {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<Home data={initialData} />),
    data: JSON.stringify(initialData)
  })
})

router.get('/login', (req, res, next) => {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<Login data={initialData} />),
    data: JSON.stringify(initialData)
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/oauth/token', oauth2.token)
router.use('/api', passport.authenticate('bearer', { session: false }))
router.use('/admin', middlewares.ensureAuthorized)
router.use('/profiles', middlewares.ensureAuthenticated)

/* Github */
router.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email', 'repo'] }))

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`/profiles/${req.user._id}/update`)
  })

export default router
