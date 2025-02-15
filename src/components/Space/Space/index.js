import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Space = forwardRef(({ size, ...props }, ref) => {
  const rootRef = useRef(null)

  // Space
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      {...props}
      className={`space${props.className ? ' ' + props.className : ''}`}
      style={{
        gap: `${typeof size?.[0] === 'number' ? size[0] + 'px' : ''} ${
          typeof size?.[1] === 'number' ? size[1] + 'px' : ''
        }`,
        ...(props?.style || {})
      }}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default Space
