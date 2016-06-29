import React, { Component } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import Layout from '../Layout'
import debounce from 'lodash/debounce'

class UserList extends Component {
  state = {
    searchKey: ''
  }

  _handleChange = debounce((event, searchKey) => this.setState({ searchKey }), 500)

  _filterByName = (searchKey) => (user) => user.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1

  render () {
    const { searchKey } = this.state
    const { users } = this.props.data

    return (
      <Layout>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Roles</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.filter(this._filterByName(searchKey)).map(user => {
              return (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.roles.join(' ')}</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Layout>
    )
  }
}

export default UserList
