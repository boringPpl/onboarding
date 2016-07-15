import React from 'react'

const Label = ({ text, color }) => (
  <span style={{
    padding: '4px 8px',
    margin: 4,
    fontSize: 11,
    fontWeight: 400,
    color: 'white',
    background: color,
    borderRadius: 4
  }}>
    {text}
  </span>
)

export default Label
