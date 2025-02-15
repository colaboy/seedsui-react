import React, { forwardRef } from 'react'

const ToolBar = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`toolbar` + (className ? ' ' + className : '')}>
      {children}
    </div>
  )
})

export default ToolBar
