import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import createIcon from './createIcon'

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
    return () => {
      map.clearMarkers()
    }
    // eslint-disable-next-line
  }, [])

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
  }

  return <></>
})

export { createIcon }
export default Markers
