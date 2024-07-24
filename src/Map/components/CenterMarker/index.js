import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// 中心点标注
const CenterMarker = forwardRef(
  ({ map, icon, longitude, latitude, onDragStart, onDragEnd, ...props }, ref) => {
    const rootRef = useRef(null)

    // 创建中心点独立的图层, 防止被清理
    const layerGroupRef = useRef(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    // Drag icon style interaction
    useEffect(() => {
      // 创建图层组
      layerGroupRef.current = window.L.layerGroup().addTo(map.leafletMap)

      // 增加drag事件监听
      map.onDragStart = (map) => {
        rootRef?.current?.classList?.remove?.('active')
        onDragStart && onDragStart(map)
      }
      map.onDragEnd = (map) => {
        rootRef?.current?.classList?.add?.('active')
        onDragEnd && onDragEnd(map)
      }
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (!longitude || !latitude) {
        return
      }
      if (layerGroupRef.current) {
        layerGroupRef.current.clearLayers()
      }
      map.addMarker({ longitude, latitude, icon }, { layerGroup: layerGroupRef.current })
      // eslint-disable-next-line
    }, [longitude, latitude])

    return (
      <span
        {...props}
        className={`map-center-marker active${props?.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      ></span>
    )
  }
)

export default CenterMarker
