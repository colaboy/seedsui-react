import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 内库使用-start
import Layout from './../../../../Layout'
// 内库使用-end

/* 测试使用-start
import { Layout } from 'seedsui-react'
测试使用-end */

// 滚动容器
const Scroller = forwardRef((props, ref) => {
  // 容器
  const rootRef = useRef(null)
  // Expose
  useImperativeHandle(ref, () => {
    return rootRef.current?.rootDOM
  })

  return <Layout.Main ref={rootRef} {...props} />
})

export default Scroller
