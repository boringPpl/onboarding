import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'

const SearchBar = ({ action, style }) => (
  <form
    action={action}
    style={{
      display: 'flex',
      alignItems: 'center',
      ...style
    }}
  >
    <FontIcon
      className='material-icons'
      style={{
        lineHeight: '48px',
        color: 'rgba(0, 0, 0, 0.4)'
      }}
    >
      search
    </FontIcon>
    <TextField
      id='search'
      name='search'
      hintText='Search'
      underlineStyle={{ display: 'none' }}
      style={{ marginLeft: 8 }}
    />
  </form>
)

export default SearchBar
