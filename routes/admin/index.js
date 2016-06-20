import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('admin', { title: 'CMS' })
})

export default router
