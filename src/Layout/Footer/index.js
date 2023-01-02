import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Footer = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <footer
      ref={ref}
      {...props}
      className={`layout-footer${props.className ? ' ' + props.className : ''}`}
    >
      {children}
    </footer>
  )
})

export default Footer
