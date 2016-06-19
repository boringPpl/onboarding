import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' }
  },
  email: { type: String, unique: true, index: true, required: true },
  password: { type: String },
  isAdmin: { type: Boolean }
})

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

export default mongoose.model('User', userSchema)
