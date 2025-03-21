import React, { useRef } from 'react'

// 内库使用
import { Map } from 'seedsui-react'

// 测试使用
// import Map from 'library/components/Map'

// 生成随机点
// import getPoints from './getPoints'
const { APILoader, MapMarkers, LocationControl, Circles, coordsToWgs84 } = Map
// import points from './points'

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

// This coordsToWgs84 just example, no practical use
const points = coordsToWgs84([
  {
    area: '建邺区',
    uid: 'bac0886bab065861c03644a0',
    address: '文广路2号西城夜未央运动街区303号（陶陶花艺旁）',
    province: '江苏省',
    city: '南京市',
    name: '顽啤NAUGHTY BEER(西城·夜未央店)',
    telephone: '19951965855',
    latitude: 31.985751066605477,
    longitude: 118.73334234635371,
    type: 'wgs84'
  },
  {
    latitude: 31.990374883871525,
    longitude: 118.73769931504451,
    type: 'gcj02',
    address: '南京烽火科技',
    icon: {
      html: '<div style="width:100px;background-color:red;">南京烽火科技</div>'
    }
  }
])

export default () => {
  const mapRef = useRef(mapRef)
  return (
    <APILoader
      config={{
        key: '',
        type: 'bmap',
        defaultCenterMarkerIconOptions: {
          iconUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-custom-shop.png`,
          iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-custom-shop.png`,
          shadowUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-shadow.png`,
          shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets//plugin/leaflet/images/marker-shadow.png`
        },
        defaultMarkerIconOptions: {
          iconUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon.png`,
          iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon-2x.png`,
          shadowUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
          shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`
        },
        leaflet: {
          css: 'https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/css/leaflet.css',
          js: 'https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/js/leaflet.js'
        }
      }}
      onSuccess={() => {
        console.log('地图加载成功')
      }}
      // onError={(errMsg) => {
      //   console.log('地图加载失败:', errMsg)
      //   return '错误地址'
      // }}
    >
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <MapMarkers
          ref={mapRef}
          // 转换为wgs84坐标
          ZoomControlProps={{
            style: { bottom: '20px' }
          }}
          points={points}
          onMarkerClick={(e) => {
            console.log('点击marker:', e)
            console.log(mapRef.current)
            // e.remove()
            let newMarkerIcon = window.L.icon({
              active: true,
              iconUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon.bak.png`,
              iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon.bak.png`,
              shadowUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
              shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
              shadowSize: [33, 33],
              iconSize: [20, 33],
              iconAnchor: [10, 16]
            })
            e.setIcon(newMarkerIcon, { multiple: true })
          }}
          // onMarkerClick={(e) => {
          //   console.log('点击marker:', e)
          //   // e.remove()
          //   let newMarkerIcon = window.L.icon({
          //     active: true,
          //     iconUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon.bak.png`,
          //     iconRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-icon.bak.png`,
          //     shadowUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
          //     shadowRetinaUrl: `https://colaboy.github.io/seedsui-react/assets/plugin/leaflet/images/marker-shadow.png`,
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

          <Circles
            points={[
              {
                latitude: 31.985751066605477,
                longitude: 118.73334234635371,
                radius: 500,
                style: {
                  color: '#ff8800'
                }
              }
            ]}
          />
        </MapMarkers>
      </div>
    </APILoader>
  )
}
