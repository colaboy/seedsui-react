import React, { useImperativeHandle, forwardRef } from 'react'

// 缩放控件
function ZoomControl({ map, ...props }, ref) {
  useImperativeHandle(ref, () => {
    return {
      zoomIn: () => {
        map.zoomIn()
      },
      zoomOut: () => {
        map.zoomOut()
      }
    }
  })

  // 缩小地图
  function zoomOut() {
    map.zoomOut()
  }

  // 放大地图
  function zoomIn() {
    map.zoomIn()
  }

  return (
    <div {...props} className={`map-zoomcontrol${props.className ? ' ' + props.className : ''}`}>
      <div className={`map-zoomcontrol-in`} onClick={zoomIn}>
        <div className="map-zoomcontrol-icon"></div>
      </div>
      <div className={`map-zoomcontrol-out`} onClick={zoomOut}>
        <div className="map-zoomcontrol-icon"></div>
      </div>
    </div>
  )
}

export default forwardRef(ZoomControl)