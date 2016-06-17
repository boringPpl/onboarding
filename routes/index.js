var express = require('express')
var router = express.Router()
import * as user from './api/user'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/api/v1/users', user.list)
router.post('/api/v1/users', user.create)

module.exports = router
