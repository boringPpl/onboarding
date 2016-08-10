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
  if (req.query.key !== 'br4in') return res.send(404)
  try {
    let users = await User.find().exec()
    res.send(users)
  } catch (err) {
    res.send(err)
  }
})

router.get('/:id/update', async (req, res) => {
  try {
    let user = await User.findById(req.user._id).lean().exec()
    if (!user) return res.redirect('/')
    let initialData = {
      error: req.flash('error'),
      user
    }
    res.render('index', {
      html: ReactDOM.renderToString(<UpdateForm data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err)
  }
})

router.post('/update', upload.any(), async (req, res) => {
  try {
    const file = req.files[0]
    const userId = req.user._id
    const referer = req.header('Referer')
    const back = referer ? referer + '?c=true' : 'back'
    let user = await User.findById(userId).exec()

    if (file) {
      const key = `linkedin-profiles/${userId}-${file.originalname}`
      s3.putObject({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: file.buffer
      }, async _ => {
        user.linkedinProfile = key
        user.settings.publicGithubProfile = req.body.setting_github === 'on'
        user.settings.publicLinkedinProfile = req.body.setting_linkedin === 'on'
        await user.save()
        res.redirect(back)
      })
    } else {
      user.settings.publicGithubProfile = req.body.setting_github === 'on'
      user.settings.publicLinkedinProfile = req.body.setting_linkedin === 'on'
      await user.save()
      res.redirect(back)
    }
  } catch (err) {
    res.send(err)
  }
})

export default router
