import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import createMap from './createMap'
import createCurrentMap from './createCurrentMap'
import injectChildrenProps from './injectChildrenProps'

import Result from './../Result'

const Map = forwardRef(
  (
    {
      center = {
        latitude: 51.505,
        longitude: 0.09
      },
      zoom,
      minZoom,
      maxZoom,
      // events
      onZoomStart,
      onZoom,
      onZoomEnd,
      onMoveStart,
      onMove,
      onMoveEnd,
      onDragStart,
      onDrag,
      onDragEnd,

      children,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    let [leafletMap, setLeafletMap] = useState(null)

    // Define export Api
    const API = {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      currentMap: null,
      leafletMap: leafletMap,
      // Functions
      setView: leafletMap?.setView,
      panTo: (latlng) => {
        if (!leafletMap || !latlng.latitude || !latlng.longitude) return
        leafletMap.panTo([latlng.latitude, latlng.longitude])
      },
      getCenter: () => {
        let center = leafletMap?.getCenter()
        return {
          latitude: center.lat,
          longitude: center.lng
        }
      },
      zoomIn: () => {
        leafletMap?.zoomIn()
      },
      zoomOut: () => {
        leafletMap?.zoomOut()
      },
      getZoom: () => {
        return leafletMap?.getZoom?.() || null
      }
    }

    // Export API
    useImperativeHandle(ref, () => {
      return API
    })

    useEffect(() => {
      loadData()
      // eslint-disable-next-line
    }, [])

    // Load data
    async function loadData() {
      // Create leaflet leafletMap
      leafletMap = createMap(rootRef.current.querySelector('.map-container'), {
        center,
        zoom,
        minZoom,
        maxZoom
      })
      // Create bmap,amap,etc current map to use invoke api
      const currentMap = createCurrentMap(rootRef.current.querySelector('.map-api-container'))
      API.currentMap = currentMap
      setLeafletMap(leafletMap)

      // Load leafletMap failed
      if (typeof leafletMap === 'string') {
        return
      }

      events()
    }

    // Bind events
    function events() {
      // Listen zoom event
      leafletMap.on('zoomstart', function () {
        onZoomStart && onZoomStart(API)
        API.onZoomStart && API.onZoomStart(API)
      })
      leafletMap.on('zoom', function () {
        onZoom && onZoom(API)
        API.onZoom && API.onZoom(API)
      })
      leafletMap.on('zoomend', function () {
        onZoomEnd && onZoomEnd(API)
        API.onZoomEnd && API.onZoomEnd(API)
      })

      // Listen move event
      leafletMap.on('movestart', function () {
        onMoveStart && onMoveStart(API)
        API.onMoveStart && API.onMoveStart(API)
      })
      leafletMap.on('move', function () {
        onMove && onMove(API)
        API.onMove && API.onMove(API)
      })
      leafletMap.on('moveend', function (e) {
        onMoveEnd && onMoveEnd(API)
        API.onMoveEnd && API.onMoveEnd(API)
      })

      // Listen drag event
      leafletMap.on('dragstart', function () {
        onDragStart && onDragStart(API)
        API.onDragStart && API.onDragStart(API)
      })
      leafletMap.on('drag', function () {
        onDrag && onDrag(API)
        API.onDrag && API.onDrag(API)
      })
      leafletMap.on('dragend', function (e) {
        onDragEnd && onDragEnd(API)
        API.onDragEnd && API.onDragEnd(API)
      })
    }

    // Render
    let newChildren = null
    // 未加载完成显示空
    if (!leafletMap) {
      newChildren = null
    }
    // 加载失败
    else if (typeof leafletMap === 'string') {
      newChildren = <Result title={errMsg} />
    }
    // 加载成功
    else {
      newChildren = injectChildrenProps(children, {
        map: API
      })
    }

    return (
      <div
        {...props}
        className={'map' + (props.className ? ' ' + props.className : '')}
        ref={rootRef}
      >
        {/* leftlet地图容器 */}
        <div className="map-container"></div>
        {/* 百度、高德地图容器用于调用api使用，并不展现 */}
        <div className="map-api-container"></div>
        {/* 其它控件 */}
        {newChildren}
      </div>
    )
  }
)

export default Map
