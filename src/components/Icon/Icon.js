import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Icon = forwardRef(({ name, className, size, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  let classList = []
  if (name) {
    classList.push('seeds-icons seeds-icon-' + name)
  }
  if (className) {
    classList.push(className)
  }
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
      className={`${classList.join(' ')}`}
      ref={rootRef}
    >
      {children}
    </i>
  )
})

export default Icon
