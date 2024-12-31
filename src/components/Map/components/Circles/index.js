import React, { useEffect, forwardRef, useImperativeHandle } from 'react'

// 批量圈
const Circles = forwardRef(({ map, points }, ref) => {
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
      map.clearCircles()
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
    map.clearCircles()
    map.addCircles(points)
  }

  return <></>
})

export default Circles
