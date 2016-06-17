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
    let { first_name: first, last_name: last, email, password, isAdmin } = req.body
    let newUser = await User.create({ name: { first, last }, email, password, isAdmin })
    res.send(newUser)
  } catch (err) {
    res.sendStatus(500)
  }
}
