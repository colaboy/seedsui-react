import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Header = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
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
