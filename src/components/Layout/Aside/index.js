import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 内库使用-start
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { SafeArea } from 'seedsui-react'
测试使用-end */

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
      className={`layout-aside${SafeArea.getSafeAreaClassName(safeArea)}${
        props.className ? ' ' + props.className : ''
      }`}
      ref={rootRef}
    >
      {children}
    </aside>
  )
})

export default Aside
