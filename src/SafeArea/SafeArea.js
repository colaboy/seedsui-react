import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 安全区域
const SafeArea = forwardRef((props, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      {...props}
      className={`safe-area${props.className ? ' ' + props.className : ' bottom-height'}`}
      ref={rootRef}
    ></div>
  )
})

export default SafeArea
