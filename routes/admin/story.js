import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import StoryList from '../../views/containers/admin/story/List'
import StoryForm from '../../views/containers/admin/story/Form'
import process from '../../lib/processData'

const Story = mongoose.model('Story')
const storyPresenter = {
  id: data => data._id.toString(),
  name: 'name',
  course: data => data.course && data.course.name,
  parent: data => data.parent && data.parent.name,
  skill: data => data.skill.map(skill => skill.name)
}

export async function list (req, res, next) {
  try {
    let stories = await Story.find().populate('course parent skill').exec()
    const initialData = {
      error: req.flash('error'),
      stories: stories.map(story => process(story, storyPresenter))
    }
    res.render('index', {
      html: ReactDOM.renderToString(<StoryList data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err.message)
  }
}

export async function newStory (req, res, next) {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<StoryForm data={initialData} />),
    data: JSON.stringify(initialData)
  })
}

export async function create (req, res, next) {
  try {
    let { name, description, course, parent, skill } = req.body
    await Story.create({ name, description, course, parent, skill })
    res.redirect('/admin/stories/new')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
