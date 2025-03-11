import React, { useEffect, useImperativeHandle, forwardRef, useRef, useState } from 'react'
import FormContext from './../FormContext'

// layout: horizontal | vertical | inline
const VirtualForm = forwardRef(
  (
    { layout = 'horizontal', labelCol, mainCol, scrollerDOM, children, className, ...props },
    ref
  ) => {
    const rootRef = useRef(null)

    // Virtual
    const [visibleItems, setVisibleItems] = useState(new Set())
    const observerRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      // 创建 IntersectionObserver 实例
      observerRef.current = new IntersectionObserver(
        (entries) => {
          console.log(entries)
          entries.forEach((entry) => {
            const index = parseInt(entry.target.dataset.index)
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]))
            } else {
              setVisibleItems((prev) => {
                const next = new Set(prev)
                next.delete(index)
                return next
              })
            }
          })
        },
        {
          root: rootRef.current,
          rootMargin: '50px 0px',
          threshold: 0
        }
      )

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }, [])

    const renderChildren = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        index,
        observer: observerRef.current,
        inViewArea: visibleItems.has(index)
      })
    })

    return (
      <FormContext.Provider value={{ layout, labelCol, mainCol, scrollerDOM: scrollerDOM }}>
        <div
          ref={rootRef}
          className={`form-items form-layout-${layout}${className ? ' ' + className : ''}`}
          {...props}
        >
          {renderChildren}
        </div>
      </FormContext.Provider>
    )
  }
)

export default VirtualForm
