import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'
import getExtraNode from './getExtraNode'

const FormMain = forwardRef(
  (
    {
      // Parent transparent properties
      help,
      name,
      // Own properties
      inputExtra,
      extra,
      error,
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

    const { span, ...mainColProps } = mainCol || {}

    return (
      <div
        {...mainColProps}
        {...props}
        className={`form-item-main${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` col-${span || 16}` : ''
        }`}
        ref={rootRef}
      >
        <div className="form-item-main-input">
          {/* Children */}
          {children}
          {/* Input extra */}
          {getExtraNode(inputExtra, { className: 'form-item-main-input-extra' })}
        </div>
        {/* Error */}
        {error && <div className="form-item-main-error">{error}</div>}
        {/* Main extra */}
        {getExtraNode(extra, { className: 'form-item-main-extra' })}
      </div>
    )
  }
)

export default FormMain
