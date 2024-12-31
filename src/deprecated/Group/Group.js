import React, { forwardRef } from 'react'

const Group = forwardRef(({ children, className = 'border-tb', ...others }, ref) => {
  return (
    <div ref={ref} {...others} className={'group' + (className ? ' ' + className : '')}>
      {children}
    </div>
  )
})

export default Group
