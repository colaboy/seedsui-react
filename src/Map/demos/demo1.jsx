import React from 'react'
import { Map as SMap } from 'seedsui-react'
const { APILoader, Map, TileLayer } = SMap

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
        <div>自定义内容</div>
      </Map>
    </APILoader>
  )
}
