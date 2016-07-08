import React, { Component } from 'react'
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

class CourseList extends Component {
  state = {
    currentPage: 1
  }

  _handlePageClick = (nextPage) => {
    this.setState({ currentPage: nextPage })
  }

  render () {
    const { currentPage } = this.state
    const { courses } = this.props.data

    return (
      <Layout {...this.props}>
        <Toolbar style={{ marginBottom: 16, justifyContent: 'flex-end' }}>
          <ToolbarGroup lastChild>
            <RaisedButton
              label='Create Course'
              primary
              linkButton
              href='/admin/courses/new'
            />
          </ToolbarGroup>
        </Toolbar>

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 50 }} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {courses.map(course => {
              return (
                <TableRow key={course.id}>
                  <TableRowColumn>{course.name}</TableRowColumn>
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
                        href={`/admin/courses/${course.id}`}
                      />
                      <MenuItem
                        leftIcon={<ActionDeleteForever />}
                        primaryText='Delete'
                        linkButton
                        href={`/admin/courses/${course.id}/delete`}
                      />
                    </IconMenu>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageClick={this._handlePageClick}
            />
          </TableFooter>
        </Table>
      </Layout>
    )
  }
}

export default CourseList
