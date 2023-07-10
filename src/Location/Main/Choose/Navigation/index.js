import React from 'react'
import Loading from './../../../../Loading'
import Toast from './../../../../Toast'
import Bridge from './../../../../Bridge'
import locale from './../../../../locale'

// 导航
function Navigation({ longitude, latitude, name, address }) {
  function handleClick() {
    Loading.show({
      content: locale('定位中...', 'location')
    })
    // 开始定位
    Bridge.getLocation({
      cacheTime: typeof cacheTime === 'number' ? cacheTime : 10000,
      type: 'gcj02',
      success: async (data) => {
        Loading.hide()
        Bridge.openLocation({
          slatitude: data.latitude, // 起点纬度
          slongitude: data.longitude, // 起点经度
          sname: data.address || locale('当前位置', 'current_location'), // 起点名
          latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
          name: name || address, // 位置名
          address: address, // 地址详情说明
          scale: 1 // 地图缩放级别,整形值,范围从1~28。默认为16
        })
      },
      fail: (res) => {
        Loading.hide()
        // 赋值
        Toast.show({
          content: locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed')
        })
      },
      complete: () => {
        Loading.hide()
      }
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
      <i className="mappage-navigation-icon"></i>
      <span className="mappage-navigation-text">{locale('导航')}</span>
    </span>
  )
}
export default Navigation
