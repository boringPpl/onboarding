import express from 'express'
import * as dashboard from './dashboard'
import * as user from './user'
import * as client from './client'

const router = express.Router()

router.get('/', dashboard.index)

router.get('/users', user.list)
router.get('/users/new', user.newUser)
router.post('/users', user.create)
router.get('/users/:id', user.get)
router.post('/users/:id', user.update)
router.get('/users/:id/delete', user.remove)

router.get('/clients', client.list)

export default router
