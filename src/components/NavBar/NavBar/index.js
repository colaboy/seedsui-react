import React, { forwardRef } from 'react'

const NavBar = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`navbar` + (className ? ' ' + className : '')}>
      {children}
    </div>
  )
})

export default NavBar
