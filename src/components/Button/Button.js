import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const Button = forwardRef(({ children, ...others }, ref) => {
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
      {...others}
      className={'button' + (others.className ? ' ' + others.className : '')}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default Button
