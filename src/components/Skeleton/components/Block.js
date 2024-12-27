import React, { forwardRef } from 'react'

const Block = ({ animated = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`skeleton-block${animated ? ' animated' : ''}${
        props.className ? ' ' + props.className : ''
      }`}
    ></div>
  )
}

export default forwardRef(Block)
