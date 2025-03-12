import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import FormContext from './../FormContext'

// layout: horizontal | vertical | inline
const VirtualForm = forwardRef(
  (
    { layout = 'horizontal', labelCol, mainCol, scrollerDOM, children, className, ...props },
    ref
  ) => {
    const rootRef = useRef(null)

    // Virtual
    const observerRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      // 创建IntersectionObserver实例
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 元素进入视图
              entry.target.dataset.inView = 'true'
            } else {
              // 元素离开视图
              entry.target.dataset.inView = 'false'
            }
          })
        },
        {
          root: null, // 使用视口作为根
          rootMargin: '0px',
          threshold: 0.1 // 当10%的元素可见时触发
        }
      )

      // 组件卸载时清理
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }, [])

    return (
      <FormContext.Provider
        value={{
          layout,
          labelCol,
          mainCol,
          scrollerDOM: scrollerDOM,
          virtual: { observer: observerRef.current }
        }}
      >
        <div
          ref={rootRef}
          className={`form-items form-layout-${layout}${className ? ' ' + className : ''}`}
          {...props}
        >
          {children}
        </div>
      </FormContext.Provider>
    )
  }
)

export default VirtualForm
