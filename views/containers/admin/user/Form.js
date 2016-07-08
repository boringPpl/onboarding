import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import includes from 'lodash/includes'
import Layout from '../Layout'
import styles from '../layout.css'

class UserForm extends Component {
  render () {
    let user = this.props.data.user || {}
    let { id, firstname, lastname, fullname, email, roles } = user
    let heading = id ? fullname : 'New user'
    let action = id ? `/admin/users/${id}` : '/admin/users'
    let roleAdmin = includes(roles, 'admin')
    let roleContributor = includes(roles, 'contributor')
    let roleTeacher = includes(roles, 'teacher')

    return (
      <Layout {...this.props}>
        <Row>
          <Col xs={12} md={9}>
            <h2 className={styles.heading}>{heading}</h2>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action={action} method='post'>
                <h3 className={styles.subheading}>Info</h3>

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

                <h3 className={styles.subheading}>Roles</h3>

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
                    <RaisedButton type='submit' label='Save' primary />
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
