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
      {title}
      {subTitle}
      {children}
      {extra}
    </div>
  )
})

export default Result
