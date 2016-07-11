import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
  clientId: { type: String, unique: true },
  clientSecret: { type: String, required: true }
})

mongoose.model('Client', clientSchema)

export default clientSchema
