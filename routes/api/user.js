import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

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
  let { email, rights = [], user_info = {} } = req.body // eslint-disable-line
  if (!email) { return res.status(400).send({ error: 'Missing email' }) }
  let newUser = new User({ email, rights, ...user_info }) // eslint-disable-line
  newUser.save((err, user) => {
    if (err) { return res.status(500).send(err) }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY)
    return res.send({ token })
  })
}

export function setPassword (req, res, next) {
  let { password } = req.body
  const user = req.user
  if (!user) { return res.status(401).send('Unauthorized') }
  if (!password) { return res.status(400).send({ error: 'Missing password' }) }
  User.findById(user._id, (err, foundUser) => {
    if (err) { return res.status(500).send(err) }
    foundUser.password = password
    foundUser.save()
    return res.send({ msg: 'Set password successfully' })
  })
}
