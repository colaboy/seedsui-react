import React, { forwardRef } from 'react'

const Card = forwardRef(({ children, ...others }, ref) => {
  return (
    <div
      ref={ref}
      {...others}
      className={'card' + (others.className ? ' ' + others.className : '')}
    >
      {children}
    </div>
  )
})

export default Card
