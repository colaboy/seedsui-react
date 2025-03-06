import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import FormContext from './FormContext'
import Item from './Item'
import Name from './Name'
import Value from './Value'

// layout: horizontal | vertical | inline
const Form = forwardRef(
  ({ layout = 'horizontal', nameCol = 8, valueCol = 16, children, ...props }, ref) => {
    const rootRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    return (
      <FormContext.Provider value={{ layout, nameCol, valueCol }}>
        <div ref={rootRef} className={`form-wrapper form-layout-${layout}`} {...props}>
          {children}
        </div>
      </FormContext.Provider>
    )
  }
)

Form.Item = Item
Form.Name = Name
Form.Value = Value
export default Form
