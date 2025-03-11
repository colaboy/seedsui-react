import React, { useEffect, useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormItem = forwardRef(
  (
    {
      // Virtual properties
      observer,
      inViewArea = true,
      height = 50,
      // Own properties
      help,
      children,
      name,
      ...props
    },
    ref
  ) => {
    // 获取全局配置
    const { layout } = useContext(FormContext)
    const rootRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      if (rootRef.current && observer) {
        observer.observe(rootRef.current)

        return () => {
          observer.unobserve(rootRef.current)
        }
      }
    }, [observer])

    return (
      <div
        {...props}
        className={`form-item${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` row` : ''
        }`}
        id={`${name ? `form-item-${name}` : props?.id || ''}`}
        ref={rootRef}
      >
        {inViewArea ? children : <div style={{ height }} />}
      </div>
    )
  }
)

export default FormItem
