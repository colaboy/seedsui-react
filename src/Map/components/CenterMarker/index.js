import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import createIcon from './createIcon'

// 中心点标注
const CenterMarker = forwardRef(
  ({ map, icon, longitude, latitude, onDragStart, onDragEnd, ...props }, ref) => {
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
      // 增加drag事件监听
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

      // Destroy clear center marker
      return () => {
        map.clearCenterMarker()
        map.onDragStart = null
        map.onDragEnd = null
      }
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (!longitude || !latitude) {
        return
      }
      map.addCenterMarker({ longitude, latitude, icon })
      // eslint-disable-next-line
    }, [longitude, latitude])

    // 拖拽过程时显示的点, 拖拽结束隐藏
    return (
      <span
        {...props}
        className={`map-center-marker active${props?.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      ></span>
    )
  }
)

export { createIcon }
export default CenterMarker
