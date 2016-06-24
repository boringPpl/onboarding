import React from 'react'
import ReactDOM from 'react-dom'
import RoutePattern from 'route-pattern'
import 'flexboxgrid'
import 'stylesheets/style.css'
import 'containers/login.css'

require.context('../images', false, /^.*$/)

const loadLogin = require('bundle?lazy&name=Login!containers/Login')
const loadDashboard = require('bundle?lazy&name=Dashboard!containers/admin/Dashboard')
const routes = [
  { pattern: RoutePattern.fromString('/login'), loadComponent: loadLogin },
  { pattern: RoutePattern.fromString('/admin'), loadComponent: loadDashboard }
]

const currentRoute = routes.find(({ pattern }) => pattern.matches(window.location.pathname))
const data = window.__INITIAL_DATA__

currentRoute.loadComponent(Component => {
  ReactDOM.render(<Component data={data} />, document.getElementById('react-root'))
})
