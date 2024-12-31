import React, { useImperativeHandle, forwardRef, useRef } from 'react'

// 缩放控件
function ZoomControl({ map, onZoomIn, onZoomOut, ...props }, ref) {
  // 容器
  const rootRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      zoomOut: zoomOut,
      zoomIn: zoomIn
    }
  })

  // 缩小地图
  function zoomOut() {
    map.zoomOut()
    onZoomOut && onZoomOut(map)
  }

  // 放大地图
  function zoomIn() {
    map.zoomIn()
    onZoomIn && onZoomIn(map)
  }

  return (
    <div
      {...props}
      ref={rootRef}
      className={`map-zoomControl${props.className ? ' ' + props.className : ''}`}
    >
      <div className={`map-zoomControl-in`} onClick={zoomIn}>
        <div className="map-zoomControl-icon"></div>
      </div>
      <div className={`map-zoomControl-out`} onClick={zoomOut}>
        <div className="map-zoomControl-icon"></div>
      </div>
    </div>
  )
}

export default forwardRef(ZoomControl)
