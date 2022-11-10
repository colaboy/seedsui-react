import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import './button.less'

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
      ref={rootRef}
      {...others}
      className={'button' + (others.className ? ' ' + others.className : '')}
    >
      {children}
    </div>
  )
})

export default Button
