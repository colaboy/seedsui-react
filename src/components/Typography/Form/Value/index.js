import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormName = forwardRef(({ required, children, ...props }, ref) => {
  // 获取全局配置
  const { layout, nameCol, valueCol } = useContext(FormContext)

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
      className={`form-item-value${props.className ? ' ' + props.className : ''}${
        layout === 'horizontal' ? ` col-${valueCol}` : ''
      }`}
      ref={rootRef}
    >
      {children}
    </div>
  )
})

export default FormName
