// 官方文档: https://myjsapi.alipay.com/alipayjsapi/media/image/chooseImage.html
// 小程序文档: https://opendocs.alipay.com/mini/component?pathHash=0cf5b4c0

// 内库使用
import Device from './../Device'

// 测试使用
// import { Device } from 'seedsui-react'

import BridgeBase from './base'
import LocationTask from './utils/LocationTask'
import back from './utils/back'
import ready from './utils/ready'

let Bridge = {
  ...BridgeBase,
  ready: function (callback, options) {
    ready(callback, options, Bridge)
  },
  back: function (backLvl, options) {
    back(backLvl, options, Bridge)
  },
  /**
   * 定制功能
   */
  platform: Device.platform,
  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    const { type, success, fail, complete, ...otherParams } = params || {}
    // 调用定位
    if (LocationTask.locationTask) {
      LocationTask.locationTask.push(params)
      return
    }
    LocationTask.locationTask = []
    console.log('调用支付宝定位...', params)
    window.top.wx.getLocation({
      ...otherParams,
      type: '2',
      success: (res) => {
        if (res.longitude && res.latitude) {
          if (success) success(res)
        } else {
          if (fail) fail(res)
        }
        LocationTask.getLocationTask(res)
      },
      fail: (res) => {
        if (fail) fail(res)
        LocationTask.getLocationTask(res)
      },
      complete: (res) => {
        if (complete) complete(res)
      }
    })
  },
  /**
   * 扫码
   * @param {Object} params
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  scanQRCode(params = {}) {
    const { needResult, scanType, desc, success, ...othersParams } = params || {}

    window.top.wx.scan({
      success: function (res) {
        success && success({ resultStr: res.code })
      },
      ...othersParams
    })
  },
  /**
   * 照片预览
   * @param {Object} params
     {
       index: 0, // 当前显示图片索引，默认 0
       current: '', // 当前显示图片的http链接
       urls: [] // 需要预览的图片http链接列表
     }
   */
  previewImage: function (params) {
    let index = params?.index || 0
    if (typeof params?.index !== 'number' && typeof params?.current === 'string') {
      index = params.urls.indexOf(params.current)
      if (index < 0) index = 0
    }
    window.top.wx.previewImage({
      urls: params.urls,
      current: index
    })
  },
  /**
   * 关闭窗口
   */
  closeWindow: function () {
    window.top.wx?.popWindow()
  }
}

export default Bridge
