import React, { forwardRef } from 'react'

const Dot = forwardRef(({ ...others }, ref) => {
  return (
    <i ref={ref} {...others} className={`dot${others.className ? ' ' + others.className : ''}`}></i>
  )
})

export default Dot
