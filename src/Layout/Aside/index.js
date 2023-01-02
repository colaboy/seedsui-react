import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Aside = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <aside
      ref={ref}
      {...props}
      className={`layout-aside${props.className ? ' ' + props.className : ''}`}
    >
      {children}
    </aside>
  )
})

export default Aside
