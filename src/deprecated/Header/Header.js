import React, { forwardRef } from 'react'

const Header = forwardRef(({ children, ...others }, ref) => {
  return (
    <header
      ref={ref}
      {...others}
      className={`header${others.className ? ' ' + others.className : ''}`}
    >
      {children}
    </header>
  )
})

export default Header
