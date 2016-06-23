import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Layout from './Layout'

class Dashboard extends Component {
  _handleClick = () => {
    console.log('something')
  }

  render () {
    return (
      <Layout>
        <h1>This is dashboard</h1>
        <button onClick={this._handleClick}>Logout</button>
      </Layout>
    )
  }
}

if (__CLIENT__) {
  ReactDOM.render(<Dashboard />, document.getElementById('react-root'))
}

export default Dashboard
