import mongoose from 'mongoose'
import React from 'react'
import ReactDOM from 'react-dom/server'
import ClientList from '../../views/containers/admin/client/List'
import process from '../../lib/processData'

const Client = mongoose.model('Client')
const clientPresenter = {
  clientId: 'clientId',
  clientSecret: 'clientSecret'
}

export async function list (req, res, next) {
  try {
    let clients = await Client.find().exec()
    const initialData = {
      error: req.flash('error'),
      clients: clients.map(client => process(client, clientPresenter))
    }
    res.render('index', {
      html: ReactDOM.renderToString(<ClientList data={initialData} />),
      data: JSON.stringify(initialData)
    })
  } catch (err) {
    res.send(err)
  }
}
