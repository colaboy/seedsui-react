// 官方文档: https://open.dingtalk.com/document/isvapp/read-before-development
// https://open.dingtalk.com/document/orgapp/jsapi-overview

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
    const { success, fail, complete } = params || {}
    // 调用定位
    if (LocationTask.locationTask) {
      LocationTask.locationTask.push(params)
      return
    }
    LocationTask.locationTask = []
    console.log('调用钉钉定位...', params)
    window.top.dd.device.geolocation.get({
      targetAccuracy: 200, // 精度200米
      coordinate: 1, // 高德坐标, 会加地址
      withReGeocode: false, // 不需要逆向解析
      useCache: false,
      onSuccess: (res) => {
        if (res.longitude && res.latitude) {
          if (success) success(res)
        } else {
          if (fail) fail(res)
        }
        if (complete) complete(res)
        LocationTask.getLocationTask(res)
      },
      onFail: (res) => {
        if (fail) {
          fail({
            errCode: res.errorCode,
            errMsg: res.errorMessage
          })
        }

        if (complete) complete(res)
        LocationTask.getLocationTask(res)
      }
    })
  },
  /**
   * 扫码
   * @param {Object} params
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  scanQRCode(params = {}) {
    const { scanType, success, fail } = params || {}

    let type = 'all'
    if (scanType.length === 1) {
      if (scanType.includes('qrCode')) {
        type = 'qrCode'
      } else if (scanType.includes('barCode')) {
        type = 'barCode'
      }
    }
    window.top.dd.biz.util.scan({
      type: type,
      onSuccess: function (res) {
        success && success({ resultStr: res.text })
      },
      onFail: function (res) {
        if (fail) {
          fail({
            errCode: res.errorCode,
            errMsg: res.errorMessage
          })
        }
      }
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
    window.top.dd.biz.util.previewImage({
      urls: params.urls,
      current: params.urls[index]
    })
  },
  /**
   * 关闭窗口
   */
  closeWindow: function () {
    window.top.dd.biz.navigation.close()
  },
  /**
   * 返回监听
   */
  onHistoryBack: function (params) {
    console.log('钉钉不支持监听物理返回')
  }
}

export default Bridge