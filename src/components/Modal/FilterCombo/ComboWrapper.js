import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const ComboWrapper = forwardRef(({ id, style, className, onClick, children }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div id={id} style={style} className={className} onClick={onClick} ref={rootRef}>
      {children}
    </div>
  )
})

export default ComboWrapper
