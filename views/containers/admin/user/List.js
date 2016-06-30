import React, { Component } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
// import { grey500 } from 'material-ui/styles/colors'
import Pagination from '../../../components/Pagination'
import Layout from '../Layout'
import debounce from 'lodash/debounce'

class UserList extends Component {
  state = {
    searchKey: '',
    currentPage: 1
  }

  _handleChange = debounce((event, searchKey) => this.setState({ searchKey }), 500)

  _filterByName = searchKey => user => user.fullname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1

  _handlePageClick = (nextPage) => {
    this.setState({ currentPage: nextPage })
  }

  render () {
    const { searchKey, currentPage } = this.state
    const { users } = this.props.data

    return (
      <Layout {...this.props}>
        <Toolbar style={{ marginBottom: 16 }}>
          <ToolbarGroup firstChild>
            <FontIcon className='material-icons'>search</FontIcon>
            <TextField
              id='search'
              hintText='Search'
              style={{ marginTop: 4, marginRight: 24, marginLeft: 8 }}
              underlineStyle={{ display: 'none' }}
              onChange={this._handleChange}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              label='Create User'
              primary
              linkButton
              href='/admin/users/new'
            />
          </ToolbarGroup>
        </Toolbar>

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Roles</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 50 }} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {users.filter(this._filterByName(searchKey)).map(user => {
              return (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.fullname}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.roles.join(' ')}</TableRowColumn>
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
                        href={`/admin/users/${user.id}`}
                      />
                      <MenuItem
                        leftIcon={<ActionDeleteForever />}
                        primaryText='Delete'
                        linkButton
                        href={`/admin/users/${user.id}/delete`}
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

export default UserList
