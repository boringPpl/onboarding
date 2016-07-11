import mongoose from 'mongoose'

const storySchema = mongoose.Schema({
  name: { type: String, index: true, required: true, maxlength: 255 },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
})

mongoose.model('Story', storySchema)

export default storySchema
