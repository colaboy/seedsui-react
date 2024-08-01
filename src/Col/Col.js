import React, { forwardRef } from 'react'

const Col = forwardRef(({ span, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`col col-${span || 0}` + (className ? ' ' + className : '')}
    >
      {children}
    </div>
  )
})

export default Col
