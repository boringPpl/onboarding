import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class LoginForm extends Component {
  render () {
    return (
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
    )
  }
}

export default LoginForm
