import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import Layout from '../Layout'
import styles from '../layout.css'

class CourseForm extends Component {
  render () {
    return (
      <Layout {...this.props}>
        <Row>
          <Col xs={12} md={9}>
            <h2 className={styles.heading}>New Course</h2>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action='/admin/courses/create' method='post'>
                <Row>
                  <Col xs={12}>
                    <TextField
                      id='name'
                      name='name'
                      floatingLabelText='Name'
                      fullWidth
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <TextField
                      id='description'
                      name='description'
                      floatingLabelText='Description'
                      multiLine
                      rows={3}
                      fullWidth
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

export default CourseForm
