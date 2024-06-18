import React, { useState } from 'react'
import { Map } from 'seedsui-react'
const { APILoader } = Map

import Main from './Main'
// 生成随机点
// import getPoints from './getPoints'

export default () => {
  let [value, setValue] = useState(null)

  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        key: 'AIzaSyDy9St7a2h8cZVCof5sEITCxjPhE0llfCo',
        type: 'google',
        // 百度地图
        // key: '3pTjiH1BXLjASHeBmWUuSF83',
        // type: 'bmap',

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
      <Main
        value={value}
        onChange={(newValue) => {
          console.log('newValue:', newValue)
          setValue(newValue)
        }}
      />
    </APILoader>
  )
}
