import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Ouroboros = (props, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => {
        return rootRef.current
      }
    }
  })
  return (
    <div
      {...props}
      className={`loading-ouroboros${props?.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20"></circle>
      </svg>
    </div>
  )
}

export default forwardRef(Ouroboros)
