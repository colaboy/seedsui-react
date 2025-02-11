import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Footer = forwardRef(({ safeArea, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose tools
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <footer
      {...props}
      className={`layout-footer${
        (safeArea === 'auto' && ' autoSafeArea') ||
        (safeArea === true && ' safeArea') ||
        (safeArea === false && ' clearSafeArea') ||
        ''
      }${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </footer>
  )
})

export default Footer
