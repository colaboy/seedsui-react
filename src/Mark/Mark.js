import React, { forwardRef } from 'react'

// 标记
/**
 * @deprecated since version 5.5.8
 * 请使用<Button className="xs"></Button>
 */
const Mark = forwardRef(({ children, ...others }, ref) => {
  return children ? (
    <span ref={ref} {...others} className={`mark${others.className ? ' ' + others.className : ''}`}>
      {children}
    </span>
  ) : null
})

export default Mark
