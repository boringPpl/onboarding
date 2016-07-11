import mongoose from 'mongoose'
import storySchema from './Story'

const requestSchema = mongoose.Schema({
  doc: storySchema
})

mongoose.model('Request', requestSchema)

export default requestSchema
