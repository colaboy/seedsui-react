import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 内库使用-start
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { SafeArea } from 'seedsui-react'
测试使用-end */

const Footer = forwardRef(({ safeArea, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose tools
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <footer
      {...props}
      className={`layout-footer${SafeArea.getSafeAreaClassName(safeArea)}${
        props.className ? ' ' + props.className : ''
      }`}
      ref={rootRef}
    >
      {children}
    </footer>
  )
})

export default Footer
