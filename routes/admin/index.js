import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Dashboard from '../../views/containers/admin/Dashboard'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', {
    html: ReactDOM.renderToString(<Dashboard />)
  })
})

export default router
