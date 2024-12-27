import React, { forwardRef } from 'react'

const Wrapper = forwardRef(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`map-container${props.className ? ' ' + props.className : ''}`}
    ></div>
  )
})

export default Wrapper
