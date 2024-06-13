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
    const APIRef = useRef({
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      // Dynamic props
      currentMap: null,
      leafletMap: null,
      // Functions
      setView: (...params) => {
        leafletMap?.setView(...params)
      },
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
      },
      addMarker: (latlng) => {
        L.marker([latlng.latitude, latlng.longitude]).addTo(leafletMap)
      }
    })

    // Export API
    useImperativeHandle(ref, () => {
      return APIRef.current
    })

    useEffect(() => {
      loadData()
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (!leafletMap) return
      APIRef.current.leafletMap = leafletMap

      // eslint-disable-next-line
    }, [leafletMap])

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
      APIRef.current.currentMap = currentMap
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
        onZoomStart && onZoomStart(APIRef.current)
        APIRef.current.onZoomStart && APIRef.current.onZoomStart(APIRef.current)
      })
      leafletMap.on('zoom', function () {
        onZoom && onZoom(APIRef.current)
        APIRef.current.onZoom && APIRef.current.onZoom(APIRef.current)
      })
      leafletMap.on('zoomend', function () {
        onZoomEnd && onZoomEnd(APIRef.current)
        APIRef.current.onZoomEnd && APIRef.current.onZoomEnd(APIRef.current)
      })

      // Listen move event
      leafletMap.on('movestart', function () {
        onMoveStart && onMoveStart(APIRef.current)
        APIRef.current.onMoveStart && APIRef.current.onMoveStart(APIRef.current)
      })
      leafletMap.on('move', function () {
        onMove && onMove(APIRef.current)
        APIRef.current.onMove && APIRef.current.onMove(APIRef.current)
      })
      leafletMap.on('moveend', function (e) {
        onMoveEnd && onMoveEnd(APIRef.current)
        APIRef.current.onMoveEnd && API.onMoveEnd(APIRef.current)
      })

      // Listen drag event
      leafletMap.on('dragstart', function () {
        onDragStart && onDragStart(APIRef.current)
        APIRef.current.onDragStart && APIRef.current.onDragStart(APIRef.current)
      })
      leafletMap.on('drag', function () {
        onDrag && onDrag(APIRef.current)
        APIRef.current.onDrag && APIRef.current.onDrag(APIRef.current)
      })
      leafletMap.on('dragend', function (e) {
        onDragEnd && onDragEnd(APIRef.current)
        APIRef.current.onDragEnd && APIRef.current.onDragEnd(APIRef.current)
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
        map: APIRef.current
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
