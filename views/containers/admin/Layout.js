import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import SocialPerson from 'material-ui/svg-icons/social/person'
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HardwarePhone from 'material-ui/svg-icons/hardware/phone-android'
import ActionClass from 'material-ui/svg-icons/action/class'
import ImageFlash from 'material-ui/svg-icons/image/flash-on'
import ActionDescription from 'material-ui/svg-icons/action/description'
import ActionExit from 'material-ui/svg-icons/action/exit-to-app'
import SocialNotifications from 'material-ui/svg-icons/social/notifications'
import ActionAssignment from 'material-ui/svg-icons/action/assignment-turned-in'
import MapsActivity from 'material-ui/svg-icons/maps/local-activity'

import App from '../App'
import Notification from '../../components/Notification'
import styles from './layout.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  state = {
    openDrawer: true
  }

  componentDidMount () {
    setTimeout(() => {
      const error = this.props.data.error
      if (error.length) {
        this.notification.show('error', error[0])
      }
    }, 0)
  }

  _handleToggleDrawer = _ => this.setState({
    openDrawer: !this.state.openDrawer
  })

  _handleTapListItem = (e) => {
    const href = e.currentTarget.dataset.href
    if (href) {
      window.location = href
    }
  }

  render () {
    const { openDrawer } = this.state

    return (
      <App>
        <div>
          <AppBar
            title='hasBrain CMS'
            onLeftIconButtonTouchTap={this._handleToggleDrawer}
            titleStyle={{ fontSize: 19.5, fontWeight: 300 }}
          >
            <IconButton
              style={{ marginTop: 8 }}
            >
              <SocialNotifications color='white' />
            </IconButton>
            <IconButton
              linkButton
              href='/logout'
              style={{ marginTop: 8, marginRight: -16 }}
            >
              <ActionExit color='white' />
            </IconButton>
          </AppBar>

          <Drawer
            open={openDrawer}
            containerStyle={{
              position: 'absolute',
              top: 64,
              paddingLeft: 8,
              paddingRight: 8,
              background: 'transparent',
              boxShadow: 'none'
            }}
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
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText='Add Client'
                    leftIcon={<ContentAdd />}
                    onTouchTap={this._handleTapListItem}
                    data-href='/admin/clients/new'
                  />
                ]}
              />
            </List>

            <Divider />

            <List>
              <Subheader>Contents</Subheader>
              <ListItem
                primaryText='Courses'
                leftIcon={<ActionClass />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/courses'
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText='Add Course'
                    leftIcon={<ContentAdd />}
                    onTouchTap={this._handleTapListItem}
                    data-href='/admin/courses/new'
                  />
                ]}
              />
              <ListItem
                primaryText='Skills'
                leftIcon={<ImageFlash />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/skills'
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText='Add Skill'
                    leftIcon={<ContentAdd />}
                    onTouchTap={this._handleTapListItem}
                    data-href='/admin/skills/new'
                  />
                ]}
              />
              <ListItem
                primaryText='Stories'
                leftIcon={<ActionDescription />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/stories'
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText='Add Story'
                    leftIcon={<ContentAdd />}
                    onTouchTap={this._handleTapListItem}
                    data-href='/admin/stories/new'
                  />
                ]}
              />
            </List>

            <Divider />

            <List>
              <Subheader>User Data</Subheader>
              <ListItem
                primaryText='Enrollments'
                leftIcon={<ActionAssignment />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/courses'
              />
              <ListItem
                primaryText='Activities'
                leftIcon={<MapsActivity />}
                onTouchTap={this._handleTapListItem}
                data-href='/admin/skills'
              />
            </List>
          </Drawer>

          <div className={styles.content} style={{
            marginLeft: openDrawer ? 256 : 0
          }}>
            {this.props.children}
          </div>

          <Notification ref={node => { this.notification = node }} />
        </div>
      </App>
    )
  }
}

export default Layout
