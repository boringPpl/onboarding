import React, { Component } from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'

import Layout from '../Layout'
import SearchField from '../../../components/SearchField'
import Pagination from '../../../components/Pagination'
import { Table, RowEditButton, RowDeleteButton } from '../../../components/Table'

class StoryList extends Component {
  _handlePageClick = nextPage => {

  }

  render () {
    const { stories } = this.props.data

    return (
      <Layout {...this.props}>
        <Toolbar style={{ marginBottom: 16 }}>
          <ToolbarGroup firstChild>
            <SearchField
              action='/admin/stories'
              style={{ margin: '0 24px' }}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              label='Add Story'
              primary
              linkButton
              href='/admin/stories/new'
            />
          </ToolbarGroup>
        </Toolbar>

        <Paper zDepth={1}>
          <Table
            header={
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Course</TableHeaderColumn>
                <TableHeaderColumn>Parent story</TableHeaderColumn>
                <TableHeaderColumn>Skill</TableHeaderColumn>
                <TableHeaderColumn style={{ width: 96 }} />
              </TableRow>
            }
            body={
              stories.map(story => {
                return (
                  <TableRow key={story.id}>
                    <TableRowColumn>{story.name}</TableRowColumn>
                    <TableRowColumn>{story.course.name}</TableRowColumn>
                    <TableRowColumn>{story.parent.name}</TableRowColumn>
                    <TableRowColumn>{story.skill.map(s => s.name).join(', ')}</TableRowColumn>
                    <TableRowColumn style={{ width: 96 }}>
                      <RowEditButton linkButton href={`/admin/stories/${story.id}`} />
                      <RowDeleteButton linkButton href={`/admin/stories/${story.id}/delete`} />
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
            footer={
              <Pagination
                currentPage={1}
                totalPages={10}
                onPageClick={this._handlePageClick}
              />
            }
          />
        </Paper>
      </Layout>
    )
  }
}

export default StoryList
