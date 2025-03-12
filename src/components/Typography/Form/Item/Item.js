import React, { useEffect, useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormItem = forwardRef(({ name, children, ...props }, ref) => {
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
      {children}
    </div>
  )
})

export default FormItem
