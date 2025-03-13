import React from 'react'

// Search Icon: click to expand search
const PlaceholderIcon = ({ onClick }) => {
  return (
    <div className="toolbar-search-collapse">
      <i className="toolbar-search-collapse-icon" onClick={onClick}></i>
    </div>
  )
}

export default PlaceholderIcon
