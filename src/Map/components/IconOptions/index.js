import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 全局设置图标
const IconOptions = forwardRef(({ map, ...options }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  // Global icon options
  useEffect(() => {
    if (Object.isEmptyObject(options)) return
    L.Icon.Default.mergeOptions(options)
  }, [JSON.stringify(options || {})])

  return <></>
})

export default IconOptions
