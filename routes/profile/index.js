import express from 'express'
import multer from 'multer'
import AWS from 'aws-sdk'
import React from 'react'
import ReactDOM from 'react-dom/server'
import UpdateForm from '../../views/containers/profile/UpdateForm'

const upload = multer()
const s3 = new AWS.S3()
const router = express.Router()

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
  s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: `linkedin-profiles/${userId}-${file.originalname}`,
    Body: file.buffer
  }, err => {
    if (err) return res.send(err)
    res.send('THANKS! WE WILL GET BACK TO YOU SOON.')
  })
})

export default router
