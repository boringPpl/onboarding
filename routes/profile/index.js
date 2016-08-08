import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import AWS from 'aws-sdk'
import React from 'react'
import ReactDOM from 'react-dom/server'
import UpdateForm from '../../views/containers/profile/UpdateForm'

const upload = multer()
const s3 = new AWS.S3()
const router = express.Router()
const User = mongoose.model('User')

router.get('/list', async (req, res) => {
  try {
    let users = await User.find().exec()
    res.send(users)
  } catch (err) {
    res.send(err)
  }
})

router.get('/:id/update', (req, res) => {
  const initialData = {
    error: req.flash('error')
  }
  res.render('index', {
    html: ReactDOM.renderToString(<UpdateForm data={initialData} />),
    data: JSON.stringify(initialData)
  })
})

router.post('/upload', upload.any(), (req, res) => {
  const file = req.files[0]
  const userId = req.user._id
  const key = `linkedin-profiles/${userId}-${file.originalname}`

  s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: file.buffer
  }, async err => {
    try {
      if (err) throw new Error(err)
      let user = await User.findById(userId).exec()
      user.linkedinProfile = key
      await user.save()
      res.send('THANKS! WE WILL GET BACK TO YOU SOON.')
    } catch (error) {
      res.send(error)
    }
  })
})

export default router
