import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

// 内库使用-start
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'seedsui-react'
测试使用-end */

const FormItemName = forwardRef(
  (
    {
      // Parent transparent properties
      help,
      name,
      // Own properties
      required,
      children,
      ...props
    },
    ref
  ) => {
    // 获取全局配置
    const { layout, nameCol } = useContext(FormContext)

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
        className={`form-item-name${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` col-${nameCol}` : ''
        }`}
        ref={rootRef}
      >
        {children}
        {help && (
          <i
            className="form-item-help"
            onClick={() => {
              Toast.show({ content: help })
            }}
          ></i>
        )}
        {required && <span className="form-item-required">*</span>}
      </div>
    )
  }
)

export default FormItemName
