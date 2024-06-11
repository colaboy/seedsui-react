import React from 'react'
import { Map as SMap } from 'seedsui-react'
const { APILoader, Map, TileLayer, ZoomControl, Search, CenterMarker } = SMap

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
        <TileLayer />
        <ZoomControl />
        <Search />
        <CenterMarker />
        <div>自定义内容</div>
      </Map>
    </APILoader>
  )
}
