// 测试使用
// import { DB } from 'seedsui-react'
// 内库使用
import DB from './../DB'

let self = null

let Bridge = {
  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * cacheTime {Number}: 缓存毫秒数防重复定位
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    self = this
    // 先从cookie中读取位置信息
    let appLocation = DB.getCookie('app_location')
    if (appLocation === 'undefined') {
      DB.removeCookie('app_location')
      appLocation = ''
    }
    try {
      if (appLocation) appLocation = JSON.parse(appLocation)
    } catch (error) {
      appLocation = ''
    }
    if (appLocation) {
      if (params.success) params.success(appLocation)
      return
    }
    // 调用定位
    if (self.locationTask) {
      self.locationTask.push(params)
      return
    }
    self.locationTask = []
    console.log('调用支付宝定位...')
    window.top.wx.getLocation({
      type: '2',
      success: (res) => {
        // 将位置信息存储到cookie中60秒
        if (res.longitude && res.latitude) {
          if (params.cacheTime)
            DB.setCookie(
              'app_location',
              JSON.stringify(res),
              !isNaN(params.cacheTime) ? Number(params.cacheTime) : 60000
            )
          if (params.success) params.success(res)
        } else {
          if (params.fail) params.fail(res)
        }
        self.getLocationTask(res)
      },
      fail: (res) => {
        if (params.fail) params.fail(res)
        self.getLocationTask(res)
      },
      complete: (res) => {
        if (params.complete) params.complete(res)
      }
    })
  }
}

export default Bridge
