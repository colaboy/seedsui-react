// 官方文档: https://open.dingtalk.com/document/isvapp/read-before-development
// API总览: https://open.dingtalk.com/document/orgapp/jsapi-overview-client-org
// 鉴权: https://open.dingtalk.com/document/orgapp/jsapi-authentication

import _ from 'lodash'
import BridgeBase from './base'
import back from './utils/back'
import ready from './utils/ready'

// 内库使用-start
import GeoUtil from './../GeoUtil'
// 内库使用-end

/* 测试使用-start
import { GeoUtil } from 'seedsui-react'
测试使用-end */

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
  // 关闭窗口
  closeWindow: function () {
    window.top.dd.closePage({
      fail: (error) => {
        console.log('DingTalk closeWindow fail:', error)
      }
    })
  },
  // 返回监听
  onHistoryBack: function (params) {
    console.log('钉钉不支持监听物理返回')
  },
  /**
   * 修改原生标题
   * @param {Object} params {title: '自定义标题'}
   */
  setTitle: function (params) {
    if (typeof params?.title === 'string') {
      window.top.dd.setNavigationTitle({
        title: params?.title
      })
    }
  },
  // 地图查看
  openLocation: function (params) {
    if (_.isEmpty(params)) return
    window.top.dd.openLocation({
      title: params.name || '',
      address: params.address || '',
      latitude: params.latitude,
      longitude: params.longitude,
      fail: (error) => {
        console.log('DingTalk openLocation fail:', error)
      }
    })
  },
  /**
   * 钉钉定位需要鉴权, 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    // 钉钉定位需要鉴权, 使用浏览器定位代替
    // BridgeBase.getBrowserLocation(params)
    const { type, success, fail } = params || {}
    let currentType = type || 'gcj02'
    console.log('调用钉钉定位...', params)
    window.top.dd.getLocation({
      type: 0,
      useCache: false,
      coordinate: '0', // 标准坐标wgs84定位
      cacheTimeout: 20,
      withReGeocode: false,
      targetAccuracy: '200',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        if (currentType === 'gcj02') {
          const points = GeoUtil.coordtransform([longitude, latitude], 'wgs84', 'gcj02')
          longitude = points[0]
          latitude = points[1]
        }
        let result = {
          errMsg: 'getLocation:ok',
          type: currentType,
          latitude: latitude,
          longitude: longitude,
          accuracy: res.accuracy
        }
        if (success) success(result)
      },
      fail: (err) => {
        console.log('getLocation:fail', err)
        if (fail) {
          fail({
            errCode: err.errorCode,
            errMsg: err.errorMessage
          })
        }
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

    window.top.dd.previewImage({
      urls: params.urls,
      current: index,
      fail: (error) => {
        console.log('DingTalk previewImage fail:', error)
      }
    })
  }
}

export default Bridge
