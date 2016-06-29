import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
  clientId: { type: String, unique: true },
  clientSecret: { type: String, required: true }
})

export default mongoose.model('Client', clientSchema)
