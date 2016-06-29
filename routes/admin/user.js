import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import UserList from '../../views/containers/admin/user/List'
import UserForm from '../../views/containers/admin/user/Form'
import process from '../../lib/processData'

const User = mongoose.model('User')
const userPresenter = {
  id: data => data._id.toString(),
  name: data => data.name.full,
  email: 'email',
  roles: 'roles'
}

export async function newUser (req, res, next) {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<UserForm data={initialData} />),
    data: JSON.stringify(initialData)
  })
}

export async function create (req, res, next) {
  try {
    let {
      first_name: first,
      last_name: last,
      email,
      password,
      roles
    } = req.body
    await User.create({ name: { first, last }, email, password, roles })
    res.redirect('/admin/users')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}

export async function list (req, res, next) {
  try {
    let users = await User.find().exec()
    const initialData = {
      error: req.flash('error'),
      users: users.map(user => process(user, userPresenter))
    }
    res.render('index', {
      html: ReactDOM.renderToString(<UserList data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err)
  }
}

export async function get (req, res, next) {
}
