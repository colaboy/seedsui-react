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

  // Drag icon style interaction
  useEffect(() => {
    map.onDragStart = (map) => {
      rootRef?.current?.classList?.remove?.('active')
      onDragStart && onDragStart(map)
    }
    map.onDragEnd = (map) => {
      rootRef?.current?.classList?.add?.('active')
      onDragEnd && onDragEnd(map)
    }
    // eslint-disable-next-line
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
