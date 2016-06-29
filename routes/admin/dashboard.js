import React from 'react'
import ReactDOM from 'react-dom/server'
import Dashboard from '../../views/containers/admin/Dashboard'

export async function index (req, res, next) {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<Dashboard data={initialData} />),
    data: JSON.stringify(initialData)
  })
}
