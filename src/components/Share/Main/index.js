import React, { useRef, forwardRef, useImperativeHandle } from 'react'

// 手写签名
const Main = ({ onError, onSuccess, onCancel }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div ref={rootRef} className="signature-main">
      中华人民共和国
    </div>
  )
}

export default forwardRef(Main)
