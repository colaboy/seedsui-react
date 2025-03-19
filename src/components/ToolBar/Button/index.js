import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const Button = forwardRef(({ children, ...props }, ref) => {
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
      className={'toolbar-button' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default Button
