import React from 'react'

// 内库使用-start
import Loading from './../../../../Loading'
import Toast from './../../../../Toast'
import Bridge from './../../../../../utils/Bridge'
import locale from './../../../../../utils/locale'
// 内库使用-end

// 测试使用-start
// import { Loading, Toast, Bridge, locale } from 'seedsui-react'
// 测试使用-end

// 导航
function Navigation({
  map,
  // 终点位置
  type,
  longitude,
  latitude,
  name,
  address
}) {
  async function handleClick() {
    Loading.show({
      content: locale('定位中...', 'SeedsUI_positioning')
    })
    // 当前位置
    let result = await map.getLocation({ type: 'wgs84' })
    result = await map.getAddress(result)
    Loading.hide()

    // 定位失败
    if (typeof result === 'string') {
      // 赋值
      Toast.show({
        content: locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed')
      })
      return
    }

    Bridge.openLocation({
      slatitude: result.latitude, // 起点纬度
      slongitude: result.longitude, // 起点经度
      sname: result.address || locale('当前位置', 'SeedsUI_current_location'), // 起点名
      latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
      type: type,
      name: name || address, // 终点位置名
      address: address, // 地址详情说明
      scale: 16 // 地图缩放级别,整形值,范围从1~28。默认为16
    })
  }

  if (!longitude || !latitude) return null

  // 不支持的平台不显示
  if (
    Bridge.platform !== 'wechat' &&
    Bridge.platform !== 'wework' &&
    Bridge.platform !== 'dinghuo' &&
    Bridge.platform !== 'wq' &&
    Bridge.platform !== 'alipay' &&
    Bridge.platform !== 'dingtalk' &&
    Bridge.platform !== 'lark'
  ) {
    return null
  }

  return (
    <span className="map-navigation-button" onClick={handleClick}>
      <i className="map-navigation-button-icon"></i>
      <span className="map-navigation-button-text">{locale('导航', 'SeedsUI_navigation')}</span>
    </span>
  )
}
export default Navigation
