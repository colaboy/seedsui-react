import React, { forwardRef } from 'react'

// 照片标识
function Mark({ labels, style, className, ...props }, ref) {
  return (
    <div ref={ref} {...props} className={`image-item-mark${className ? ' ' + className : ''}`}>
      {Array.isArray(labels) && labels.length
        ? labels.map((label, index) => {
            return (
              <div className="image-item-mark-label" key={index}>
                {label}
              </div>
            )
          })
        : null}
    </div>
  )
}

export default forwardRef(Mark)
