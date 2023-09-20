import React from 'react'

const Cancel = ({ cancelProps, onCancelClick }) => {
  // 确定和取消按钮
  let {
    visible,
    caption: cancelCaption,
    disabled: cancelDisabled,
    ...otherCancelProps
  } = cancelProps || {}

  // 点击取消
  function handleCancelClick(e) {
    e.stopPropagation()
    if (cancelProps?.onClick) cancelProps.onClick(e)
    if (onCancelClick) onCancelClick(e)
  }

  return (
    <div
      {...otherCancelProps}
      className={`${cancelCaption ? 'picker-cancel' : 'picker-close'}${
        otherCancelProps.className ? ' ' + otherCancelProps.className : ''
      }${cancelDisabled === true ? ' disabled' : ''}`}
      onClick={handleCancelClick}
    >
      {cancelCaption || <div className="picker-icon-close"></div>}
    </div>
  )
}

export default Cancel
