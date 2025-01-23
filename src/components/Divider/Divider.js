import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const Divider = forwardRef(({ children, ...props }, ref) => {
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
      className={'divider' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default Divider
