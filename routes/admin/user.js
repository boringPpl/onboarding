import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import UserList from '../../views/containers/admin/user/List'
import UserForm from '../../views/containers/admin/user/Form'
import process from '../../lib/processData'

const User = mongoose.model('User')
const userPresenter = {
  id: data => data._id.toString(),
  firstname: data => data.name.first,
  lastname: data => data.name.last,
  fullname: data => data.name.full,
  email: 'email',
  roles: 'roles'
}

export async function list (req, res, next) {
  try {
    let users = await User.find().exec()
    let initialData = {
      settings: req.cookies,
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

export async function newUser (req, res, next) {
  let initialData = {
    settings: req.cookies,
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<UserForm data={initialData} />),
    data: JSON.stringify(initialData)
  })
}

export async function get (req, res, next) {
  try {
    let user = await User.findById(req.params.id).exec()
    let initialData = {
      settings: req.cookies,
      error: req.flash('error'),
      user: process(user, userPresenter)
    }
    res.render('index', {
      html: ReactDOM.renderToString(<UserForm data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err)
  }
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

export async function update (req, res, next) {
  try {
    let user = await User.findById(req.params.id).exec()
    let {
      first_name: first,
      last_name: last,
      email,
      password,
      roles
    } = req.body
    user.name.first = first
    user.name.last = last
    user.email = email
    user.roles = roles
    if (password) user.password = password
    await user.save()
    res.redirect('/admin/users')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}

export async function remove (req, res, next) {
  try {
    await User.remove({ _id: req.params.id }).exec()
    res.redirect('/admin/users')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
