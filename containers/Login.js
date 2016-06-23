import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper'
import App from './App'
import LoginForm from '../components/LoginForm'
import styles from './login.css'

class Login extends Component {
  render () {
    return (
      <App>
        <div className={styles.login}>
          <Paper zDepth={1} className={styles.loginDialog}>
            <LoginForm />
          </Paper>

          <p>
            <small>&copy; 2014 hasBrain</small>
          </p>
        </div>
      </App>
    )
  }
}

if (__CLIENT__) {
  ReactDOM.render(<Login />, document.getElementById('react-root'))
}

export default Login
