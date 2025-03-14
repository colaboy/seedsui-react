import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import FormContext from './../FormContext'

// layout: horizontal | vertical | inline
const VirtualForm = forwardRef(
  (
    { layout = 'horizontal', labelCol, mainCol, scrollerDOM, children, className, ...props },
    ref
  ) => {
    const rootRef = useRef(null)

    // Virtual
    let [observer, setObserver] = useState(null)
    const observerCallbacksRef = useRef(new WeakMap())

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      // 创建IntersectionObserver实例
      // eslint-disable-next-line
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // console.log(entry.target.classList.contains('form-item'))
            const callback = observerCallbacksRef.current.get(entry.target)
            callback?.(entry.isIntersecting)
          })
        },
        {
          root: null, // 使用视口作为根
          threshold: 0.1 // 当10%的元素可见时触发
          // rootMargin: '0px',
        }
      )
      setObserver(observer)

      // 组件卸载时清理
      return () => {
        if (observer) {
          observer.disconnect()
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
          virtual: { observer: observer, observerCallbacks: observerCallbacksRef.current }
        }}
      >
        <div
          ref={rootRef}
          className={`form-items virtual form-layout-${layout}${className ? ' ' + className : ''}`}
          {...props}
        >
          {children}
        </div>
      </FormContext.Provider>
    )
  }
)

export default VirtualForm
