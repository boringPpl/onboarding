import React, { Component } from 'react'
import Layout from './Layout'
import SkillTree from '../../components/SkillTree'

class Dashboard extends Component {
  render () {
    return (
      <Layout {...this.props}>
        <h1>This is dashboard</h1>
        <SkillTree />
      </Layout>
    )
  }
}

export default Dashboard
