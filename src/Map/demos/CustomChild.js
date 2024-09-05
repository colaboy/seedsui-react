import React, { useRef, useState } from 'react'
import { Map, Bridge } from 'seedsui-react'
const { APILoader, MapChoose, coordsToWgs84 } = Map

// 生成随机点
// import getPoints from './getPoints'

export default ({ map }) => {
  console.log('map:', map)

  return (
    <div
      style={{
        position: 'absolute',
        top: '100px',
        left: '100px',
        zIndex: '999',
        backgroundColor: 'white'
      }}
    >
      12342134
    </div>
  )
}
