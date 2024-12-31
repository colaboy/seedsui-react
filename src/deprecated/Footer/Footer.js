import React, { forwardRef } from 'react'

/**
 * @deprecated since version 5.4.9
 * 请使用Layout.Footer
 */
const Footer = forwardRef(({ children, ...others }, ref) => {
  return (
    <footer
      ref={ref}
      {...others}
      className={`footer${others.className ? ' ' + others.className : ''}`}
    >
      {children}
    </footer>
  )
})

export default Footer
