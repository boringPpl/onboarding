import mongoose from 'mongoose'
import process from '../../lib/processData'

const Course = mongoose.model('Course')
const Skill = mongoose.model('Skill')

const coursePresenter = {
  id: data => data._id.toString(),
  name: 'name'
}
const skillPresenter = {
  id: data => data._id.toString(),
  name: 'name'
}

export async function listCourse (req, res, next) {
  try {
    let courses = await Course.find().exec()
    res.send(courses.map(course => process(course, coursePresenter)))
  } catch (err) {
    res.send(err)
  }
}

export async function listSkill (req, res, next) {
  try {
    let skills = await Skill.find().exec()
    res.send(skills.map(skill => process(skill, skillPresenter)))
  } catch (err) {
    res.send(err)
  }
}
