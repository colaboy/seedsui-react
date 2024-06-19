import React, { useState } from 'react'
import { Map, Bridge } from 'seedsui-react'
const { APILoader } = Map

import Main from './Main'
// 生成随机点
// import getPoints from './getPoints'

export default () => {
  Bridge.debug = true
  let [value, setValue] = useState()
  // {
  //   latitude: 39.907783490367706,
  //   longitude: 116.39120737493609,
  //   address: 'aa'
  // }

  return (
    <APILoader
      config={
        {
          // type类型 google, bmap, amap, 默认osm
          // key: 'xxxx',
          // type: 'google'
          // 百度地图
          // key: 'xxxx',
          // type: 'bmap'
        }
      }
      onSuccess={() => {
        console.log('地图加载成功')
      }}
      onError={() => {
        console.log('地图加载失败')
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Main
          // readOnly
          value={value}
          onChange={(newValue) => {
            console.log('newValue:', newValue)
            setValue(newValue)
          }}
          getAddress={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ address: 'hhhhh' })
              }, 1000)
            })
          }}
        />
      </div>
    </APILoader>
  )
}
