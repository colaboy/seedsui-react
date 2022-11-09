import React, { forwardRef } from 'react'

const Button = forwardRef(({ children, ...others }, ref) => {
  return (
    <div
      ref={ref}
      {...others}
      className={'button' + (others.className ? ' ' + others.className : '')}
    >
      {children}
    </div>
  )
})

export default Button
