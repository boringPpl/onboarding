import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import Layout from '../Layout'
import styles from '../layout.css'

class UserForm extends Component {
  render () {
    return (
      <Layout>
        <Row>
          <Col xs={12} md={9}>
            <h2 className={styles.heading}>Add new user</h2>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action='/admin/users' method='post'>
                <h3 className={styles.subheading}>Info</h3>

                <Row>
                  <Col xs={12} sm={6}>
                    <TextField
                      id='first_name'
                      name='first_name'
                      hintText='First name'
                      fullWidth
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <TextField
                      id='last_name'
                      name='last_name'
                      hintText='Last name'
                      fullWidth
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <TextField
                      id='email'
                      name='email'
                      hintText='Email'
                      fullWidth
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <TextField
                      id='password'
                      name='password'
                      hintText='Password'
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
                      value='admin'
                      className={styles.checkbox}
                    />
                    <Checkbox
                      label='Contributor'
                      name='roles'
                      value='contributor'
                      className={styles.checkbox}
                    />
                    <Checkbox
                      label='Teacher'
                      name='roles'
                      value='teacher'
                      className={styles.checkbox}
                    />
                  </Col>
                </Row>

                <br />

                <Row>
                  <Col xs={12}>
                    <RaisedButton type='submit' label='Create user' primary />
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
