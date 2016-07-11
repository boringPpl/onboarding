import React, { Component } from 'react'
import MuiAutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import find from 'lodash/find'

class AutoComplete extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value
    }
  }

  static getDefaultProps = {
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' }
  }

  static caseInsensitiveFilter = MuiAutoComplete.caseInsensitiveFilter
  static fuzzyFilter = MuiAutoComplete.fuzzyFilter

  _handleNewRequest = (chosenRequest, index) => {
    const {
      dataSource,
      dataSourceConfig: { value: valueField },
      onNewRequest
    } = this.props

    this.setState({
      value: dataSource[index][valueField]
    }, _ => onNewRequest && onNewRequest(dataSource[index], index))
  }

  render () {
    const {
      dataSource,
      dataSourceConfig: { text: textField, value: valueField },
      id,
      name,
      ...rest
    } = this.props
    const { value } = this.state
    const chosenRequest = find(dataSource, { [valueField]: value }) || {}

    return (
      <div>
        <MuiAutoComplete
          {...rest}
          id={id}
          dataSource={dataSource.map(data => ({
            text: data[textField],
            value: <MenuItem primaryText={data[textField]} />
          }))}
          onNewRequest={this._handleNewRequest}
          searchText={chosenRequest[textField]}
        />
        {do {
          if (chosenRequest[valueField]) {
            <input type='hidden' id={id} name={name} value={chosenRequest[valueField]} />
          }
        }}
      </div>
    )
  }
}

export default AutoComplete
