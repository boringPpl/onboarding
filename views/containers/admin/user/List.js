import React, { Component } from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { red600, orange600, amber600 } from 'material-ui/styles/colors'

import Layout from '../Layout'
import SearchField from '../../../components/SearchField'
import Pagination from '../../../components/Pagination'
import Label from '../../../components/Label'
import { Table, RowEditButton, RowDeleteButton } from '../../../components/Table'

class UserList extends Component {
  _handlePageClick = nextPage => {

  }

  render () {
    const { users } = this.props.data

    return (
      <Layout {...this.props}>
        <Toolbar style={{ marginBottom: 16 }}>
          <ToolbarGroup firstChild>
            <SearchField
              action='/admin/users'
              style={{ margin: '0 24px' }}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton
              label='Add User'
              primary
              linkButton
              href='/admin/users/new'
            />
          </ToolbarGroup>
        </Toolbar>

        <Paper zDepth={1}>
          <Table
            header={
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Roles</TableHeaderColumn>
                <TableHeaderColumn style={{ width: 96 }} />
              </TableRow>
            }
            body={
              users.map(user => {
                return (
                  <TableRow key={user.id}>
                    <TableRowColumn>{user.fullname}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>
                      {user.roles.map(role =>
                        <Label key={role} text={role} color={
                          do {
                            if (role === 'admin') red600
                            else if (role === 'teacher') amber600
                            else if (role === 'contributor') orange600
                          }
                        } />
                      )}
                    </TableRowColumn>
                    <TableRowColumn style={{ width: 96 }}>
                      <RowEditButton linkButton href={`/admin/users/${user.id}`} />
                      <RowDeleteButton linkButton href={`/admin/users/${user.id}/delete`} />
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

export default UserList
