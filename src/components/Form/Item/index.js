import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { Field } from 'rc-field-form'

const FormItem = forwardRef(({ safeArea, children, ...props }, ref) => {
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
    <Field ref={rootRef} name="password">
      {children}
    </Field>
  )
})

export default FormItem
