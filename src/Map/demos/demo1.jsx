import React, { useRef, useEffect, useState } from 'react'
import { Map } from 'seedsui-react'
const {
  APILoader,
  MapContainer,
  TileLayer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  LocationControl,
  Marker
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

  useEffect(() => {
    // points = getPoints({
    //   center: center,
    //   // 半径5000000米
    //   radius: 2000,
    //   // 生成10万个点
    //   count: 10
    // })
    // setPoints(points)
  }, [])

  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        // key: 'AIzaSyDy9St7a2h8cZVCof5sEITCxjPhE0llfCo',
        // type: 'google',
        // key: 'AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc',
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
        center={{
          latitude: 50.5,
          longitude: 30.5
        }}
        zoom={16}
        onMoveEnd={(map) => {
          console.log('获取中心点:', map.getCenter())
        }}
        // 基准路径
        iconOptions={{
          imagePath: 'https://res.waiqin365.com/d/seedsui/leaflet/images/'
        }}
      >
        {/* 瓦片图层 */}
        <TileLayer />
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
      </MapContainer>
    </APILoader>
  )
}
