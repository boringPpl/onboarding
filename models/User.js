import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' }
  },
  email: { type: String, unique: true, index: true, required: true },
  password: { type: String },
  githubId: { type: String },
  githubProfile: mongoose.Schema.Types.Mixed,
  githubOrganizations: mongoose.Schema.Types.Mixed,
  linkedinProfile: { type: String },
  roles: {
    type: [{ type: String, enum: ['admin', 'contributor', 'teacher'] }],
    default: []
  },
  settings: {
    publicGithubProfile: { type: Boolean, default: false },
    publicLinkedinProfile: { type: Boolean, default: false }
  },
  referredBy: { type: String },
  rights: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  user_info: mongoose.Schema.Types.Mixed
})

userSchema.pre('save', function (next) {
  if (!this.password) return next()
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

userSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

mongoose.model('User', userSchema)

export default userSchema
