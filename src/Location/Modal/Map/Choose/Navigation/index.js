import React from 'react'
import Bridge from './../../../../../Bridge'
import locale from './../../../../../locale'

// 导航
function Navigation({ longitude, latitude, name, address }) {
  function handleClick() {
    Bridge.openLocation({
      latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
      name: name || address, // 位置名
      address: address, // 地址详情说明
      scale: 1 // 地图缩放级别,整形值,范围从1~28。默认为16
    })
  }
  if (!longitude || !latitude) return null
  // 不支持的平台不显示
  if (
    Bridge.platform !== 'wechat' &&
    Bridge.platform !== 'wework' &&
    Bridge.platform !== 'dinghuo' &&
    Bridge.platform !== 'wq'
  ) {
    return null
  }
  return (
    <span className="mappage-navigation" onClick={handleClick}>
      &gt;&gt;{locale('导航')}
    </span>
  )
}
export default Navigation