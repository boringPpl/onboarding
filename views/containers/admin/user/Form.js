import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import IconButton from 'material-ui/IconButton'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import includes from 'lodash/includes'

import Layout from '../Layout'
import styles from '../layout.css'

class UserForm extends Component {
  render () {
    let { user } = this.props.data
    let id, firstname, lastname, fullname, email, roles, roleAdmin, roleContributor, roleTeacher
    let heading, action

    if (user) {
      ({ id, firstname, lastname, fullname, email, roles } = user)
      roleAdmin = includes(roles, 'admin')
      roleContributor = includes(roles, 'contributor')
      roleTeacher = includes(roles, 'teacher')
      heading = fullname
      action = `/admin/users/${id}/update`
    } else {
      heading = 'New user'
      action = '/admin/users/create'
    }

    return (
      <Layout {...this.props}>
        <Row>
          <Col xs={12} md={9}>
            <div className={styles.headingWrapper}>
              <IconButton linkButton href='/admin/users' >
                <NavigationChevronLeft />
              </IconButton>
              <h2 className={styles.heading}>{heading}</h2>
            </div>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action={action} method='post'>
                <h3 className={styles.subheading}>User info</h3>

                <Row>
                  <Col xs={12} sm={6}>
                    <TextField
                      id='first_name'
                      name='first_name'
                      floatingLabelText='First name'
                      fullWidth
                      defaultValue={firstname}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <TextField
                      id='last_name'
                      name='last_name'
                      floatingLabelText='Last name'
                      fullWidth
                      defaultValue={lastname}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <TextField
                      id='email'
                      name='email'
                      floatingLabelText='Email'
                      fullWidth
                      defaultValue={email}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <TextField
                      id='password'
                      name='password'
                      floatingLabelText='Password'
                      type='password'
                      fullWidth
                    />
                  </Col>
                </Row>

                <h3 className={styles.subheading}>User roles</h3>

                <Row>
                  <Col xs={12}>
                    <Checkbox
                      label='Admin'
                      name='roles'
                      defaultValue='admin'
                      className={styles.checkbox}
                      defaultChecked={roleAdmin}
                    />
                    <Checkbox
                      label='Contributor'
                      name='roles'
                      defaultValue='contributor'
                      className={styles.checkbox}
                      defaultChecked={roleContributor}
                    />
                    <Checkbox
                      label='Teacher'
                      name='roles'
                      defaultValue='teacher'
                      className={styles.checkbox}
                      defaultChecked={roleTeacher}
                    />
                  </Col>
                </Row>

                <br />

                <Row>
                  <Col xs={12}>
                    <RaisedButton
                      className={styles.button}
                      type='submit'
                      label='Save'
                      primary
                    />
                  </Col>
                </Row>
              </form>
            </Paper>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default UserForm
