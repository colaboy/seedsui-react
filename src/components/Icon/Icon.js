import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Icon = forwardRef(({ name, size, children, ...props }, ref) => {
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
      style={
        typeof size === 'number'
          ? {
              width: `${size}px`,
              height: `${size}px`,
              fontSize: `${size}px`
            }
          : {}
      }
      {...props}
      className={`icon${name ? ' seeds-icons seeds-icon-' + name : ''}${
        props.className ? ' ' + props.className : ''
      }`}
      ref={rootRef}
    >
      {children}
    </i>
  )
})

export default Icon
