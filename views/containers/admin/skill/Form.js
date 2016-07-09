import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MultiSelectField from '../../../components/MultiSelectField'
import { Row, Col } from 'react-flexbox-grid'
import Layout from '../Layout'
import styles from '../layout.css'

class SkillForm extends Component {
  state = {
    parent: [
      { text: 'Toan', value: 1 },
      { text: 'Khanh', value: 2 },
      { text: 'XXX', value: 3 }
    ]
  }

  _handleNewRequest = () => {

  }

  _handleRequestDelete = () => {

  }

  render () {
    return (
      <Layout {...this.props}>
        <Row>
          <Col xs={12} md={9}>
            <h2 className={styles.heading}>New Skill</h2>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action='/admin/skills/create' method='post'>
                <h3 className={styles.subheading}>Info</h3>

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

                <h3 className={styles.subheading}>Skills</h3>

                <Row>
                  <Col xs={12}>
                    <MultiSelectField
                      name='parent'
                      dataSource={this.state.parent}
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

export default SkillForm
