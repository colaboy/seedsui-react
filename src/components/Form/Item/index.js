import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { Field } from 'rc-field-form'

const FormItem = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)
  console.log('FormItem', rootRef)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <Field ref={rootRef} {...props}>
      {children}
    </Field>
  )
})

export default FormItem
