import React, { useImperativeHandle, forwardRef, useRef } from 'react'

const FormItemName = forwardRef(({ required, children, ...props }, ref) => {
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
      className={`form-item-name${props.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      <label className={`form-item-name-label${required ? ' form-item-required' : ''}`}>
        {children}
      </label>
    </div>
  )
})

export default FormItemName
