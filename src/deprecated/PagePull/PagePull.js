import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Page from './../Page'
import Instance from './instance.js'

const PagePull = forwardRef(
  (
    {
      // Side 侧边栏
      drag = true,
      transition = 'push', // 过渡动画, push | reveal
      lSide, // 左侧边栏
      lSideAttribute = {},
      rSide, // 右侧边栏
      rSideAttribute = {},
      // Page
      children,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    useEffect(() => {
      if (instance.current) return
      initInstance()
      // eslint-disable-next-line
    }, [])

    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    function initInstance() {
      if (!rootRef?.current) return
      instance.current = new Instance(rootRef.current, {
        drag: true,
        transition: transition || 'push',
        onShowedLeft: lSideAttribute.onShowed,
        onShowedRight: rSideAttribute.onShowed
      })
    }

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return props
      var propsed = {}
      for (let n in props) {
        if (n !== 'onShowed') {
          propsed[n] = props[n]
        }
      }
      return propsed
    }

    // 剔除掉onShowed事件, 因为在instance时已经回调了
    lSideAttribute = filterProps(lSideAttribute)
    rSideAttribute = filterProps(rSideAttribute)

    return (
      <div className="page-pull" ref={rootRef}>
        {/* 主体部分 */}
        <Page {...others}>
          {children}
          <div className="mask"></div>
        </Page>
        {/* 左侧边栏 */}
        {lSide && (
          <aside
            {...lSideAttribute}
            className={`page-side-left${
              lSideAttribute.className ? ' ' + lSideAttribute.className : ''
            }`}
            data-transition={transition}
          >
            {lSide}
          </aside>
        )}
        {/* 右侧边栏 */}
        {rSide && (
          <aside
            {...lSideAttribute}
            className={`page-side-right${
              lSideAttribute.className ? ' ' + lSideAttribute.className : ''
            }`}
            data-transition={transition}
          >
            {rSide}
          </aside>
        )}
      </div>
    )
  }
)

export default PagePull
