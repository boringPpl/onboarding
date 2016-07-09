// import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import SkillForm from '../../views/containers/admin/skill/Form'
// import process from '../../lib/processData'

// const Course = mongoose.model('Course')
// const coursePresenter = {
//   id: data => data._id.toString(),
//   name: 'name'
// }

// export async function list (req, res, next) {
//   try {
//     let courses = await Course.find().exec()
//     const initialData = {
//       error: req.flash('error'),
//       courses: courses.map(course => process(course, coursePresenter))
//     }
//     res.render('index', {
//       html: ReactDOM.renderToString(<CourseList data={initialData} />),
//       data: JSON.stringify(initialData)
//     })
//   } catch (err) {
//     res.send(err)
//   }
// }

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
  console.log(req.body)
  // try {
  //   let { name, description } = req.body
  //   await Course.create({ name, description })
  //   res.redirect('/admin/courses')
  // } catch (err) {
  //   req.flash('error', err.message)
  //   res.redirect('back')
  // }
}
