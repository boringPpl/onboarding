import mongoose from 'mongoose'
const User = mongoose.model('User')

export async function list (req, res, next) {
  try {
    let users = await User.find().exec()
    res.send(users)
  } catch (err) {
    res.send(err)
  }
}

export async function create (req, res, next) {
  try {
    let { first_name: first, last_name: last, email, password, roles } = req.body
    let newUser = await User.create({ name: { first, last }, email, password, roles })
    res.send(newUser)
  } catch (err) {
    res.send(err)
  }
}

export function createUser (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ error: 'Missing email or password' })
  }
  let userData = {
    email: req.body.email,
    password: req.body.password,
    rights: req.body.rights || [],
    user_info: req.body.user_info || {}
  }
  if (userData.user_info.firstname || userData.user_info.lastname) {
    userData.name = {
      first: userData.user_info.firstname,
      last: userData.user_info.lastname
    }
    delete userData.user_info.firstname
    delete userData.user_info.lastname
  }
  let newUser = new User(userData)
  newUser.save((err, user) => {
    if (err) {
      let message = 'Sign up failed. Please try again later'
      if (err.code && err.code === 11000) {
        message = 'User already exists.'
      }
      return res.status(500).send({ error: message })
    }
    return res.send({ status: 'success' })
  })
}
