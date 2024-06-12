import React from 'react'
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
  return (
    <APILoader
      config={{
        // key: 'AIzaSyDta4y3H7RIv79j5e0cRq4Eqpl4xn-E57g', // google
        key: '3pTjiH1BXLjASHeBmWUuSF83', // bmap
        // 使用哪个地图
        type: 'bmap', // google, bmap, amap, 默认osm
        // 使用当前地图做瓦片图层
        typeTileLayer: true
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
        center={{
          latitude: 50.5,
          longitude: 30.5
        }}
        zoom={13}
      >
        {/* 瓦片图层 */}
        <TileLayer />
        {/* 全局图标设置 */}
        <IconOptions
          // 基准路径
          imagePath={'https://res.waiqin365.com/d/seedsui/leaflet/images/'}
        />
        {/* 缩放控件 */}
        <ZoomControl />
        {/* 定位控件 */}
        <LocationControl />
        {/* 搜索控件 */}
        <SearchControl />
        {/* 中心标注点 */}
        <CenterMarker
          onChange={(position) => {
            console.log(position)
          }}
        />
        {/* 标注点 */}
        <Marker latitude={51.505750806437874} longitude={-0.09149551391601562} />
        <Marker latitude={51.506071350015475} longitude={-0.08291244506835939} />
        <div>自定义内容</div>
      </Map>
    </APILoader>
  )
}
