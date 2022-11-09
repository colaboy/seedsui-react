import React, { forwardRef } from 'react'

const Legend = forwardRef(({ children, ...others }, ref) => {
  return (
    <div
      ref={ref}
      {...others}
      className={`legend${others.className ? ' ' + others.className : ''}`}
    >
      <div className="legend-caption">{children}</div>
    </div>
  )
})

export default Legend
