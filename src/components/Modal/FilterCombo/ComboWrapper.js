import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const ComboWrapper = forwardRef(({ id, style, className, onClick, children }, ref) => {
  const comboRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      comboDOM: comboRef.current,
      getComboDOM: () => comboRef.current
    }
  })

  return (
    <div id={id} style={style} className={className} onClick={onClick} ref={comboRef}>
      {children}
    </div>
  )
})

export default ComboWrapper
