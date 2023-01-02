import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const Layout = forwardRef(({ animation, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <section
      ref={rootRef}
      {...props}
      className={'layout' + (props.className ? ' ' + props.className : '')}
      data-animation={animation}
    >
      {children}
    </section>
  )
})

export default Layout
