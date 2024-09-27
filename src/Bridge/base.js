import LocationTask from './utils/LocationTask'

// 内库使用
import Device from './../Device'
import MapUtil from './../MapUtil'
import Toast from './../Toast'
import Loading from './../Loading/instance.js'
import GeoUtil from './../GeoUtil'
import Alert from './../Alert/instance.js'
import ToastInstance from './../Toast/instance.js'
import locale from './../locale'

// 测试使用
// import { GeoUtil, Device, MapUtil, Toast, Loading, locale } from 'seedsui-react'
// import Alert from 'seedsui-react/lib/Alert/instance.js'
// import ToastInstance from 'seedsui-react/lib/Toast/instance.js'

let Bridge = {
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && window.top.window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  // 弹出toast
  toast: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用Toast.show({content: ''})
   */
  showToast: function (msg, params = {}) {
    if (!msg) return
    if (!Bridge.toast) {
      // 提示错误
      Bridge.toast = new ToastInstance({
        parent: document.body,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        delay: params.delay || 2000,
        html: msg
      })
    } else {
      Bridge.toast.updateParams({
        ...params,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        delay: params.delay || 2000,
        html: msg
      })
    }
    Bridge.toast.show()
    if (params.success) {
      setTimeout(
        () => {
          params.success()
        },
        params.delay ? Math.round(params.delay / 2) : 1000
      )
    }
  },
  // 弹出loading
  loading: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用 Loading.show()
   */
  showLoading: function (params = {}) {
    if (!Bridge.loading) {
      Bridge.loading = new Loading({
        ...params,
        caption: params.caption || locale('正在加载...', 'SeedsUI_loading'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      })
    } else {
      Bridge.loading.updateParams({
        ...params,
        caption: params.caption || locale('正在加载...', 'SeedsUI_loading'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      })
    }
    Bridge.loading.show()
  },
  /**
   * @deprecated since version 5.2.8
   * 请使用 Loading.hide()
   */
  hideLoading: function () {
    if (Bridge.loading) {
      Bridge.loading.hide()
    }
  },
  /**
   * @deprecated since version 5.2.8
   * 请使用 Loading.exists()
   */
  isLoading: function () {
    if (!Bridge.loading) return false
    return Bridge.loading.mask.classList.contains(Bridge.loading.params.loadingActiveClass)
  },
  // 弹出Alert
  alert: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用Modal.alert({content: '', submitProps: {onClick: () => {}}})
   */
  showAlert: function (msg, params = {}) {
    if (!Bridge.alert) {
      Bridge.alert = new Alert({
        buttonSubmitHTML: locale('确定', 'SeedsUI_ok'), // 实例化时需要国际化
        buttonCancelHTML: locale('取消', 'SeedsUI_cancel'), // 实例化时需要国际化
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
          else e.hide()
        },
        ...params,
        caption: msg
      })
    } else {
      if (params) {
        Bridge.alert.updateParams({
          buttonSubmitHTML: locale('确定', 'SeedsUI_ok'), // 实例化时需要国际化
          buttonCancelHTML: locale('取消', 'SeedsUI_cancel'), // 实例化时需要国际化
          onClickSubmit: function (e) {
            if (params.success) params.success(e)
            else e.hide()
          },
          ...params,
          caption: msg
        })
      }
    }
    Bridge.alert.show()
  },
  // 弹出Confirm
  confirm: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用Modal.confirm({content: '', submitProps: {onClick: () => {}}})
   */
  showConfirm: function (msg, params = {}) {
    if (!Bridge.confirm) {
      Bridge.confirm = new Alert({
        buttonSubmitHTML: locale('确定', 'SeedsUI_ok'), // 实例化时需要国际化
        buttonCancelHTML: locale('取消', 'SeedsUI_cancel'), // 实例化时需要国际化
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
          else e.hide()
        },
        onClickCancel: function (e) {
          e.errMsg = ''
          if (params.fail) params.fail(e)
          else e.hide()
        },
        ...params,
        caption: msg
      })
    } else {
      if (params) {
        Bridge.confirm.updateParams({
          buttonSubmitHTML: locale('确定', 'SeedsUI_ok'), // 实例化时需要国际化
          buttonCancelHTML: locale('取消', 'SeedsUI_cancel'), // 实例化时需要国际化
          onClickSubmit: function (e) {
            if (params.success) params.success(e)
          },
          onClickCancel: function (e) {
            e.errMsg = ''
            if (params.fail) params.fail(e)
            else e.hide()
          },
          ...params,
          caption: msg
        })
      }
    }
    Bridge.confirm.show()
  },
  /**
   * 百度地图:获取当前位置名称, 已废弃, 请使用Map中的获取位置方法代替
   * @param {Object} params: {longitude: '', latitude: '', type 'wgs84 | gcj02', success: fn, fail: fn}
   * @return {Promise} result: {status: 0 成功, points 百度坐标}
   */
  getAddress: function (params = {}) {
    if (window.getAddressDefault && typeof window.getAddressDefault === 'function') {
      return window.getAddressDefault(params)
    }
    const mapUtil = new MapUtil()
    return mapUtil.getAddress([params.longitude, params.latitude], params?.type || 'gcj02', params)
  },
  // 以上API均废弃，请使用其它方法代替, 勿使用
  platform: Device.platform,
  // 获得版本信息
  getAppVersion: function () {
    return Device.platformVersion
  },
  // 拨打电话
  tel: function (number) {
    if (Device.device === 'pc') {
      Toast.show({ content: locale('此功能仅可在手机中使用', 'SeedsUI_only_mobile') })
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
    // debug模拟定位
    if (this.debug) {
      if (LocationTask.locationTask) {
        LocationTask.locationTask.push(params)
        return
      }
      LocationTask.locationTask = []
      console.log('模拟浏览器定位...')
      setTimeout(() => {
        let res = {
          errMsg: 'getLocation:ok',
          speed: '0.0',
          accuracy: '3.0.0'
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
        LocationTask?.getLocationTask?.(res)
      }, 2000)
      return
    }

    // 调用浏览器定位
    if (navigator.geolocation) {
      // 调用定位
      if (LocationTask.locationTask) {
        LocationTask.locationTask.push(params)
        return
      }
      LocationTask.locationTask = []
      console.log('调用浏览器定位...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let longitude = position.coords.longitude
          let latitude = position.coords.latitude
          if (!longitude || !latitude) {
            if (params.fail)
              params.fail({
                errCode: 'LATLNG_ERROR',
                errMsg: `getLocation:fail ${locale('定位失败', 'SeedsUI_location_failed')}`
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
            latitude: latitude
          }
          if (params.success) params.success(res)
          LocationTask.getLocationTask(res)
        },
        (error) => {
          let errCode = ''
          let errMsg = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errCode = 'PERMISSION_DENIED'
              errMsg = `getLocation:fail ${locale(
                '定位失败,用户拒绝请求地理定位',
                'SeedsUI_location_permission_denied_error'
              )}`
              break
            case error.POSITION_UNAVAILABLE:
              errCode = 'POSITION_UNAVAILABLE'
              console.log(
                `${locale('定位失败,位置信息是不可用', 'SeedsUI_location_unavailable_error')}`
              )
              errMsg = `getLocation:fail ${locale(
                '定位失败,位置信息是不可用',
                'SeedsUI_location_unavailable_error'
              )}`
              break
            case error.TIMEOUT:
              errCode = 'TIMEOUT'
              console.log(
                `${locale('定位失败,位置信息是不可用', 'SeedsUI_location_overtime_error')}`
              )
              errMsg = `getLocation:fail ${locale(
                '定位失败,请求获取用户位置超时',
                'SeedsUI_location_overtime_error'
              )}`
              break
            case error.UNKNOWN_ERROR:
              errCode = 'UNKNOWN_ERROR'
              console.log(
                `${locale('定位失败,位置信息是不可用', 'SeedsUI_location_unknown_error')}`
              )
              errMsg = `getLocation:fail ${locale(
                '定位失败,定位系统失效',
                'SeedsUI_location_unknown_error'
              )}`
              break
            default:
              errCode = 'LOCATION_ERROR'
              console.log(`${locale('定位失败', 'SeedsUI_location_failed')}`)
              errMsg = `getLocation:fail ${locale('定位失败', 'SeedsUI_location_failed')}`
          }
          let res = { errCode: errCode, errMsg: errMsg }
          console.log('调用浏览器定位失败', res)
          if (params.fail) params.fail(res)
          LocationTask?.getLocationTask?.(res)
        },
        {
          enableHighAccuracy: true, // 指示浏览器获取高精度的位置，默认为false
          timeout: 8000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          maximumAge: 0 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        }
      )
    } else {
      console.log(`${locale('当前浏览器不支持定位', 'SeedsUI_location_not_supported')}`)
      let res = {
        errMsg: `getLocation:fail ${locale(
          '当前浏览器不支持定位',
          'SeedsUI_location_not_supported'
        )}`
      }
      if (params.fail) params.fail(res)
      LocationTask.getLocationTask(res)
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
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作')
  },
  // 打开新的窗口
  openWindow: function (params = {}) {
    alert(JSON.stringify(params))
    if (params.url) window.location.href = params.url
  }
}
export default Bridge
