import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
  clientId: { type: String, unique: true },
  clientSecret: String
})

export default mongoose.model('Client', clientSchema)
