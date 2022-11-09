import React, { forwardRef } from 'react'
import { createPortal } from 'react-dom'

const Stencil = forwardRef(({ portal, children, className = 'stencil-list', ...others }, ref) => {
  const DOM = (
    <div ref={ref} {...others} className={`stencil${className ? ' ' + className : ''}`}>
      {children}
    </div>
  )
  if (!portal) {
    return DOM
  }
  return createPortal(DOM, portal || document.getElementById('root') || document.body)
})

export default Stencil
