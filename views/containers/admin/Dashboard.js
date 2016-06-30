import React, { Component } from 'react'
import Layout from './Layout'

class Dashboard extends Component {
  render () {
    return (
      <Layout {...this.props}>
        <h1>This is dashboard</h1>
      </Layout>
    )
  }
}

export default Dashboard
