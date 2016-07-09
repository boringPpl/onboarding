import React, { Component, PropTypes } from 'react'
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import unionBy from 'lodash/unionBy'

class MultiSelectField extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    value: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    value: this.props.value || [],
    filteredData: [],
    inputValue: '',
    inputFocused: false,
    menuFocused: false,
    menuOpened: false
  }

  _handleInputFocus = _ => this.setState({ inputFocused: true })

  _handleInputBlur = _ => this.setState({ inputFocused: false })

  _handleInputChange = event => {
    const inputValue = event.target.value
    const dataSource = this.props.dataSource
    const filteredData = filter(dataSource, data =>
      includes(data.text.toLowerCase(), inputValue.toLowerCase())
    )
    this.setState({
      inputValue,
      filteredData,
      menuOpened: !!filteredData.length
    })
  }

  _handleKeyDown = event => {
    const { keyCode } = event
    if (keyCode === 40) {
      this.setState({ menuFocused: true })
    }
    if (keyCode === 27) {
      this.setState({ menuOpened: false })
    }
  }

  _handleMenuClose = reason => this.setState({ menuFocused: false, menuOpened: false })

  _handleMenuItemTouchTap = (event, item, index) => {
    const { value, filteredData } = this.state
    this.setState({
      value: unionBy(value, [filteredData[index]], 'value'),
      inputValue: '',
      menuFocused: false,
      menuOpened: false
    })
  }

  _handleChipDelete = value => this.setState({
    value: filter(this.state.value, data => data.value !== value)
  })

  render () {
    const {
      value,
      filteredData,
      inputValue,
      inputFocused,
      menuFocused,
      menuOpened
    } = this.state
    const { name } = this.props

    const width = this.wrapper && this.wrapper.offsetWidth
    const styles = {
      wrapper: {
        position: 'relative',
        paddingBottom: 13,
        fontSize: 16,
        lineHeight: 24
      },
      label: {
        display: 'flex',
        flexWrap: 'wrap',
        cursor: 'text'
      },
      chip: {
        margin: 4
      },
      input: {
        height: 32,
        padding: 0,
        margin: 4,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'rgba(0,0,0,.87)',
        background: 'transparent',
        border: 'none',
        outline: 'none'
      },
      popover: {
        width
      },
      menuItem: {
        width
      }
    }

    return (
      <div ref={node => { this.wrapper = node }} style={styles.wrapper}>
        <label style={styles.label}>
          {value.map(data =>
            <Chip
              key={data.value}
              onRequestDelete={this._handleChipDelete.bind(null, data.value)}
              style={styles.chip}
            >
              {data.text}
            </Chip>
          )}

          <input
            type='text'
            value={inputValue}
            onFocus={this._handleInputFocus}
            onBlur={this._handleInputBlur}
            onKeyDown={this._handleKeyDown}
            onChange={this._handleInputChange}
            style={styles.input}
          />
        </label>

        <TextFieldUnderline focus={inputFocused || menuFocused} muiTheme={this.context.muiTheme} />

        <Popover
          open={menuOpened}
          anchorEl={this.wrapper}
          onRequestClose={this._handleMenuClose}
          useLayerForClickAway
          style={styles.popover}
        >
          <Menu
            desktop
            autoWidth={false}
            disableAutoFocus={!menuFocused}
            initiallyKeyboardFocused
            onEscKeyDown={this._handleMenuClose}
            onItemTouchTap={this._handleMenuItemTouchTap}
          >
            {filteredData.map(data =>
              <MenuItem
                key={data.value}
                value={data.value}
                primaryText={data.text}
                style={styles.menuItem}
              />
            )}
          </Menu>
        </Popover>

        {value.map(data => <input key={data.value} type='hidden' name={name} value={data.value} />)}
      </div>
    )
  }
}

export default MultiSelectField
