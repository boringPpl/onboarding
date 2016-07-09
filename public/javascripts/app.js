import React from 'react'
import ReactDOM from 'react-dom'
import RoutePattern from 'route-pattern'
import 'flexboxgrid'
import 'stylesheets/style.css'
import 'containers/login.css'
import 'containers/admin/layout.css'

require.context('../images', false, /^.*$/)

const loadLogin = require('bundle?lazy&name=Login!containers/Login')
const loadDashboard = require('bundle?lazy&name=Dashboard!containers/admin/Dashboard')
const loadUserList = require('bundle?lazy&name=UserList!containers/admin/user/List')
const loadUserForm = require('bundle?lazy&name=UserForm!containers/admin/user/Form')
const loadClientList = require('bundle?lazy&name=ClientList!containers/admin/client/List')
const loadCourseList = require('bundle?lazy&name=CourseList!containers/admin/course/List')
const loadCourseForm = require('bundle?lazy&name=CourseForm!containers/admin/course/Form')
const loadSkillForm = require('bundle?lazy&name=SkillForm!containers/admin/skill/Form')

const routes = [
  { pattern: RoutePattern.fromString('/login'), loadComponent: loadLogin },
  { pattern: RoutePattern.fromString('/admin'), loadComponent: loadDashboard },
  { pattern: RoutePattern.fromString('/admin/users'), loadComponent: loadUserList },
  { pattern: RoutePattern.fromString('/admin/users/new'), loadComponent: loadUserForm },
  { pattern: RoutePattern.fromString('/admin/users/:id'), loadComponent: loadUserForm },
  { pattern: RoutePattern.fromString('/admin/clients'), loadComponent: loadClientList },
  { pattern: RoutePattern.fromString('/admin/courses'), loadComponent: loadCourseList },
  { pattern: RoutePattern.fromString('/admin/courses/new'), loadComponent: loadCourseForm },
  { pattern: RoutePattern.fromString('/admin/skills/new'), loadComponent: loadSkillForm }
]

const currentRoute = routes.find(({ pattern }) => pattern.matches(window.location.pathname))
const data = window.__INITIAL_DATA__

if (currentRoute) {
  currentRoute.loadComponent(Component => {
    ReactDOM.render(<Component data={data} />, document.getElementById('react-root'))
  })
}
