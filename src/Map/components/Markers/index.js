import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 批量标注
const Markers = forwardRef(({ map, points, onClick }, ref) => {
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
    if (!points?.[0]?.latitude || !points?.[0]?.longitude) {
      return
    }
    map.clearMarkers()
    map.addMarkers(points, { onClick })
  }, [points])

  return <></>
})

export default Markers
