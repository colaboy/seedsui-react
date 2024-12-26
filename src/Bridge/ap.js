// 官方文档: https://myjsapi.alipay.com/alipayjsapi/media/image/chooseImage.html
// 小程序文档: https://opendocs.alipay.com/mini/component?pathHash=0cf5b4c0
import _ from 'lodash'
import BridgeBase from './base'
import LocationTask from './utils/LocationTask'
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
    window.top.ap?.popWindow()
  },
  // 返回监听
  onHistoryBack: function (params) {
    console.log('支付宝不支持监听物理返回')
  },
  // 地图查看
  openLocation: function (params) {
    if (_.isEmpty(params)) return
    window.top.ap.openLocation({
      latitude: params.latitude,
      longitude: params.longitude,
      name: params.name || '',
      address: params.address || '',
      fail: (error) => {
        console.log('Alipay openLocation fail:', error)
      }
    })
  },
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
    window.top.ap.getLocation({
      ...otherParams,
      type: '2',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        if (type === 'wgs84') {
          const points = GeoUtil.coordtransform([longitude, latitude], 'gcj02', 'wgs84')
          longitude = points[0]
          latitude = points[1]
        }

        if (success) {
          success({
            ...res,
            longitude: longitude,
            latitude: latitude,
            type: type || 'gcj02'
          })
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
    const { scanType, success, fail } = params || {}

    let type = ''
    if (scanType.length === 1) {
      if (scanType.includes('qrCode')) {
        type = 'qr'
      } else if (scanType.includes('barCode')) {
        type = 'bar'
      }
    }

    window.top.ap.scan({
      type: type,
      success: function (res) {
        success && success({ resultStr: res.code })
      },
      fail: function (res) {
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
    window.top.ap.previewImage({
      urls: params.urls,
      current: index
    })
  }
}

export default Bridge
