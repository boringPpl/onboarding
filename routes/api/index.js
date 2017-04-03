import express from 'express'
import * as user from './user'

const router = express.Router()

router.get('/users', user.list)
router.post('/users', user.create)

router.post('/set_password', user.setPassword)

export default router
