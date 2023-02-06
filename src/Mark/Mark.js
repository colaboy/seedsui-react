import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 标记
const Mark = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return children ? (
    <span
      {...props}
      className={`mark${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </span>
  ) : null
})

export default Mark
