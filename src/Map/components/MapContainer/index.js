import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import getAddress from './../../utils/getAddress'
import createMap from './createMap'
import createCurrentMap from './createCurrentMap'
import createTileLayer from './createTileLayer'
import injectChildrenProps from './injectChildrenProps'

import Result from './../Result'

const MapContainer = forwardRef(
  (
    {
      center = {
        latitude: 51.505,
        longitude: 0.09
      },
      zoom,
      minZoom,
      maxZoom,
      // Icon setting
      iconOptions = {
        // imagePath: 'marker basic path'
      },
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
      getAddress: async ({ geocoder, longitude, latitude, type }) => {
        let result = null
        if (typeof geocoder === 'function') {
          result = await geocoder({
            longitude,
            latitude,
            type
          })
        } else {
          result = await getAddress({
            longitude,
            latitude,
            type
          })
        }

        // getAddress failed
        if (typeof result === 'string') {
          return result
        }

        // getAddress success
        const addr = result?.address || ''
        if (addr) {
          result.longitude = longitude
          result.latitude = latitude
          result.address = addr
          if (result?.name) result.name = result?.name
        }
        return result
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
      addMarkers: function (points, { onClick = null }) {
        let enableCanvas = points.length > 100
        for (let point of points) {
          let marker = addMarker(point, { enableCanvas: enableCanvas, onClick })
          // Leaflet marker click
          if (!enableCanvas) {
            onClick &&
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

    // Global icon options
    useEffect(() => {
      if (Object.isEmptyObject(iconOptions) || !leafletMap) return
      L.Icon.Default.mergeOptions(iconOptions)
    }, [JSON.stringify(iconOptions || {})])

    // Clear all marker
    function clearMarkers() {
      if (!canvasMarkerRef.current || !markersLayerRef.current) return
      // Leaflet plugin
      canvasMarkerRef.current.clearLayers()

      // Leaflet
      markersLayerRef.current.clearLayers()
    }

    // Add one marker
    function addMarker(latlng, { icon, enableCanvas = false }) {
      let marker = L.marker([latlng.latitude, latlng.longitude], {
        icon: icon || markerIconRef.current
      })

      // Leaflet canvas marker plugin
      if (enableCanvas) {
        canvasMarkerRef.current.addMarker(marker)
      }
      // Leaflet
      else {
        marker.addTo(markersLayerRef.current)
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
      markerIconRef.current = window.L.icon({
        iconUrl: `${iconOptions.imagePath}marker-icon.png`,
        iconRetinaUrl: `${iconOptions.imagePath}marker-icon-2x.png`,
        shadowUrl: `${iconOptions.imagePath}marker-shadow.png`,
        shadowRetinaUrl: `${iconOptions.imagePath}marker-shadow.png`,
        shadowSize: [33, 33],
        iconSize: [20, 33],
        iconAnchor: [10, 16]
      })

      // Render children
      setLeafletMap(leafletMap)
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
