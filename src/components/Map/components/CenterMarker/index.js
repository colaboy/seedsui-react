import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import createIcon from './createIcon'

// 中心点标注
const CenterMarker = forwardRef(({ map, value, onDragStart, onDragEnd, ...props }, ref) => {
  const rootRef = useRef(null)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  useEffect(() => {
    if (!value?.longitude || !value?.latitude) {
      return
    }
    // Destroy clear center marker
    map.clearCenterMarker()
    map.onDragStart = null
    map.onDragEnd = null

    // Add center marker and drag interaction
    map.addCenterMarker({
      longitude: value.longitude,
      latitude: value.latitude,
      icon: createIcon(value?.icon)
    })
    map.onDragStart = (map) => {
      if (onDragEnd) {
        rootRef?.current?.classList?.remove?.('active')
      }
      onDragStart && onDragStart(map)
    }
    map.onDragEnd = (map) => {
      if (onDragEnd) {
        rootRef?.current?.classList?.add?.('active')
        onDragEnd(map)
      }
    }

    // eslint-disable-next-line
  }, [value])

  // 拖拽过程时显示的点, 拖拽结束隐藏
  return (
    <span
      {...props}
      className={`map-center-marker active${props?.className ? ' ' + props.className : ''}`}
      ref={rootRef}
    ></span>
  )
})

export { createIcon }
export default CenterMarker
