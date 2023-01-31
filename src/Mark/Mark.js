import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 标记
const Mark = forwardRef(({ children, ...others }, ref) => {
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
      {...others}
      className={`mark${others.className ? ' ' + others.className : ''}`}
      ref={rootRef}
    >
      {children}
    </span>
  ) : null
})

export default Mark
