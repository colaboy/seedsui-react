import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import getHighlightNode from './getHighlightNode'

// Base
const Base = forwardRef(({ highlight, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  // 获取Node
  function getNode() {
    if (typeof highlight === 'string' && typeof children === 'string') {
      return getHighlightNode(children, highlight)
    }
    return children
  }

  return (
    <div {...props} className={`${props.className ? ' ' + props.className : ''}`} ref={rootRef}>
      {getNode()}
    </div>
  )
})

export default Base
