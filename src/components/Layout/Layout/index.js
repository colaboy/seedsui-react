import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'

// 内库使用-start
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { SafeArea } from 'seedsui-react'
测试使用-end */

// [safeArea] true: 自动安全区; false: 强制取消安全区
const Layout = forwardRef(({ safeArea, animation, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  useEffect(() => {
    if (!rootRef.current) return
    // 子级有aside则增加样式layout-has-aside
    let aside = null
    if (rootRef.current.children) {
      for (let child of rootRef.current.children) {
        if (child.classList.contains('layout-aside')) {
          aside = true
        }
      }
    }
    if (aside) {
      rootRef.current.classList.add('layout-has-aside')
    } else {
      rootRef.current.classList.remove('layout-has-aside')
    }
    // eslint-disable-next-line
  }, [children])

  return (
    <section
      {...props}
      className={`layout${SafeArea.getSafeAreaClassName(safeArea)}${
        props.className ? ' ' + props.className : ''
      }`}
      data-animation={animation}
      ref={rootRef}
    >
      {children}
    </section>
  )
})

export default Layout
