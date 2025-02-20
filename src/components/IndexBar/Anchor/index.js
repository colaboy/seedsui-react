import React from 'react'

// 序列控件的锚点
const Anchor = ({ name, children, ...props }) => {
  if (!name) {
    return children
  }

  return (
    <div
      {...props}
      className={`indexbar-anchor${props?.className ? ' ' + props.className : ''}`}
      data-indexbar-anchor={name}
    >
      {children}
    </div>
  )
}

export default Anchor
