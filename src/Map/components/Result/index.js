import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const Result = forwardRef(({ title, subTitle, extra, children, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      {...props}
      className={'map map-result' + (props.className ? ' ' + props.className : '')}
      ref={rootRef}
    >
      <div className="map-result-title">{title}</div>
      <div className="map-result-subtitle">{subTitle}</div>
      {children}
      {extra}
    </div>
  )
})

export default Result
