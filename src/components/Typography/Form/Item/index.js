import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormItem = forwardRef(({ help, children, name, ...props }, ref) => {
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

  return (
    <div
      {...props}
      className={`form-item${props.className ? ' ' + props.className : ''}${
        layout === 'horizontal' ? ` row` : ''
      }`}
      id={`${name ? `form-item-${name}` : props?.id || ''}`}
      ref={rootRef}
    >
      {/* 子组件塞入name属性 */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { name: name, help: help }) : child
      )}
    </div>
  )
})

export default FormItem
