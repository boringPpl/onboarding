import React, { Component } from 'react'
import { Table as MuiTable, TableHeader, TableBody, TableFooter } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import { grey700 } from 'material-ui/styles/colors'

class Table extends Component {
  render () {
    const { header, body, footer } = this.props

    return (
      <MuiTable selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          {header}
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {body}
        </TableBody>
        <TableFooter>
          {footer}
        </TableFooter>
      </MuiTable>
    )
  }
}

class RowDeleteButton extends Component {
  render () {
    return (
      <IconButton
        {...this.props}
        iconStyle={{ width: 20, height: 20 }}
        style={{ padding: 14 }}
      >
        <ActionDeleteForever color={grey700} />
      </IconButton>
    )
  }
}

class RowEditButton extends Component {
  render () {
    return (
      <IconButton
        {...this.props}
        iconStyle={{ width: 20, height: 20 }}
        style={{ padding: 14 }}
      >
        <EditorModeEdit color={grey700} />
      </IconButton>
    )
  }
}

export default { Table, RowDeleteButton, RowEditButton }
