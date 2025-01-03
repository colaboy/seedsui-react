// 官方文档: https://open.feishu.cn/document/client-docs/h5/
// 鉴权: https://open.feishu.cn/document/uYjL24iN/uQjMuQjMuQjM/authentication/h5sdkconfig

import BridgeBase from './base'
import back from './utils/back'
import ready from './utils/ready'

// 内库使用
import GeoUtil from './../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

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

  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    const { type, success, fail } = params || {}
    console.log('调用飞书定位...', params)
    let currentType = type || 'gcj02'
    window.top.tt.getLocation({
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: currentType,
      success: (res) => {
        if (res.longitude && res.latitude) {
          // 飞书API骗人,type根本无效, 需要自己转换
          if (res.type && res.type !== currentType) {
            const points = GeoUtil.coordtransform(
              [res.longitude, res.latitude],
              res.type,
              currentType
            )
            res.longitude = points[0]
            res.latitude = points[1]
            res.type = currentType
          }

          if (success) success(res)
        } else {
          if (fail) fail(res)
        }
      },
      fail: (res) => {
        if (fail) fail(res)
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
    window.top.tt.scanCode({
      scanType: scanType,
      barCodeInput: true,
      success: (res) => {
        success && success(res)
      },
      fail: (res) => {
        fail && fail(res)
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
    let current = params.urls[index]

    window.top.tt.previewImage({
      urls: params.urls,
      current: current,
      success: (res) => {
        params.success && params.success(res)
      },
      fail: (res) => {
        params.fail && params.fail(res)
      }
    })
  },
  /**
   * 关闭窗口
   */
  closeWindow: function () {
    window.top.tt.closeWindow({
      fail: function (res) {
        console.log(`closeWindow fail: `, res)
      }
    })
  },
  /**
   * 返回监听
   */
  onHistoryBack: function (params) {
    console.log('飞书不支持监听物理返回')
  }
}

export default Bridge
