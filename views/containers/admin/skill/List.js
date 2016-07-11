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

class SkillList extends Component {
  _handlePageClick = () => {

  }

  render () {
    const { skills } = this.props.data

    return (
      <Layout {...this.props}>
        <Toolbar style={{ marginBottom: 16, justifyContent: 'flex-end' }}>
          <ToolbarGroup lastChild>
            <RaisedButton
              label='Create Skill'
              primary
              linkButton
              href='/admin/skills/new'
            />
          </ToolbarGroup>
        </Toolbar>

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Course</TableHeaderColumn>
              <TableHeaderColumn>Parent skill</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 50 }} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {skills.map(skill => {
              return (
                <TableRow key={skill.id}>
                  <TableRowColumn>{skill.name}</TableRowColumn>
                  <TableRowColumn>{skill.course}</TableRowColumn>
                  <TableRowColumn>{skill.parent}</TableRowColumn>
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
                        href={`/admin/skills/${skill.id}`}
                      />
                      <MenuItem
                        leftIcon={<ActionDeleteForever />}
                        primaryText='Delete'
                        linkButton
                        href={`/admin/skills/${skill.id}/delete`}
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
      </Layout>
    )
  }
}

export default SkillList
