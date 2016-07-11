import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
  name: { type: String, index: true, required: true, maxlength: 255 },
  description: { type: String }
})

mongoose.model('Course', courseSchema)

export default courseSchema
