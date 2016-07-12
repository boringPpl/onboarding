import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import Pagination from '../../../components/Pagination'
import Layout from '../Layout'

class StoryList extends Component {
  _handlePageClick = () => {

  }

  render () {
    const { stories } = this.props.data

    return (
      <Layout {...this.props}>
        <Toolbar style={{ marginBottom: 16, justifyContent: 'flex-end' }}>
          <ToolbarGroup lastChild>
            <RaisedButton
              label='Create Story'
              primary
              linkButton
              href='/admin/stories/new'
            />
          </ToolbarGroup>
        </Toolbar>

        <Paper zDepth={1}>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Course</TableHeaderColumn>
                <TableHeaderColumn>Parent story</TableHeaderColumn>
                <TableHeaderColumn>Skill</TableHeaderColumn>
                <TableHeaderColumn style={{ width: 50 }} />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {stories.map(story => {
                return (
                  <TableRow key={story.id}>
                    <TableRowColumn>{story.name}</TableRowColumn>
                    <TableRowColumn>{story.course}</TableRowColumn>
                    <TableRowColumn>{story.parent}</TableRowColumn>
                    <TableRowColumn>{story.skill.join(' ')}</TableRowColumn>
                    <TableRowColumn style={{ width: 50 }}>
                      <IconMenu
                        desktop
                        useLayerForClickAway
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                      >
                        <MenuItem
                          leftIcon={<EditorModeEdit />}
                          primaryText='Edit'
                          linkButton
                          href={`/admin/stories/${story.id}`}
                        />
                        <MenuItem
                          leftIcon={<ActionDeleteForever />}
                          primaryText='Delete'
                          linkButton
                          href={`/admin/stories/${story.id}/delete`}
                        />
                      </IconMenu>
                    </TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <Pagination
                currentPage={1}
                totalPages={10}
                onPageClick={this._handlePageClick}
              />
            </TableFooter>
          </Table>
        </Paper>
      </Layout>
    )
  }
}

export default StoryList
