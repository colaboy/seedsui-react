import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react'

const Footer = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Set safe area
  useEffect(() => {
    // 若父级元素有safe-area, 启用安全区
    let footerDOM = rootRef.current
    let layoutDOM = footerDOM?.parentNode

    if (layoutDOM && layoutDOM.classList.contains('safe-area')) {
      // 删除主体安全区
      let mainDOM = layoutDOM.querySelector('.layout-main.safe-area')
      if (mainDOM) mainDOM.classList.add('clear-safe-area')
      // 底部加上安全区
      footerDOM.classList.add('safe-area', 'border-bottom')
    }

    return () => {
      // 还原主体安全区
      let mainDOM = layoutDOM.querySelector('.layout-main.safe-area')
      if (mainDOM) mainDOM.classList.remove('clear-safe-area')
    }
  }, [])

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <footer
      {...props}
      className={`layout-footer${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      {children}
    </footer>
  )
})

export default Footer
