import express from 'express'
import oauth2 from './oauth2'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/oauth/token', oauth2.token)
router.use('/api', oauth2.restrict)

export default router
