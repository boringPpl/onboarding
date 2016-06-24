import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
// import { Grid, Row, Col } from 'react-flexbox-grid'
import App from './App'
import LoginForm from '../components/LoginForm'
import styles from './login.css'

class Login extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  state = {
    open: !!this.props.data.error.length
  }

  _handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  render () {
    const { error } = this.props.data

    return (
      <App>
        <div className={styles.login}>
          <Paper zDepth={1} className={styles.loginDialog}>
            <img src='logo-notext.png' className={styles.loginLogo} />
            <br />
            <LoginForm />
            <br />
            <p className={styles.signup}>
              <small>Try beta version?</small>
              <br />
              <small>Please contact us <a href='#'>here</a></small>
            </p>
          </Paper>

          <p className={styles.signup}>
            <small>&copy; 2014 hasBrain</small>
          </p>
          <Snackbar
            bodyStyle={{ maxWidth: 288 }}
            open={this.state.open}
            message={error[0] || ''}
            autoHideDuration={4000}
            onRequestClose={this._handleRequestClose}
          />
        </div>
      </App>
    )
  }
}

export default Login
