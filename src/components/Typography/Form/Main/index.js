import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormMain = forwardRef(
  (
    {
      // Parent transparent properties
      help,
      name,
      // Own properties
      children,
      ...props
    },
    ref
  ) => {
    // 获取全局配置
    const { layout, labelCol, mainCol } = useContext(FormContext)

    const rootRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    return (
      <div
        {...props}
        className={`form-item-main${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` col-${mainCol?.span || 16}` : ''
        }`}
        ref={rootRef}
      >
        {children}
      </div>
    )
  }
)

export default FormMain
