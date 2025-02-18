import React, { forwardRef } from 'react'

const NavBarButton = forwardRef(({ children, icon, iconPosition = 'left', ...props }, ref) => {
  // 获取选中状态的Node
  function getIconNode() {
    if (!icon) return null

    if (typeof icon === 'function') {
      return icon()
    }
    if (typeof icon === 'string') {
      return <i className={`navbar-button-icon ${icon}`} />
    }
    return icon
  }

  return (
    <div
      {...props}
      className={'navbar-button' + (props.className ? ' ' + props.className : '')}
      ref={ref}
    >
      {iconPosition !== 'right' && getIconNode()}
      <div className="navbar-button-text">{children}</div>
      {iconPosition === 'right' && getIconNode()}
    </div>
  )
})

export default NavBarButton
