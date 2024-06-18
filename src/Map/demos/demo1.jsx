import React, { useRef, useEffect, useState } from 'react'
import { Map, Bridge, Toast, Loading, locale } from 'seedsui-react'
const {
  APILoader,
  MapContainer,
  ZoomControl,
  SearchControl,
  CenterMarker,
  LocationControl,
  NearbyControl,
  Markers
} = Map
// 生成随机点
// import getPoints from './getPoints'

export default () => {
  const mapRef = useRef(null)
  let [value, setValue] = useState(null)
  let [points, setPoints] = useState([])

  // function drawMarkers() {
  //   points = getPoints({
  //     center: value,
  //     // 半径5000000米
  //     radius: 1000,
  //     // 生成10万个点
  //     count: 100
  //   })
  //   setPoints(points)
  // }
  useEffect(() => {
    Loading.show()
    // 默认选中当前位置
    Bridge.debug = true
    Bridge.getBrowserLocation({
      success: (data) => {
        Loading.hide()
        setValue(data)
      },
      fail: (res) => {
        Loading.hide()
        // 赋值
        Toast.show({
          content: locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed')
        })
      }
    })
    // drawMarkers()
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
        center={value}
        zoom={14}
        getAddress={({ longitude, latitude, type }) => {
          console.log('自定义获取地址:', { longitude, latitude, type })
          return {
            address: '呵呵呵'
          }
        }}
        onMoveEnd={(map) => {
          console.log('获取中心点:', map.getCenter())
        }}
        // 基准路径
        iconOptions={{
          imagePath: 'https://res.waiqin365.com/d/seedsui/leaflet/images/'
        }}
      >
        {/* 搜索控件 */}
        <SearchControl
          onChange={(item) => {
            console.log('选择搜索项:', item)
            setValue(item)
          }}
        />

        {/* 中心标注点: 仅用于显示 */}
        <CenterMarker
          onDragEnd={async (map) => {
            let center = map.getCenter()
            let address = await map.getAddress(center)
            setValue({ ...center, ...address })
          }}
        />

        {/* 标注点 */}
        <Markers
          points={points}
          // onClick={(e) => {
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
          //   e.setIcon(newMarkerIcon, { multiple: true })
          // }}
        />

        {/* 缩放控件 */}
        <ZoomControl
          style={{ bottom: '135px' }}
          onZoomIn={(map) => {
            console.log('放大', map.getZoom())
          }}
          onZoomOut={(map) => {
            console.log('缩小'), map.getZoom()
          }}
        />

        {/* 定位控件 */}
        <LocationControl
          style={{ bottom: '135px' }}
          onChange={(result) => {
            console.log('定位完成:', result)
            setValue(result)
          }}
        />

        {/* 附近控件 */}
        <NearbyControl
          value={value}
          radius={1000}
          onChange={(newValue) => {
            console.log('选中点:', newValue)
          }}
          onLoad={(list) => {
            setPoints(list)
          }}
        />
        <div>自定义内容</div>
      </MapContainer>
    </APILoader>
  )
}
