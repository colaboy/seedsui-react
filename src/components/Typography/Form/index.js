import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import Item from './Item'
import Name from './Name'
import Value from './Value'

// layout: horizontal | vertical | inline
const FormComponent = forwardRef(({ layout = 'horizontal', children, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div ref={rootRef} className={`form-wrapper form-layout-${layout}`} {...props}>
      {children}
    </div>
  )
})

FormComponent.Item = Item
FormComponent.Name = Name
FormComponent.Value = Value
export default FormComponent
