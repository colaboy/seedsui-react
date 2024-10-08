import React, { useEffect, forwardRef, useImperativeHandle } from 'react'

// 批量标注
const Markers = forwardRef(({ map, points, onClick, onMarkerEnd }, ref) => {
  // 节点
  useImperativeHandle(ref, () => {
    return {
      redraw: () => {
        draw()
      }
    }
  })

  useEffect(() => {
    draw()
    // eslint-disable-next-line
  }, [JSON.stringify(points)])

  function draw() {
    if (!points?.[0]?.latitude || !points?.[0]?.longitude) {
      return
    }
    map.clearMarkers()
    map.addMarkers(points, { onClick })

    onMarkerEnd && onMarkerEnd()
  }

  return <></>
})

export default Markers
