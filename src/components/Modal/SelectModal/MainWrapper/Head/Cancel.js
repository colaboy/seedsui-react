import React from 'react'

const Cancel = ({ disabled, text, onClick, ...props }) => {
  // 点击取消
  function handleClick(e) {
    e.stopPropagation()
    if (onClick) onClick(e)
  }

  if (text === false) return null

  return (
    <div
      {...props}
      className={`${
        text ? 'modal-selectmodal-header-button-cancel' : 'modal-selectmodal-header-button-close'
      }${props.className ? ' ' + props.className : ''}${disabled === true ? ' disabled' : ''}`}
      onClick={handleClick}
    >
      {typeof text === 'string' ? text : <div className="modal-selectmodal-icon-close"></div>}
    </div>
  )
}

export default Cancel
