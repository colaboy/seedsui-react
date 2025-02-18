import React, { forwardRef } from 'react'
import closeAllDropdown from './../utils/closeAllDropdown'

const ToolBar = forwardRef(({ className, children, ...props }, ref) => {
  // 活动状态下, 需要关闭所有的弹窗
  function handleClick(e) {
    if (!e.currentTarget.classList.contains('active')) return
    closeAllDropdown()
  }
  return (
    <div
      ref={ref}
      {...props}
      className={`toolbar` + (className ? ' ' + className : '')}
      onClick={handleClick}
    >
      {children}
    </div>
  )
})

export default ToolBar
