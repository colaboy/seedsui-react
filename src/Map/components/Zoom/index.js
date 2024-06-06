import React, { useImperativeHandle, forwardRef } from 'react'

// 缩放控件
function Zoom({ map, ...props }, ref) {
  useImperativeHandle(ref, () => {
    return {
      zoomIn: zoomIn,
      zoomOut: zoomOut
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
    <div
      {...props}
      className={`mappage-control-zoom${props.className ? ' ' + props.className : ''}`}
    >
      <div className={`mappage-control-zoom-in`} onClick={zoomIn}>
        <div className="mappage-control-zoom-icon"></div>
      </div>
      <div className={`mappage-control-zoom-out`} onClick={zoomOut}>
        <div className="mappage-control-zoom-icon"></div>
      </div>
    </div>
  )
}

export default forwardRef(Zoom)
