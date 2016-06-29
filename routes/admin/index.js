import express from 'express'
import * as dashboard from './dashboard'
import * as user from './user'

const router = express.Router()

router.get('/', dashboard.index)

router.get('/users', user.list)
router.get('/users/new', user.newUser)
router.post('/users', user.create)
router.get('/users/:id', user.get)

export default router
