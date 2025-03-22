import React, { useEffect, forwardRef, useImperativeHandle } from 'react'

// 批量标注
const Markers = forwardRef(({ map, points, onClick }, ref) => {
  // Expose
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

export default Markers
