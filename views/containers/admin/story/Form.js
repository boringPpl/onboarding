import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import IconButton from 'material-ui/IconButton'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import AutoComplete from '../../../components/AutoComplete'
import MultiSelectField from '../../../components/MultiSelectField'
import RaisedButton from 'material-ui/RaisedButton'

import Layout from '../Layout'
import styles from '../layout.css'

class StoryForm extends Component {
  state = {
    courses: [],
    stories: [],
    skills: []
  }

  componentDidMount () {
    window.fetch('/admin/api/courses', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => this.setState({ courses: data }))
    window.fetch('/admin/api/stories', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => this.setState({ stories: data }))
    window.fetch('/admin/api/skills', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => this.setState({ skills: data }))
  }

  render () {
    const { courses, skills, stories } = this.state
    const { story } = this.props.data
    let id, name, description, course, parent, skill, courseId, parentStoryId
    let heading, action

    if (story) {
      ({ id, name, description, course, parent, skill } = story)
      courseId = course.id
      parentStoryId = parent.id
      heading = name
      action = `/admin/stories/${id}/update`
    } else {
      heading = 'New story'
      action = '/admin/stories/create'
    }

    return (
      <Layout {...this.props}>
        <Row>
          <Col xs={12} md={9}>
            <div className={styles.headingWrapper}>
              <IconButton linkButton href='/admin/stories' >
                <NavigationChevronLeft />
              </IconButton>
              <h2 className={styles.heading}>{heading}</h2>
            </div>

            <Paper zDepth={1} style={{ padding: 16 }}>
              <form action={action} method='post'>
                <h3 className={styles.subheading}>Story details</h3>

                <Row>
                  <Col xs={12}>
                    <TextField
                      id='name'
                      name='name'
                      floatingLabelText='Name'
                      fullWidth
                      defaultValue={name}
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
                      defaultValue={description}
                    />
                  </Col>
                </Row>

                <h3 className={styles.subheading}>Relationships</h3>

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
                      value={courseId}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <AutoComplete
                      id='parent'
                      name='parent'
                      floatingLabelText='Parent story'
                      filter={AutoComplete.caseInsensitiveFilter}
                      dataSource={stories}
                      dataSourceConfig={{ text: 'name', value: 'id' }}
                      fullWidth
                      value={parentStoryId}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <MultiSelectField
                      name='skill'
                      floatingLabelText='Skill'
                      dataSource={skills}
                      dataSourceConfig={{ text: 'name', value: 'id' }}
                      value={skill}
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

export default StoryForm
