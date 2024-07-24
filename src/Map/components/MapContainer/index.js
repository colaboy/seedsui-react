import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import createMap from './createMap'
import createCurrentMap from './createCurrentMap'
import createTileLayer from './createTileLayer'
import injectChildrenProps from './injectChildrenProps'
import Icon from './../../utils/Icon'
import defaultGetAddress from './../../utils/getAddress'
import defaultGetLocation from './../../utils/getLocation'

import Result from './../Result'

const MapContainer = forwardRef(
  (
    {
      center,
      zoom,
      minZoom,
      maxZoom,
      // Icon setting
      iconOptions = {
        // imagePath: 'marker basic path'
      },
      // 自定义获取地址和定位
      getAddress,
      getLocation,
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

    const rootRef = useRef(null)
    // canvas marker plugin
    const canvasMarkerRef = useRef(null)
    // Marker layer
    const markersLayerRef = useRef(null)
    // Default marker icon
    const markerIconRef = useRef(null)

    let [leafletMap, setLeafletMap] = useState(null)

    // Define export Api
    const APIRef = useRef({
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      // Dynamic props
      currentMap: null,
      leafletMap: null,
      // 指定获取定位和地址的方法
      getAddress: getAddress,
      getLocation: getLocation,
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
        return {
          latitude: latlng.lat,
          longitude: latlng.lng,
          type: 'wgs84'
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
      // 单个点只支持Leaflet绘制不支持canvas绘制
      addMarker: function (point, { onClick, layerGroup }) {
        let marker = addMarker(point, { layerGroup })
        onClick && addLeafletMarkerClick(marker, { onClick })
        return marker
      },
      addMarkers: function (points, { onClick = null }) {
        let enableCanvas = points.length > 100
        for (let point of points) {
          let marker = addMarker(point, { enableCanvas: enableCanvas })
          // Leaflet marker click
          if (!enableCanvas) {
            onClick && addLeafletMarkerClick(marker, { onClick })
          }
        }

        // Leaflet canvas marker plugin click
        if (enableCanvas) {
          canvasMarkerRef.current.addOnClickListener((e, data) => {
            let target = data[0]
            const longitude = target.data._latlng.lng
            const latitude = target.data._latlng.lat

            onClick &&
              onClick({
                icon: target?.data?.options?.icon?.options || null,
                setIcon: (icon, { multiple = true }) => {
                  // Single choice
                  if (!multiple) {
                    clearMarkers()
                    for (let point of points) {
                      addMarker(point, {
                        enableCanvas: true,
                        icon:
                          point.longitude === longitude && point.latitude === latitude ? icon : null
                      })
                    }
                  }
                  // Multiple choice
                  else {
                    canvasMarkerRef.current.removeMarker(target, true)
                    addMarker(
                      { longitude: longitude, latitude: latitude },
                      { enableCanvas: enableCanvas, icon: icon }
                    )
                  }
                },
                remove: () => canvasMarkerRef.current.removeMarker(data[0], true),
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
              })
          })
        }
      },
      clearMarkers: clearMarkers
    })

    // Export API
    useImperativeHandle(ref, () => {
      return APIRef.current
    })

    // Init leafletMap and currentMap
    useEffect(() => {
      loadData()
      // eslint-disable-next-line
    }, [])

    // Load leafletMap success render children
    useEffect(() => {
      if (!leafletMap) return
      APIRef.current.leafletMap = leafletMap

      // eslint-disable-next-line
    }, [leafletMap])

    // Global icon setting
    useEffect(() => {
      if (Object.isEmptyObject(iconOptions) || !leafletMap) return
      window.L.Icon.Default.mergeOptions(iconOptions)
      // eslint-disable-next-line
    }, [JSON.stringify(iconOptions || {})])

    // Pan to center
    useEffect(() => {
      if (!center) return
      APIRef?.current?.panTo?.(center)
      // eslint-disable-next-line
    }, [JSON.stringify(center || '')])

    // 公共点击leaflet点
    function addLeafletMarkerClick(marker, { onClick }) {
      marker.on('click', function (e) {
        onClick({
          icon: e?.target?.options?.icon?.options || null,
          setIcon: (icon, { multiple }) => {
            // Single choice
            if (!multiple) {
              let markers = markersLayerRef.current.getLayers()
              for (let marker of markers) {
                marker.setIcon(markerIconRef.current)
              }
              e.target.setIcon(icon)
            }
            // Multiple choice
            else {
              e.target.setIcon(icon)
            }
          },
          remove: () => e.target.remove(),
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        })
      })
    }

    // Clear all marker
    function clearMarkers() {
      if (!canvasMarkerRef.current || !markersLayerRef.current) return
      // Leaflet plugin
      canvasMarkerRef.current.clearLayers()

      // Leaflet
      markersLayerRef.current.clearLayers()
    }

    // Add one marker
    function addMarker(
      latlng,
      {
        // 自定义图标
        icon,
        // 是否使用canvas绘制
        enableCanvas = false,
        // 自定义leaflet图层
        layerGroup
      } = {}
    ) {
      if (!latlng?.latitude || !latlng?.longitude) return

      let marker = window.L.marker([latlng.latitude, latlng.longitude], {
        icon: latlng?.icon || icon || markerIconRef.current
      })

      // Leaflet canvas marker plugin
      if (enableCanvas) {
        canvasMarkerRef.current.addMarker(marker)
      }
      // Leaflet
      else {
        if (layerGroup) {
          marker.addTo(layerGroup)
        } else {
          marker.addTo(markersLayerRef.current)
        }
      }
      return marker
    }
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
      const currentMap = await createCurrentMap(rootRef.current.querySelector('.map-api-container'))
      APIRef.current.currentMap = currentMap

      // Load leafletMap failed
      if (typeof leafletMap === 'string') {
        setLeafletMap(leafletMap)
        onLoad && onLoad(leafletMap)
        return
      }

      // Display tile layer
      await createTileLayer(leafletMap)

      // Init leafletMap events
      events()

      // Load canvasMarkerRef
      canvasMarkerRef.current = window.L.canvasIconLayer({}).addTo(leafletMap)

      // add marker layerGroup
      markersLayerRef.current = window.L.layerGroup().addTo(leafletMap)

      // Default marker icon
      markerIconRef.current = window.L.icon(Icon.defaultIconOptions)

      // Render children
      setLeafletMap(leafletMap)

      // Set BMap max bounds
      if (window.BMap) {
        let southWest = L.latLng(-80, -180)
        let northEast = L.latLng(84, 180)
        let maxBounds = L.latLngBounds(southWest, northEast)

        leafletMap.setMaxBounds(maxBounds)
      }
      // Set google max bounds
      else if (window.google) {
        let southWest = L.latLng(-85.05112878, -Infinity)
        let northEast = L.latLng(85.05112878, Infinity)
        let maxBounds = L.latLngBounds(southWest, northEast)

        leafletMap.setMaxBounds(maxBounds)
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
