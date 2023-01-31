import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'

const Layout = forwardRef(({ animation, children, ...props }, ref) => {
  const rootRef = useRef(null)

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
      className={'layout' + (props.className ? ' ' + props.className : '')}
      data-animation={animation}
      ref={rootRef}
    >
      {children}
    </section>
  )
})

export default Layout
