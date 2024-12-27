import React, { forwardRef } from 'react'

const Star = forwardRef(({ ...others }, ref) => {
  return (
    <i ref={ref} {...others} className={`star${others.className ? ' ' + others.className : ''}`} />
  )
})

export default Star
