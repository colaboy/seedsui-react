import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 中心点标注
const CenterMarker = forwardRef(({ map, onDragStart, onDragEnd, ...props }, ref) => {
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
    map.onDragStart = (map) => {
      rootRef?.current?.classList?.remove?.('active')
      onDragStart && onDragStart(map)
    }
    map.onDragEnd = (map) => {
      rootRef?.current?.classList?.add?.('active')
      onDragEnd && onDragEnd(map)
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
