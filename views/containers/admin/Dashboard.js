import React, { Component } from 'react'
import Layout from './Layout'

class Dashboard extends Component {
  _handleClick = () => {
    console.log('something')
  }

  render () {
    return (
      <Layout>
        <h1>This is dashboard</h1>
        <a href='/logout'>Logout</a>
      </Layout>
    )
  }
}

export default Dashboard
