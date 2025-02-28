import React from 'react'

// 展开和收缩图标
const Toggle = ({ onClick }) => {
  return (
    <div className="calendar-toggle-button" onClick={onClick}>
      <svg width="300px" height="78px" viewBox="0 0 300 78" className="calendar-toggle-svg">
        <path d="M31.5,39L150,39l118.5,0" />
      </svg>
    </div>
  )
}

export default Toggle
