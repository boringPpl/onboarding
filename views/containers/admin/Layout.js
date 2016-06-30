import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import SocialPerson from 'material-ui/svg-icons/social/person'
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add'
import HardwarePhone from 'material-ui/svg-icons/hardware/phone-android'
import ActionClass from 'material-ui/svg-icons/action/class'
import ActionDescription from 'material-ui/svg-icons/action/description'
import ActionExit from 'material-ui/svg-icons/action/exit-to-app'
import App from '../App'
import styles from './layout.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  state = {
    openDrawer: false,
    openSnackbar: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        openSnackbar: !!this.props.data.error.length
      })
    }, 0)
  }

  _handleRequestClose = () => {
    this.setState({
      openSnackbar: false
    })
  }

  _handleToggleDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  _handleTapListItem = (e) => {
    const href = e.currentTarget.dataset.href
    if (href) {
      window.location = href
    }
  }

  render () {
    const { openDrawer, openSnackbar } = this.state
    const { error } = this.props.data

    return (
      <App>
        <div>
          <AppBar
            title='hasBrain CMS'
            onLeftIconButtonTouchTap={this._handleToggleDrawer}
            iconElementRight={
              <IconButton
                linkButton
                href='/logout'
              >
                <ActionExit />
              </IconButton>
            }
            titleStyle={{ fontWeight: 300 }}
          />

          <Drawer
            open={openDrawer}
            containerStyle={{ top: 64 }}
          >
            <List>
              <ListItem
                primaryText='Dashboard'
                leftIcon={<ActionDashboard />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin'
              />
              <ListItem
                primaryText='Users'
                leftIcon={<SocialPerson />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/users'
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText='Add User'
                    leftIcon={<SocialPersonAdd />}
                    onTouchTap={this._handleTapListItem}
                    data-href='/admin/users/new'
                  />
                ]}
              />
              <ListItem
                primaryText='Clients'
                leftIcon={<HardwarePhone />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/clients'
              />
            </List>
            <Divider />
            <List>
              <ListItem
                primaryText='Learning Paths'
                leftIcon={<ActionClass />}
              />
              <ListItem
                primaryText='Learning Nodes'
                leftIcon={<ActionDescription />}
              />
            </List>
          </Drawer>

          <div className={styles.content} style={{
            marginLeft: openDrawer ? 256 : 0
          }}>
            {this.props.children}
          </div>

          <Snackbar
            bodyStyle={{ maxWidth: 288 }}
            open={openSnackbar}
            message={error[0] || ''}
            autoHideDuration={4000}
            onRequestClose={this._handleRequestClose}
          />
        </div>
      </App>
    )
  }
}

export default Layout