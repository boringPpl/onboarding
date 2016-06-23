import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Dashboard from '../../containers/admin/Dashboard'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', {
    html: ReactDOM.renderToString(<Dashboard />),
    js: 'dashboard',
    css: 'dashboard'
  })
})

export default router
