import React from 'react'

const Cancel = ({ disabled, text, onClick, ...props }) => {
  // 点击取消
  function handleClick(e) {
    e.stopPropagation()
    if (onClick) onClick(e)
  }

  return (
    <div
      {...props}
      className={`${text ? 'picker-cancel' : 'picker-close'}${
        props.className ? ' ' + props.className : ''
      }${disabled === true ? ' disabled' : ''}`}
      onClick={handleClick}
    >
      {text || <div className="picker-icon-close"></div>}
    </div>
  )
}

export default Cancel
