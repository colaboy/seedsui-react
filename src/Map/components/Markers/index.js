import React, { useEffect, forwardRef, useImperativeHandle } from 'react'

// 批量标注
const Markers = forwardRef(({ map, points, onClick }, ref) => {
  // 节点
  useImperativeHandle(ref, () => {
    return {
      redraw: () => {
        draw()
      }
    }
  })

  useEffect(() => {
    debugger
    draw()
  }, [points])

  function draw() {
    if (!points?.[0]?.latitude || !points?.[0]?.longitude) {
      return
    }
    map.clearMarkers()
    map.addMarkers(points, { onClick })
  }

  return <></>
})

export default Markers
