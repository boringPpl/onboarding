import mongoose from 'mongoose'

const skillSchema = mongoose.Schema({
  name: { type: String, index: true, required: true, maxlength: 255 },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
  prerequisite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
})

export default mongoose.model('Skill', skillSchema)
