import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import Form from 'rc-field-form'

const FormComponent = forwardRef(({ children, ...props }, ref) => {
  const rootRef = useRef(null)

  console.log('form:', rootRef.current)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <Form ref={rootRef} {...props}>
      {children}
    </Form>
  )
})

export default FormComponent
