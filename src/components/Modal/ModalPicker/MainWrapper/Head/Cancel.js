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
      className={`${
        text ? 'modal-picker-header-button-cancel' : 'modal-picker-header-button-close'
      }${props.className ? ' ' + props.className : ''}${disabled === true ? ' disabled' : ''}`}
      onClick={handleClick}
    >
      {text || <div className="modal-picker-icon-close"></div>}
    </div>
  )
}

export default Cancel
