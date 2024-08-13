import React, { useRef, useState } from 'react'
import { Map, Bridge } from 'seedsui-react'
const { APILoader, coordTransform } = Map

import MapChoose from './MapChoose/index.js'
// 生成随机点
// import getPoints from './getPoints'

export default () => {
  const mapRef = useRef(null)
  Bridge.debug = true
  let [value, setValue] = useState({
    // latitude: 39.907783490367706,
    // longitude: 116.39120737493609,
    latitude: 39.909187,
    longitude: 116.397451,
    type: 'gcj02',
    address: '天安门'
  })
  /*
  useState()
  useState({
    latitude: 39.907783490367706,
    longitude: 116.39120737493609,
    address: '天安门'
  })
  */

  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        // key: '',
        // type: 'google'
        // 百度地图
        key: '',
        type: 'bmap'
      }}
      onSuccess={() => {
        console.log('地图加载成功')
      }}
      onError={(error) => {
        console.log('地图加载失败', error)
        return (
          <div className="map-result">
            <div className="map-result-title">{error.errMsg}</div>
          </div>
        )
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <MapChoose
          ref={mapRef}
          // readOnly
          value={coordTransform(value)}
          onChange={(newValue) => {
            console.log('newValue:', newValue)
            setValue(newValue)
          }}
          onMarkerClick={(e) => {
            console.log('点击marker:', e)
            console.log(mapRef.current)
            // e.remove()
            let newMarkerIcon = window.L.icon({
              active: true,
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
          // getLocation={(data) => {
          //   console.log(data)
          //   return { latitude: 35.689487, longitude: 139.691706 }
          // }}
          // getAddress={(data) => {
          //   return new Promise((resolve) => {
          //     setTimeout(() => {
          //       resolve({
          //         ...data,
          //         province: '江苏省',
          //         provinceNumber: 100010,
          //         address: '江苏省11'
          //       })
          //     }, 1000)
          //   })
          // }}
        />
      </div>
    </APILoader>
  )
}
