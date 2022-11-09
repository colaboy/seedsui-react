import React, { forwardRef } from 'react'

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
