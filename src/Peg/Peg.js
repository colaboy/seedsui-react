import React, { forwardRef } from 'react'

const Peg = forwardRef(({ ...others }, ref) => {
  return (
    <i ref={ref} {...others} className={`peg${others.className ? ' ' + others.className : ''}`}></i>
  )
})

export default Peg
