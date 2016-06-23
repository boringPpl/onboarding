import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import App from '../App'

class Layout extends Component {
  static propTypes = {
    // children: PropTypes.object
  }

  render () {
    return (
      <App>
        <div>
          <AppBar
            title='Title'
          />
          {this.props.children}
        </div>
      </App>
    )
  }
}

export default Layout
