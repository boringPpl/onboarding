import express from 'express'
import * as dashboard from './dashboard'
import * as user from './user'
import * as client from './client'
import * as course from './course'
import * as skill from './skill'

const router = express.Router()

router.get('/', dashboard.index)

router.get('/users', user.list)
router.get('/users/new', user.newUser)
router.post('/users', user.create)
router.get('/users/:id', user.get)
router.post('/users/:id', user.update)
router.get('/users/:id/delete', user.remove)

router.get('/clients', client.list)

router.get('/courses', course.list)
router.get('/courses/new', course.newCourse)
router.post('/courses/create', course.create)

router.get('/skills/new', skill.newSkill)
router.post('/skills/create', skill.create)

export default router
