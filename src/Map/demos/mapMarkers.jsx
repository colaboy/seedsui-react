import React, { useRef } from 'react'

// 内库使用
import { Map } from 'seedsui-react'

// 测试使用
// import Map from 'library/components/Map'

// 生成随机点
// import getPoints from './getPoints'
const { APILoader, MapMarkers, LocationControl, coordsToWgs84 } = Map

// 随机生成点, 用于测试性能
// const points = getPoints({
//   center: {
//     latitude: 39.907783490367706,
//     longitude: 116.39120737493609
//   },
//   // 半径5000000米
//   radius: 1000,
//   // 生成点数
//   count: 101
// })

export default () => {
  const mapRef = useRef(mapRef)
  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        // key: '',
        // type: 'google'
        // 百度地图
        key: '7b6e260fc45a67b31a265e22575f1c5e',
        type: 'bmap'
      }}
      onSuccess={() => {
        console.log('地图加载成功')
      }}
      onError={(errMsg) => {
        console.log('地图加载失败:', errMsg)
        return '错误地址'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <MapMarkers
          ref={mapRef}
          // 转换为wgs84坐标
          // points={points}
          ZoomControlProps={{
            style: { bottom: '20px' }
          }}
          points={coordsToWgs84([
            {
              longitude: 113.044821,
              latitude: 23.890941,
              icon: {
                className: 'my-div-icon',
                html: '<div style="width: 100px; background: white;">start</div>'
              }
            },
            {
              longitude: 113.356363,
              latitude: 22.199614,
              icon: {
                className: 'my-div-icon',
                html: '<div style="width: 100px; background: white;">end</div>'
              }
            },
            {
              a: ''
            }
          ])}
          // onMarkerClick={(e) => {
          //   console.log('点击marker:', e)
          //   // e.remove()
          //   let newMarkerIcon = window.L.icon({
          //     active: true,
          //     iconUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-icon.bak.png`,
          //     iconRetinaUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-icon.bak.png`,
          //     shadowUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
          //     shadowRetinaUrl: `https://res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
          //     shadowSize: [33, 33],
          //     iconSize: [20, 33],
          //     iconAnchor: [10, 16]
          //   })
          //   e.setIcon(newMarkerIcon, { multiple: false })

          //   console.log(mapRef.current.leafletMap)
          //   let popup = window.L.popup()
          //     .setLatLng([e.latitude, e.longitude])
          //     .setContent('I am a standalone popup.')
          //     .openOn(mapRef.current.leafletMap)
          // }}
          onLoad={(map) => {
            let currentZoom = map.getZoom()
            map.setZoom(currentZoom - 1)
          }}
        >
          <LocationControl
            style={{ bottom: '20px' }}
            onChange={(result) => {
              mapRef.current.panTo(result)
            }}
          />
        </MapMarkers>
      </div>
    </APILoader>
  )
}
