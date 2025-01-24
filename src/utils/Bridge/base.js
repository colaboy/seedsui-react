// 内库使用-start
import Device from './../Device'
import Toast from './../../components/Toast'
import GeoUtil from './../GeoUtil'
import LocaleUtil from './../LocaleUtil' // 内库使用-end

/* 测试使用-start
import { GeoUtil, Device, Toast, LocaleUtil } from 'seedsui-react'
测试使用-end */

let Bridge = {
  platform: Device.platform,
  // 自定义操作
  invoke: function () {
    Toast.show({
      content: LocaleUtil.locale('invoke仅可在微信或APP中使用', 'SeedsUI_invoke_prompt', ['invoke'])
    })
  },
  // 获得版本信息
  getAppVersion: function () {
    return Device.platformVersion
  },
  // 拨打电话
  tel: function (number) {
    if (Device.device === 'pc') {
      Toast.show({ content: LocaleUtil.locale('此功能仅可在手机中使用', 'SeedsUI_only_mobile') })
      return
    }
    if (isNaN(number)) return
    window.location.href = 'tel:' + number
  },
  /**
   * 获取当前地理位置, 所有平台都可以调用
   * @param {Object} params
   * @prop {String} type 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * @return {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getBrowserLocation: function (params) {
    if (!params.type) {
      params.type = 'gcj02'
    }

    // debug模拟定位
    if (this.debug) {
      console.log('模拟浏览器定位...', params)
      setTimeout(() => {
        let res = {
          errMsg: 'getLocation:ok',
          speed: '0.0',
          accuracy: '3.0.0',
          type: params.type || 'wgs84'
        }
        if (params?.type === 'gcj02') {
          res.latitude = 39.909187
          res.longitude = 116.397451
        } else {
          res.latitude = 39.907783490367706
          res.longitude = 116.39120737493609
        }
        if (params.success) params.success(res)
        if (params.complete) params.complete(res)
      }, 2000)
      return
    }

    // 调用浏览器定位
    if (navigator.geolocation) {
      console.log('调用浏览器定位...', params)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let longitude = position.coords.longitude
          let latitude = position.coords.latitude
          if (!longitude || !latitude) {
            if (params.fail)
              params.fail({
                errCode: 'LATLNG_ERROR',
                errMsg: `getLocation:fail ${LocaleUtil.locale(
                  '定位失败',
                  'SeedsUI_location_failed'
                )}`
              })
          }

          console.log('调用浏览器定位成功', longitude, latitude)
          if (params.type === 'gcj02') {
            const points = GeoUtil.coordtransform([longitude, latitude], 'wgs84', 'gcj02')
            longitude = points[0]
            latitude = points[1]
          }
          let res = {
            errMsg: 'getLocation:ok',
            speed: position.coords.speed,
            accuracy: position.coords.accuracy,
            longitude: longitude,
            latitude: latitude,
            type: params.type || 'wgs84'
          }
          if (params.success) params.success(res)
        },
        (error) => {
          let errCode = ''
          let errMsg = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errCode = 'PERMISSION_DENIED'
              errMsg = `getLocation:fail ${LocaleUtil.locale(
                '定位失败,用户拒绝请求地理定位',
                'SeedsUI_location_permission_denied_error'
              )}`
              break
            case error.POSITION_UNAVAILABLE:
              errCode = 'POSITION_UNAVAILABLE'
              console.log(
                `${LocaleUtil.locale(
                  '定位失败,位置信息是不可用',
                  'SeedsUI_location_unavailable_error'
                )}`
              )
              errMsg = `getLocation:fail ${LocaleUtil.locale(
                '定位失败,位置信息是不可用',
                'SeedsUI_location_unavailable_error'
              )}`
              break
            case error.TIMEOUT:
              errCode = 'TIMEOUT'
              console.log(
                `${LocaleUtil.locale(
                  '定位失败,位置信息是不可用',
                  'SeedsUI_location_unavailable_error'
                )}`
              )
              errMsg = `getLocation:fail ${LocaleUtil.locale(
                '定位失败,请求获取用户位置超时',
                'SeedsUI_location_timeout_error'
              )}`
              break
            case error.UNKNOWN_ERROR:
              errCode = 'UNKNOWN_ERROR'
              console.log(
                `${LocaleUtil.locale(
                  '定位失败,位置信息是不可用',
                  'SeedsUI_location_unavailable_error'
                )}`
              )
              errMsg = `getLocation:fail ${LocaleUtil.locale(
                '定位失败,定位系统失效',
                'SeedsUI_location_unknown_error'
              )}`
              break
            default:
              errCode = 'LOCATION_ERROR'
              console.log(`${LocaleUtil.locale('定位失败', 'SeedsUI_location_failed')}`)
              errMsg = `getLocation:fail ${LocaleUtil.locale(
                '定位失败',
                'SeedsUI_location_failed'
              )}`
          }
          let res = { errCode: errCode, errMsg: errMsg }
          console.log('调用浏览器定位失败', res)
          if (params.fail) params.fail(res)
        },
        {
          enableHighAccuracy: true, // 指示浏览器获取高精度的位置，默认为false
          timeout: 8000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          maximumAge: 0 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        }
      )
    } else {
      console.log(`${LocaleUtil.locale('当前浏览器不支持定位', 'SeedsUI_location_not_supported')}`)
      let res = {
        errMsg: `getLocation:fail ${LocaleUtil.locale(
          '当前浏览器不支持定位',
          'SeedsUI_location_not_supported'
        )}`
      }
      if (params.fail) params.fail(res)
    }
    return
  },
  /**
   * 修改原生标题
   * @param {Object} params {title: '自定义标题'}
   */
  setTitle: function (params) {
    if (params && params.title) {
      if (typeof params.title === 'string') {
        window.top.document.title = params.title
      } else if (typeof params.title === 'function') {
        params.title()
      }
    }
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 打开新的窗口
  openWindow: function (params = {}) {
    if (params.url) window.location.href = params.url
  },
  // 兼容方法
  logOut: function () {
    console.log('logOut方法仅在app上工作')
  },
  openLocation: function (params) {
    let errMsg = LocaleUtil.locale(
      'openLocation仅可在企业微信或APP中使用',
      'SeedsUI_open_location_prompt',

      ['openLocation']
    )
    Toast.show({
      content: errMsg
    })
    params?.fail && params.fail({ errMsg: errMsg })
  },
  chooseImage: function (params) {
    let errMsg = LocaleUtil.locale(
      'chooseImage仅可在移动端微信或APP中使用',
      'SeedsUI_chooseImage_prompt',

      ['chooseImage']
    )
    Toast.show({
      content: errMsg
    })
    params?.fail && params.fail({ errMsg: errMsg })
  },
  uploadImage: function (params) {
    let errMsg = LocaleUtil.locale(
      'uploadImage仅可在移动端微信或APP中使用',
      'SeedsUI_uploadImage_prompt',
      ['uploadImage']
    )
    Toast.show({
      content: errMsg
    })
    params?.fail && params.fail({ errMsg: errMsg })
  },
  previewImage: function (params = {}) {
    let errMsg = LocaleUtil.locale(
      'previewImage仅可在移动端微信或APP中使用',
      'SeedsUI_previewImage_prompt',
      ['previewImage']
    )
    Toast.show({
      content: errMsg
    })
    params?.fail && params.fail({ errMsg: errMsg })
  },
  previewFile: function (params = {}) {
    let errMsg = LocaleUtil.locale(
      'previewFile仅可在企业微信或APP中使用',
      'SeedsUI_previewFile_prompt',

      ['previewFile']
    )
    Toast.show({
      content: errMsg
    })
    params?.fail && params.fail({ errMsg: errMsg })
  }
}
export default Bridge
