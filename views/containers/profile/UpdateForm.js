import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { List, ListItem } from 'material-ui/List'
import Dialog from 'material-ui/Dialog'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CheckIcon from 'material-ui/svg-icons/action/check-circle'
import { lightGreen500 } from 'material-ui/styles/colors'
import App from '../App'
import styles from './layout.css'
import homeStyles from '../home.css'

class UpdateForm extends Component {
  state = {
    filename: 'Upload your Linkedin profile',
    open: false
  }

  componentDidMount () {
    if (~window.location.search.indexOf('c=true')) {
      this._handleOpen()
      const cleanUri = window.location.protocol + '//' + window.location.host + window.location.pathname
      window.history.replaceState({}, document.title, cleanUri)
    }
  }

  _handleOpen = () => {
    this.setState({ open: true })
  }

  _handleClose = () => {
    this.setState({ open: false })
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
    const referralLink = `http://hasbrain.com?r=${user._id}`

    return (
      <App>
        <div className={styles.wrapper}>
          <div className={homeStyles.headerWrapper}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <img className={homeStyles.logo} src='/logo.png' />
                  <div className={homeStyles.headerSignup}>
                    <a href='/logout'>Logout</a>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>

          <div zDepth={1} className={styles.dialog}>
            {
              user.linkedinProfile
              ? <h2 className={styles.heading}>Thank you for sign up!</h2>
              : <div>
                <h2 className={styles.heading}>Last step: Set up your basic profile with LinkedIn</h2>
                <p className={styles.text}>
                  Don't worry, your profile is fully private until you make sections of it public.
                </p>
              </div>
            }

            <br />

            <form action='/profiles/update' method='post' encType='multipart/form-data'>
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
                    disableTouchRipple
                    disableFocusRipple
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
                disableTouchRipple
                disableFocusRipple
              />
            </form>
          </div>

          <div className={homeStyles.footer}>
            Copyright &copy; 2016 hasBrain
          </div>

          <Dialog
            actions={
              <FlatButton
                label='OK'
                primary
                keyboardFocused
                onTouchTap={this._handleClose}
              />
            }
            modal={false}
            open={this.state.open}
            onRequestClose={this._handleClose}
          >
            <p>Thank you! You've been added to the closed alpha community. Your opinions matter greatly to us.</p>
            <p>Interested in unlocking inner circle access?</p>
            <p dangerouslySetInnerHTML={{
              __html: `Get early inner circle access by referring your friends. The more friends that join, the sooner you’ll get access. Just share this link: <span class="${styles.link}">${referralLink}</span>`
            }} />
            <p>
              Contact us at <a className={styles.link} href='mailto:info@hasbrain.com' target='_top'>info@hasbrain.com</a> for any questions.
            </p>
          </Dialog>
        </div>
      </App>
    )
  }
}

export default UpdateForm
