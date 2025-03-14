import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Header = forwardRef(({ safeArea, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <header
      {...props}
      className={`layout-header${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </header>
  )
})

export default Header
