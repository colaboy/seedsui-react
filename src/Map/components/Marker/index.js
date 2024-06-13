import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 标注
const Marker = forwardRef(({ map, latitude, longitude }, ref) => {
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
    if (!latitude || !longitude) {
      return
    }
    L.marker([latitude, longitude]).addTo(map.leafletMap)
  }, [latitude, longitude])

  return <></>
})

export default Marker
