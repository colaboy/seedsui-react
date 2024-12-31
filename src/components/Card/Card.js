import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Card = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div {...props} className={`card${props.className ? ' ' + props.className : ''}`} ref={rootRef}>
      {children}
    </div>
  )
})

export default Card
