import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import App from './App'
import styles from './login.css'

class Login extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        open: !!this.props.data.error.length
      })
    }, 0)
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
        <div className={styles.wrapper}>
          <Paper zDepth={1} className={styles.dialog}>
            <img src='logo-notext.png' className={styles.logo} />
            <br />
            <form method='post' action='/login'>
              <TextField
                id='email'
                name='email'
                hintText='Email'
                fullWidth
              />
              <br />
              <TextField
                id='password'
                name='password'
                type='password'
                hintText='Password'
                fullWidth
              />
              <br />
              <br />
              <RaisedButton
                type='submit'
                label='Login'
                secondary
                style={{ width: '100%' }}
              />
            </form>
            <br />
            <p className={styles.text}>
              <small>Try beta version?</small>
              <br />
              <small>Please contact us <a href='#'>here</a></small>
            </p>
          </Paper>

          <p className={styles.text}>
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
