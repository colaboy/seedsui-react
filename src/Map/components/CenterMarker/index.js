import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 中心点标注
const CenterMarker = forwardRef(({ map, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  // Get center position after drag end
  useEffect(() => {
    map.onDragStart = () => {
      rootRef?.current?.classList?.remove?.('active')
    }
    map.onDragEnd = () => {
      rootRef?.current?.classList?.add?.('active')
    }
  }, [])

  return (
    <span
      {...props}
      className={`map-center-marker active${props?.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    ></span>
  )
})

export default CenterMarker
