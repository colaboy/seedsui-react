import React, { useRef, useEffect, useState } from 'react'
import { Map } from 'seedsui-react'
const {
  APILoader,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  LocationControl,
  Markers
} = Map
import getPoints from './getPoints'

// let points = []

export default () => {
  const mapRef = useRef(null)
  const center = {
    latitude: 39.907783490367706,
    longitude: 116.39120737493609
  }
  let [points, setPoints] = useState([
    {
      latitude: 50.50000114396945,
      longitude: 30.495636933019107
    }
  ])

  function drawMarkers() {
    points = getPoints({
      center: center,
      // 半径5000000米
      radius: 1000,
      // 生成10万个点
      count: 100
    })
    setPoints(points)
  }
  useEffect(() => {
    drawMarkers()

    // setTimeout(() => {
    //   alert('重新渲染点')
    //   drawMarkers()

    //   setTimeout(() => {
    //     alert('再次渲染点')
    //     drawMarkers()
    //   }, 3000)
    // }, 3000)
  }, [])

  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        // key: 'AIzaSyDy9St7a2h8cZVCof5sEITCxjPhE0llfCo',
        // type: 'google',
        // 百度地图
        key: '3pTjiH1BXLjASHeBmWUuSF83',
        type: 'bmap',

        // 使用当前地图做瓦片图层
        tileLayerPlugin: true
      }}
      onSuccess={() => {
        console.log('地图加载成功')
      }}
      onError={() => {
        console.log('地图加载失败')
      }}
    >
      <div>自定义内容</div>
      <MapContainer
        // api
        ref={mapRef}
        center={center}
        zoom={16}
        onMoveEnd={(map) => {
          console.log('获取中心点:', map.getCenter())
        }}
        // 基准路径
        iconOptions={{
          imagePath: 'https://res.waiqin365.com/d/seedsui/leaflet/images/'
        }}
      >
        {/* 缩放控件 */}
        <ZoomControl
          onZoomIn={(map) => {
            console.log('放大', map.getZoom())
          }}
          onZoomOut={(map) => {
            console.log('缩小'), map.getZoom()
          }}
        />
        {/* 定位控件 */}
        <LocationControl
          onChange={(result) => {
            console.log('定位完成:', result)
            mapRef.current.panTo({ latitude: result.latitude, longitude: result.longitude })
          }}
        />
        {/* 搜索控件 */}
        <SearchControl
          onChange={(item) => {
            console.log('选择搜索项:', item)
            mapRef.current.panTo({ latitude: item.latitude, longitude: item.longitude })
          }}
        />
        {/* 中心标注点: 仅用于显示 */}
        <CenterMarker />

        {/* 标注点 */}
        <Markers
          points={points}
          onClick={(e) => {
            console.log('点击marker:', e)
            // e.remove()
            let newMarkerIcon = window.L.icon({
              iconUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-icon.bak.png`,
              iconRetinaUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-icon.bak.png`,
              shadowUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
              shadowRetinaUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
              shadowSize: [33, 33],
              iconSize: [20, 33],
              iconAnchor: [10, 16]
            })
            e.setIcon(newMarkerIcon, { multiple: false })
          }}
        />

        <div>自定义内容</div>
      </MapContainer>
    </APILoader>
  )
}
