import React, { useRef, useState } from 'react'
import { Map as SMap } from 'seedsui-react'
const {
  APILoader,
  Map,
  IconOptions,
  TileLayer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  LocationControl,
  Marker
} = SMap

export default () => {
  const mapRef = useRef(null)
  const points = [
    {
      latitude: 50.50000114396945,
      longitude: 30.49772100193238
    }
  ]

  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        // key: 'AIzaSyDta4y3H7RIv79j5e0cRq4Eqpl4xn-E57g',
        key: 'AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc',
        type: 'google',
        // 百度地图
        // key: '3pTjiH1BXLjASHeBmWUuSF83',
        // type: 'bmap',

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
      <Map
        // api
        ref={mapRef}
        center={{
          latitude: 50.5,
          longitude: 30.5
        }}
        zoom={16}
        onMoveEnd={(map) => {
          console.log('获取中心点:', map.getCenter())
        }}
      >
        {/* 瓦片图层 */}
        <TileLayer />
        {/* 全局图标设置 */}
        <IconOptions
          // 基准路径
          imagePath={'https://res.waiqin365.com/d/seedsui/leaflet/images/'}
        />
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
        {points.map((point, index) => {
          return <Marker key={index} latitude={point.latitude} longitude={point.longitude} />
        })}

        <div>自定义内容</div>
      </Map>
    </APILoader>
  )
}
