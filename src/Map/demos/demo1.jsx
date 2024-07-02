import React, { useState } from 'react'
import { Map, Bridge } from 'seedsui-react'
const { APILoader } = Map

import Main from './Main'
// 生成随机点
// import getPoints from './getPoints'

export default () => {
  Bridge.debug = true
  let [value, setValue] = useState()
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
          getLocation={(data) => {
            console.log(data)
            return { latitude: 35.689487, longitude: 139.691706 }
          }}
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
