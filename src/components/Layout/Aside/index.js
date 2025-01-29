import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Aside = forwardRef(({ safeArea, children, ...props }, ref) => {
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
      {...props}
      className={`layout-aside${safeArea ? ' safe-area' : ''}${
        props.className ? ' ' + props.className : ''
      }`}
      ref={rootRef}
    >
      {children}
    </aside>
  )
})

export default Aside
