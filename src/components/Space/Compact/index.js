import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react'

const Compact = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  // Add className to children
  useEffect(() => {
    let childrenDOM = rootRef.current.children
    if (!childrenDOM) return

    // Different component, different child className
    let componentClassNames = ['button']

    // Each child add compact className
    for (let index = 0; index < childrenDOM.length; index++) {
      let child = childrenDOM[index]

      // Each child add different compact className
      for (let className of componentClassNames) {
        if (child.classList.contains(className)) {
          child.classList.add(`${className}-compact-item`)
          if (index === 0) {
            child.classList.add(`${className}-compact-first-item`)
          } else if (index === childrenDOM.length - 1) {
            child.classList.add(`${className}-compact-last-item`)
          }
          break
        }
      }
    }
    // eslint-disable-next-line
  }, [])

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
