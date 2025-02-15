import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Compact = forwardRef(({ children, ...props }, ref) => {
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
      className={`space-compact${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default Compact
