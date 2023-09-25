import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import Device from './../../Device'

const Layout = forwardRef(({ animation, children, safeArea, ...props }, ref) => {
  const rootRef = useRef(null)

  // 安全区域，Layout全屏时增加安全区域（仅对苹果的安全区域生效）
  if (
    Device.os === 'ios' &&
    Device.platform === 'wq' &&
    Device.compareVersion(Device.platformVersion, '7.1.65') >= 0
  ) {
    // 自动上下
    if (safeArea === 'auto') {
      // eslint-disable-next-line
      safeArea = 'border-top border-bottom'
    }
    // 自动下
    if (safeArea === 'auto-bottom') {
      // eslint-disable-next-line
      safeArea = 'border-bottom'
    }
    // 自动上
    if (safeArea === 'auto-top') {
      // eslint-disable-next-line
      safeArea = 'border-top'
    }
  }

  // 节点
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
      className={`layout safe-area${safeArea ? ' ' + safeArea : ''}${
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
