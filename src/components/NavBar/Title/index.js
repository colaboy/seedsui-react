import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const NavBarTitle = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      {...props}
      className={`navbar-title${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default NavBarTitle
