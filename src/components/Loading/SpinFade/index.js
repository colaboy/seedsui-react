import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const SpinFade = (props, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => {
        return rootRef.current
      }
    }
  })
  return (
    <div
      {...props}
      className={`loading-spinfade${props?.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    >
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
      <div className="loading-spinfade-item"></div>
    </div>
  )
}

export default forwardRef(SpinFade)
