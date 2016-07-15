import express from 'express'
import * as dashboard from './dashboard'
import * as user from './user'
import * as client from './client'
import * as course from './course'
import * as skill from './skill'
import * as story from './story'
import * as api from './api'

const router = express.Router()

router.get('/', dashboard.index)

router.get('/users', user.list)
router.get('/users/new', user.newUser)
router.get('/users/:id', user.get)
router.post('/users/create', user.create)
router.post('/users/:id/update', user.update)
router.get('/users/:id/delete', user.remove)

router.get('/clients', client.list)

router.get('/courses', course.list)
router.get('/courses/new', course.newCourse)
router.post('/courses/create', course.create)

router.get('/skills', skill.list)
router.get('/skills/new', skill.newSkill)
router.post('/skills/create', skill.create)

router.get('/stories', story.list)
router.get('/stories/new', story.newStory)
router.post('/stories/create', story.create)

router.get('/api/courses', api.listCourse)
router.get('/api/stories', api.listStory)
router.get('/api/skills', api.listSkill)

export default router
