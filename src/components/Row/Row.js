import React, { forwardRef } from 'react'
import Col from './Col'

const Row = forwardRef(({ span, className, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`row` + (className ? ' ' + className : '')}>
      {children}
    </div>
  )
})

Row.Col = Col
export default Row
