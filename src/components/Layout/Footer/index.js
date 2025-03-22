import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import Buttons from './Buttons'

// 内库使用-start
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { SafeArea } from 'seedsui-react'
测试使用-end */

const Footer = forwardRef(({ safeArea, buttons, onChange, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose tools
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  let hasButtons = Array.isArray(buttons) && buttons.length

  return (
    <footer
      {...props}
      className={`layout-footer${
        hasButtons ? ' layout-footer-buttons' : ''
      }${SafeArea.getSafeAreaClassName(safeArea)}${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {hasButtons ? <Buttons buttons={buttons} onChange={onChange} /> : null}
      {children}
    </footer>
  )
})

export default Footer
