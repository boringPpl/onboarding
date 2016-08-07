import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import StoryList from '../../views/containers/admin/story/List'
import StoryForm from '../../views/containers/admin/story/Form'
import process from '../../lib/processData'

let coursePresenter, parentStoryPresenter, skillPresenter
coursePresenter = parentStoryPresenter = skillPresenter = {
  id: data => data._id.toString(),
  name: 'name'
}
const Story = mongoose.model('Story')
const storyPresenter = {
  id: data => data._id.toString(),
  name: 'name',
  description: 'description',
  course: data => data.course ? process(data.course, coursePresenter) : {},
  parent: data => data.parent ? process(data.parent, parentStoryPresenter) : {},
  skill: data => data.skill.map(skill => process(skill, skillPresenter))
}

export async function list (req, res, next) {
  try {
    let stories = await Story.find().populate('course parent skill').exec()
    const initialData = {
      settings: req.cookies,
      error: req.flash('error'),
      stories: stories.map(story => process(story, storyPresenter))
    }
    res.render('index', {
      html: ReactDOM.renderToString(<StoryList data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err)
  }
}

export async function newStory (req, res, next) {
  const initialData = {
    settings: req.cookies,
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<StoryForm data={initialData} />),
    data: JSON.stringify(initialData)
  })
}

export async function get (req, res, next) {
  try {
    let story = await Story.findById(req.params.id).populate('course parent skill').exec()
    const initialData = {
      settings: req.cookies,
      error: req.flash('error'),
      story: process(story, storyPresenter)
    }
    res.render('index', {
      html: ReactDOM.renderToString(<StoryForm data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err)
  }
}

export async function create (req, res, next) {
  try {
    let { name, description, course, parent, skill } = req.body
    await Story.create({ name, description, course, parent, skill })
    res.redirect('/admin/stories')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}

export async function update (req, res, next) {
  try {
    let story = await Story.findById(req.params.id).exec()
    let {
      name,
      description,
      course,
      parent,
      skill
    } = req.body
    story.name = name
    story.description = description
    story.course = course
    story.parent = parent
    story.skill = skill
    await story.save()
    res.redirect('/admin/stories')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}

export async function remove (req, res, next) {
  try {
    await Story.remove({ _id: req.params.id }).exec()
    res.redirect('/admin/stories')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
