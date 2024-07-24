import React from 'react'
import { Map } from 'seedsui-react'

import Markers from './Markers'
// 生成随机点
// import getPoints from './getPoints'
const { APILoader } = Map

export default () => {
  return (
    <APILoader
      config={{
        // type类型 google, bmap, amap, 默认osm
        // key: '',
        // type: 'google'
        // 百度地图
        key: '3pTjiH1BXLjASHeBmWUuSF83',
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
        <Markers
          points={[
            {
              longitude: 118.745283,
              latitude: 32.213741
            },
            {
              longitude: 118.71872,
              latitude: 31.988045
            },
            {
              a: ''
            }
          ]}
        />
      </div>
    </APILoader>
  )
}
