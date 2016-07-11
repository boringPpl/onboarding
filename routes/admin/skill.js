import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import SkillList from '../../views/containers/admin/skill/List'
import SkillForm from '../../views/containers/admin/skill/Form'
import process from '../../lib/processData'

const Skill = mongoose.model('Skill')
const skillPresenter = {
  id: data => data._id.toString(),
  name: 'name',
  course: data => data.course && data.course.name,
  parent: data => data.parent && data.parent.name
}

export async function list (req, res, next) {
  try {
    let skills = await Skill.find().populate('course parent').exec()
    console.log(skills)
    const initialData = {
      error: req.flash('error'),
      skills: skills.map(skill => process(skill, skillPresenter))
    }
    res.render('index', {
      html: ReactDOM.renderToString(<SkillList data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err.message)
  }
}

export async function newSkill (req, res, next) {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<SkillForm data={initialData} />),
    data: JSON.stringify(initialData)
  })
}

export async function create (req, res, next) {
  try {
    let { name, description, course, parent } = req.body
    await Skill.create({ name, description, course, parent })
    res.redirect('/admin/skills/new')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
