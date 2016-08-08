import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import App from '../App'

class UpdateForm extends Component {
  render () {
    return (
      <App>
        <div>
          <form action='/profiles/upload' method='post' encType='multipart/form-data'>
            <h1>Update profile</h1>
            <RaisedButton
              label='Choose an Image'
              labelPosition='before'
            >
              <input name='profile' type='file' style={{
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0
              }} />
            </RaisedButton>
            <RaisedButton type='submit' label='Submit' />
          </form>
        </div>
      </App>
    )
  }
}

export default UpdateForm
