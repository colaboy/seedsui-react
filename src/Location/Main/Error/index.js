import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Layout from './../../../Layout'
import Notice from './../../../Notice'

// 地图位置选择
const Error = forwardRef(({ errMsg, ...props }, ref) => {
  // 根节点
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef?.current?.rootDOM,
      getRootDOM: rootRef?.current?.getRootDOM
    }
  })

  return (
    <Layout ref={rootRef} className="position-relative" {...props}>
      <Notice caption={errMsg} />
    </Layout>
  )
})

export default Error
