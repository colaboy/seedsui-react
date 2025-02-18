import React from 'react'

// 标题
const Title = ({ title, props }) => {
  return (
    <div
      {...props}
      className={`modal-selectmodal-header-title${props?.className ? ' ' + props?.className : ''}`}
    >
      {title}
    </div>
  )
}

export default Title
