import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormItemName = forwardRef(({ name, required, children, ...props }, ref) => {
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
      <label
        className={`form-item-name-label${required ? ' form-item-required' : ''}`}
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  )
})

export default FormItemName
