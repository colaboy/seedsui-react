import React from 'react'
import { Map as SMap } from 'seedsui-react'
const { APILoader, Map, IconOptions, TileLayer, ZoomControl, Search, CenterMarker, Marker } = SMap

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
        <IconOptions
          // 基准路径
          imagePath={'https://res.waiqin365.com/d/seedsui/leaflet/images/'}
        />
        <TileLayer />
        <ZoomControl />
        <Search />
        <CenterMarker
          onChange={(position) => {
            console.log(position)
          }}
        />

        <Marker latitude={51.505750806437874} longitude={-0.09149551391601562} />
        <Marker latitude={51.506071350015475} longitude={-0.08291244506835939} />
        <div>自定义内容</div>
      </Map>
    </APILoader>
  )
}
