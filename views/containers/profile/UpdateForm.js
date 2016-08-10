import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { List, ListItem } from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import CheckIcon from 'material-ui/svg-icons/action/check-circle'
import { lightGreen500 } from 'material-ui/styles/colors'
import App from '../App'
import styles from './layout.css'
import homeStyles from '../home.css'

class UpdateForm extends Component {
  state = {
    filename: 'Upload your Linkedin profile'
  }

  _handleUploadChange = event => {
    const filename = event.target.value.split(/(\\|\/)/g).pop()
    this.setState({
      filename
    })
  }

  render () {
    const { user } = this.props.data
    const { filename } = this.state

    return (
      <App>
        <div className={styles.wrapper}>
          <div className={homeStyles.headerWrapper}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <img className={homeStyles.logo} src='/logo.png' />
                  <div className={homeStyles.headerSlogan}>Work with the Best <br /> to be the Best of You.</div>
                </Col>
              </Row>
            </Grid>
          </div>

          <div zDepth={1} className={styles.dialog}>
            <img className={styles.logo} src='/logo-notext.png' />
            <h2 className={styles.heading}>Thank you for your sign up</h2>
            <p className={styles.text}>
              We will get in touch when we open up the rest of the profiling tool. <br />
              All your profiles are hidden now. Indicate which sections you want to be public.
            </p>

            <br />

            <form action='/profiles/update' method='post' encType='multipart/form-data'>
              <h4 className={styles.subheading}>Build Your Base Profile</h4>
              {
                user.linkedinProfile
                ? <p style={{ paddingLeft: 16 }}>
                  <CheckIcon color={lightGreen500} style={{
                    position: 'relative',
                    top: -1,
                    marginRight: 8,
                    verticalAlign: 'middle'
                  }} />
                  <span style={{ verticalAlign: 'middle' }}>You have uploaded your Linkedin profile</span>
                </p>
                : <div>
                  <div className={styles.guide}>
                    <p><small>Get the PDF from your Linkedin page and upload here</small></p>
                    <img src='/linkedin-save-pdf.png' />
                  </div>
                  <RaisedButton
                    label={filename}
                    labelPosition='before'
                    style={{
                      display: 'block',
                      width: 260,
                      margin: '0 auto',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <input name='profile' type='file' style={{
                      cursor: 'pointer',
                      position: 'absolute',
                      top: 0, right: 0, bottom: 0, left: 0,
                      width: '100%',
                      opacity: 0
                    }} onChange={this._handleUploadChange} />
                  </RaisedButton>
                </div>
              }

              <br />

              <h4 className={styles.subheading}>Public Info</h4>
              <List style={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItem primaryText='Github section of info' rightToggle={
                  <Toggle name='setting_github' defaultToggled={user.settings.publicGithubProfile} />
                } />
                <ListItem primaryText='Basic Linkedin info' rightToggle={
                  <Toggle name='setting_linkedin' defaultToggled={user.settings.publicLinkedinProfile} />
                } />
              </List>

              <br />
              <br />

              <RaisedButton
                type='submit'
                label='Save your settings'
                backgroundColor='#ff6f22'
                labelColor='white'
                style={{
                  display: 'block',
                  width: 260,
                  margin: '0 auto'
                }}
              />
            </form>
          </div>

          <div className={homeStyles.footer}>
            Copyright &copy; 2016 hasBrain
          </div>
        </div>
      </App>
    )
  }
}

export default UpdateForm
