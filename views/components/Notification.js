import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import AlertError from 'material-ui/svg-icons/alert/error'
import ActionCheck from 'material-ui/svg-icons/action/check-circle'
import { red500, green500 } from 'material-ui/styles/colors'

class Notification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      type: null,
      message: null
    }
  }

  show = (type, message) => this.setState({
    open: true,
    type,
    message
  })

  _handleRequestClose = _ => this.setState({
    open: false
  })

  render () {
    const { open, type, message } = this.state
    let styles = {
      wrapper: {
        display: 'flex',
        alignItems: 'center'
      },
      icon: {
        marginRight: 8
      }
    }

    return (
      <Snackbar
        open={open}
        message={
          <div style={styles.wrapper}>
            {do {
              if (type === 'error') {
                <AlertError color={red500} style={styles.icon} />
              } else if (type === 'success') {
                <ActionCheck color={green500} style={styles.icon} />
              }
            }}
            {message}
          </div>
        }
        autoHideDuration={5000}
        onRequestClose={this._handleRequestClose}
        bodyStyle={{ maxWidth: 288 }}
      />
    )
  }
}

export default Notification
