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
      // 使用哪个地图
      type="google"
      // 使用哪个地图的瓦片图层
      // tileType="google"
    >
      <div>自定义内容</div>
      <Map>
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
