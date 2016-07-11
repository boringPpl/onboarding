import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import AutoComplete from '../../../components/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import Layout from '../Layout'
import styles from '../layout.css'

class SkillForm extends Component {
  state = {
    courses: [],
    skills: []
  }

  componentDidMount () {
    window.fetch('/admin/api/courses')
      .then(res => res.json())
      .then(data => this.setState({ courses: data }))
    window.fetch('/admin/api/skills')
      .then(res => res.json())
      .then(data => this.setState({ skills: data }))
  }

  render () {
    const { courses, skills } = this.state

    return (
      <Layout {...this.props}>
        <Row>
          <Col xs={12} md={9}>
            <h2 className={styles.heading}>New Skill</h2>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action='/admin/skills/create' method='post'>
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

                <Row>
                  <Col xs={12}>
                    <AutoComplete
                      id='course'
                      name='course'
                      floatingLabelText='Course'
                      filter={AutoComplete.caseInsensitiveFilter}
                      dataSource={courses}
                      dataSourceConfig={{ text: 'name', value: 'id' }}
                      fullWidth
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <AutoComplete
                      id='parent'
                      name='parent'
                      floatingLabelText='Parent skill'
                      filter={AutoComplete.caseInsensitiveFilter}
                      dataSource={skills}
                      dataSourceConfig={{ text: 'name', value: 'id' }}
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

export default SkillForm
