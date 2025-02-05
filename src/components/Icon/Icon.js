import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Icon = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <i
      {...props}
      className={`seeds-icon${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </i>
  )
})

export default Icon
