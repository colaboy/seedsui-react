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
        key: '',
        type: 'google'
        // 百度地图
        // key: '',
        // type: 'bmap'
      }}
      onSuccess={() => {
        console.log('地图加载成功')
      }}
      onError={(errMsg) => {
        console.log('地图加载失败:', errMsg)
        return '错误地址'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Markers
          points={[
            {
              longitude: 113.044821,
              latitude: 23.890941,
              icon: {
                className: 'my-div-icon',
                html: '<div style="width: 100px; background: white;">start</div>'
              }
            },
            {
              longitude: 113.356363,
              latitude: 22.199614,
              icon: {
                className: 'my-div-icon',
                html: '<div style="width: 100px; background: white;">end</div>'
              }
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
