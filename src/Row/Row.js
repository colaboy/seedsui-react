import React, { forwardRef } from 'react'

const Row = forwardRef(({ span, className, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`row` + (className ? ' ' + className : '')}>
      {children}
    </div>
  )
})

export default Row
