import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 中心点标注
const CenterMarker = forwardRef(({ map, onChange, ...props }, ref) => {
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
    map.on('dragstart', function () {
      rootRef?.current?.classList?.remove?.('active')
    })
    map.on('dragend', function () {
      rootRef?.current?.classList?.add?.('active')
      let center = map.getCenter()
      onChange &&
        onChange({
          latitude: center.lat,
          longitude: center.lng
        })
    })
  }, [])

  return <span className={`map-center-marker active`} {...props} ref={rootRef}></span>
})

export default CenterMarker
