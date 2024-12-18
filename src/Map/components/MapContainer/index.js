import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { createIcon as createCenterMarkerIcon } from './../CenterMarker'
import { createIcon as createMarkerIcon } from './../Markers'
import getMapType from './../../utils/getMapType'
import createMap from './createMap'
import createCurrentMap from './createCurrentMap'
import injectChildrenProps from './injectChildrenProps'
import defaultGetAddress from './../../utils/getAddress'
import defaultGetLocation from './../../utils/getLocation'
import defaultQueryNearby from './../../utils/queryNearby'
import markerClickLeaflet from './markerClickLeaflet'
import markerClickCanvas from './markerClickCanvas'

import Result from './../Result'

// 内库使用
import locale from './../../../locale'
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { locale, GeoUtil } from 'seedsui-react'

const MapContainer = forwardRef(
  (
    {
      center,
      zoom,
      minZoom,
      maxZoom,
      // 自定义获取地址和定位
      getAddress,
      getLocation,
      queryNearby,
      // events
      onLoad,
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
    // 指定获取定位和地址的方法
    // eslint-disable-next-line
    if (typeof getAddress !== 'function') getAddress = defaultGetAddress
    // eslint-disable-next-line
    if (typeof getLocation !== 'function') getLocation = defaultGetLocation
    // eslint-disable-next-line
    if (typeof queryNearby !== 'function') queryNearby = defaultQueryNearby

    const rootRef = useRef(null)

    // Latest center coordinate
    const centerRef = useRef(null)

    // Marker layer canvas plugin: high-performance mode
    const markersCanvasLayerRef = useRef(null)
    // Marker layer
    const markersLayerRef = useRef(null)
    // Marker default  icon
    const defaultMarkerIconRef = useRef(null)

    // Center Marker layer
    const centerMarkerLayerRef = useRef(null)
    // Center marker icon
    const centerMarkerIconRef = useRef(null)

    // Circle layer
    const circlesLayerRef = useRef(null)

    let [leafletMap, setLeafletMap] = useState(null)

    // Define export Api
    const APIRef = useRef({
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      type: getMapType(),
      // Dynamic props
      currentMap: null,
      leafletMap: null,
      // 指定获取定位和地址的方法
      getAddress: async (coord) => {
        if (typeof coord !== 'object' || !coord?.longitude || !coord?.latitude || !coord?.type) {
          return 'getAddress must pass longitude, latitude and type'
        }

        let result = await getAddress(coord)

        // Get address success
        if (result?.address) {
          result = {
            ...coord,
            ...result
          }
        }
        // Get address fail
        else {
          result =
            typeof result === 'string'
              ? result
              : locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed')
        }
        return result
      },
      // Get location
      getLocation: async (params) => {
        let result = await getLocation(params)
        if (!result.type && params.type) {
          result.type = params.type
        }
        return result
      },
      // 搜索附近与搜索
      /*
      入参:
      {
        map: APIRef.current, // 内部使用map.currentMap
        keyword: '',
        longitude: '',
        latitude: '',
        radius: 1000 // 不传半径则为模糊搜索
      }
      出参:
      {
        address: '上海市南京东路830号',
        latitude: 31.237415229632834,
        longitude: 121.47015544295395,
        name: 'eve lom市百一店'
      }
      */
      queryNearby: queryNearby,
      // Functions
      setView: (...params) => {
        leafletMap?.setView(...params)
      },
      panTo: (points) => {
        if (!leafletMap) return
        if (Array.isArray(points)) {
          // eslint-disable-next-line
          points = points.map((point) => {
            if (!point?.latitude || !point?.longitude) {
              console.error('MapContainer center invalid parameter:', point)
              return null
            }
            return [point.latitude, point.longitude]
          })
          // eslint-disable-next-line
          points = points.filter((point) => point)
          leafletMap.fitBounds(points, { padding: [1, 1] })
        } else if (typeof points === 'object') {
          if (!points?.latitude || !points?.longitude) {
            return
          }
          leafletMap.panTo([points.latitude, points.longitude])
        }
      },
      getCenter: () => {
        let latlng = leafletMap?.getCenter()
        let center = {
          latitude: latlng.lat,
          longitude: latlng.lng
        }

        // 百度国内坐标为gcj02和bd09
        let isInChina = GeoUtil.isInChina([center.longitude, center.latitude])
        if (isInChina) {
          if (window.BMap) center.type = 'bd09'
          if (window.google || window.AMap) center.type = 'gcj02'
        } else {
          center.type = 'wgs84'
        }

        return center
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
      setZoom: (zoom) => {
        if (!leafletMap?.setZoom) return
        return leafletMap.setZoom(zoom)
      },
      // CenterMarker
      addCenterMarker: function (point, { onClick } = {}) {
        if (!centerMarkerLayerRef.current) return null

        // Draw center marker
        centerMarkerLayerRef.current.clearLayers()
        let marker = window.L.marker([point.latitude, point.longitude], {
          icon: point?.icon || centerMarkerIconRef.current
        })
        marker.addTo(centerMarkerLayerRef.current)

        if (!onClick) return marker
        marker.on('click', function (e) {
          onClick({
            ...(point || {}),
            icon: e?.target?.options?.icon?.options || null,
            setIcon: e.target.setIcon
          })
        })
        return marker
      },
      clearCenterMarker: function () {
        if (!centerMarkerLayerRef.current) return
        centerMarkerLayerRef.current.clearLayers()
      },
      // Marker
      addMarkers: function (points, { onClick = null }) {
        let enableCanvas = points.length > 100

        // Draw markers
        for (let point of points) {
          let marker = window.L.marker([point.latitude, point.longitude], {
            icon: point?.icon || defaultMarkerIconRef.current
          })
          if (enableCanvas) {
            markersCanvasLayerRef.current.addMarker(marker)
          } else {
            marker.addTo(markersLayerRef.current)
          }
        }

        if (!onClick) return
        // Leaflet canvas marker plugin click
        if (enableCanvas) {
          markerClickCanvas({
            points,
            layerGroup: markersCanvasLayerRef.current,
            clearMarkers,
            defaultIcon: defaultMarkerIconRef.current,
            onClick
          })
        } else {
          markerClickLeaflet({
            points,
            clearMarkers,
            layerGroup: markersLayerRef.current,
            defaultIcon: defaultMarkerIconRef.current,
            onClick
          })
        }
      },
      clearMarkers: clearMarkers,
      // Circle
      addCircles: function (points) {
        for (let point of points) {
          let circle = window.L.circle([point.latitude, point.longitude], {
            radius: point?.radius || 200,
            ...(point.style || {})
          })
          circle.addTo(circlesLayerRef.current)
        }
      },
      clearCircles: function () {
        if (!circlesLayerRef.current) return
        circlesLayerRef.current.clearLayers()
      }
    })

    // Export API
    useImperativeHandle(ref, () => {
      return APIRef.current
    })

    // Init leafletMap and currentMap
    useEffect(() => {
      APIRef.current.rootDOM = rootRef.current
      loadData()
      // eslint-disable-next-line
    }, [])

    // Load leafletMap success render children
    useEffect(() => {
      if (!leafletMap) return
      APIRef.current.leafletMap = leafletMap

      // eslint-disable-next-line
    }, [leafletMap])

    // Pan to center
    useEffect(() => {
      if (!center) return
      centerRef.current = center
      APIRef?.current?.panTo?.(center)
      // eslint-disable-next-line
    }, [JSON.stringify(center || '')])

    // Clear all marker
    function clearMarkers() {
      if (!markersCanvasLayerRef.current || !markersLayerRef.current) return
      // Leaflet plugin
      markersCanvasLayerRef.current.clearLayers()

      // Leaflet
      markersLayerRef.current.clearLayers()
    }

    // Load data
    async function loadData() {
      if (!rootRef.current?.querySelector) {
        setLeafletMap(locale('No Container'))
        return
      }

      // Create leaflet leafletMap
      leafletMap = await createMap(rootRef.current.querySelector('.map-container'), {
        center: centerRef.current,
        zoom,
        minZoom,
        maxZoom
      })

      let currentMapContainer = rootRef.current.querySelector('.map-api-container')
      // Create bmap,amap,etc current map to use invoke api
      const currentMap = await createCurrentMap(currentMapContainer, {
        center: centerRef.current
      })
      APIRef.current.currentMap = currentMap

      // Load leafletMap failed
      if (typeof leafletMap === 'string') {
        setLeafletMap(leafletMap)
        onLoad && onLoad(leafletMap)
        return
      }

      // Init leafletMap events
      events()

      // Circle layer init
      circlesLayerRef.current = window.L.layerGroup().addTo(leafletMap)

      // Marker common layer and canvas layer init
      markersCanvasLayerRef.current = window.L.canvasIconLayer({}).addTo(leafletMap)
      markersLayerRef.current = window.L.layerGroup().addTo(leafletMap)
      // Marker default  icon
      defaultMarkerIconRef.current = createMarkerIcon()

      // Center marker layer init
      centerMarkerLayerRef.current = window.L.layerGroup().addTo(leafletMap)
      // Center marker icon
      centerMarkerIconRef.current = createCenterMarkerIcon()

      // Render children
      setLeafletMap(leafletMap)

      // Set BMap max bounds
      if (window.BMap) {
        let southWest = window.L.latLng(-80, -180)
        let northEast = window.L.latLng(84, 180)
        let maxBounds = window.L.latLngBounds(southWest, northEast)

        leafletMap.setMaxBounds(maxBounds)
      }
      // Set google max bounds
      else if (window.google) {
        let southWest = window.L.latLng(-85.05112878, -Infinity)
        let northEast = window.L.latLng(85.05112878, Infinity)
        let maxBounds = window.L.latLngBounds(southWest, northEast)

        leafletMap.setMaxBounds(maxBounds)
      }

      // onLoad success panTo center
      if (centerRef.current) {
        APIRef?.current?.panTo?.(centerRef.current)
      }

      // onLoad event
      onLoad && onLoad(APIRef.current)
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
        APIRef.current.onMoveEnd && APIRef.current.onMoveEnd(APIRef.current)
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
      newChildren = <Result title={leafletMap} />
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
        {/* leaflet地图容器 */}
        <div className="map-container"></div>
        {/* 百度、高德地图容器用于调用api使用，并不展现 */}
        <div className="map-api-container"></div>
        {/* 其它控件 */}
        {leafletMap && typeof leafletMap !== 'string' ? newChildren : null}
      </div>
    )
  }
)

export default MapContainer
