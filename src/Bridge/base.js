// 测试使用
// import { Device, MapUtil, Modal, Toast, Loading, locale } from 'seedsui-react'
// import Alert from 'seedsui-react/lib/Alert/instance.js'
// import ToastInstance from 'seedsui-react/lib/Toast/instance.js'
// 内库使用
import Device from './../Device'
import MapUtil from './../MapUtil'
import Modal from './../Modal'
import Toast from './../Toast'
// @deprecated Alert use Modal.alert instead
import Alert from './../Alert/instance.js'
// @deprecated Loading use Loading.show instead
import Loading from './../Loading/instance.js'

// @deprecated Toast use Toast.show instead
import ToastInstance from './../Toast/instance.js'

import GeoUtil from './../GeoUtil'
import locale from './../locale'

// 防止绑定事件时this指向window, 所以全局加一个变量用于存储this
window.top.window._bridge_self = null

let Bridge = {
  /**
   * 基础功能:start
   */
  debug: false,
  // 拨打电话
  tel: function (number) {
    if (Device.device === 'pc') {
      Toast.show({ content: locale('此功能仅可在手机中使用', 'SeedsUI_only_mobile') })
      return
    }
    if (isNaN(number)) return
    window.location.href = 'tel:' + number
  },
  // 视频播放(此方法用不上)
  // previewVideo: function (params = {}) {
  //   let target = document.getElementById('seedsui_preview_video')
  //   if (!target) {
  //     target = MediaUtil.video(params.src)
  //     target.id = 'seedsui_preview_video'
  //     target.style = 'position:absolute;top:-1000px;left:-1000px;width:100;height:100px;'
  //     document.body.appendChild(target)
  //   }
  //   if (target) {
  //     FullScreen.enter(target)
  //     setTimeout(() => {
  //       target.play()
  //     }, 500)
  //   }
  // },
  // 弹出toast
  toast: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用Toast.show({content: ''})
   */
  showToast: function (msg, params = {}) {
    let self = this
    if (!msg) return
    if (!self.toast) {
      // 提示错误
      self.toast = new ToastInstance({
        parent: document.body,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        delay: params.delay || 2000,
        html: msg
      })
    } else {
      self.toast.updateParams({
        ...params,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        delay: params.delay || 2000,
        html: msg
      })
    }
    self.toast.show()
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
    let self = this
    if (!self.loading) {
      self.loading = new Loading({
        ...params,
        caption: params.caption || locale('正在加载...', 'SeedsUI_loading'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      })
    } else {
      self.loading.updateParams({
        ...params,
        caption: params.caption || locale('正在加载...', 'SeedsUI_loading'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      })
    }
    self.loading.show()
  },
  /**
   * @deprecated since version 5.2.8
   * 请使用 Loading.hide()
   */
  hideLoading: function () {
    let self = this
    if (self.loading) {
      self.loading.hide()
    }
  },
  /**
   * @deprecated since version 5.2.8
   * 请使用 Loading.exists()
   */
  isLoading: function () {
    let self = this
    if (!self.loading) return false
    return self.loading.mask.classList.contains(self.loading.params.loadingActiveClass)
  },
  // 弹出Alert
  alert: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用Modal.alert({content: '', submitProps: {onClick: () => {}}})
   */
  showAlert: function (msg, params = {}) {
    let self = this
    if (!self.alert) {
      self.alert = new Alert({
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
        self.alert.updateParams({
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
    self.alert.show()
  },
  // 弹出Confirm
  confirm: null,
  /**
   * @deprecated since version 5.2.8
   * 请使用Modal.confirm({content: '', submitProps: {onClick: () => {}}})
   */
  showConfirm: function (msg, params = {}) {
    let self = this
    if (!self.confirm) {
      self.confirm = new Alert({
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
        self.confirm.updateParams({
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
    self.confirm.show()
  },
  getLocationTask: function (res) {
    // 记录定位任务, 防止重复定位
    let self = this
    if (self.locationTask && self.locationTask.length) {
      for (let locationTaskItem of self.locationTask) {
        if (res.longitude && res.latitude) {
          if (locationTaskItem.success) locationTaskItem.success(res)
          if (locationTaskItem.complete) locationTaskItem.complete(res)
        } else {
          if (locationTaskItem.fail) locationTaskItem.fail(res)
          if (locationTaskItem.complete) locationTaskItem.complete(res)
        }
      }
    }
    self.locationTask = null
  },
  /**
   * 获取当前地理位置
   * @param {Object} params
   * @prop {String} type 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * @return {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getBrowserLocation: function (params) {
    let self = this
    // debug模拟定位
    if (self.debug) {
      if (self.locationTask) {
        self.locationTask.push(params)
        return
      }
      self.locationTask = []
      console.log('调用浏览器定位...')
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
        self?.getLocationTask?.(res)
      }, 2000)
      return
    }

    // 调用浏览器定位
    if (navigator.geolocation) {
      // 调用定位
      if (self.locationTask) {
        self.locationTask.push(params)
        return
      }
      self.locationTask = []
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
          self.getLocationTask(res)
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
          self?.getLocationTask?.(res)
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
      self.getLocationTask(res)
    }
    return
  },
  getLocation: function (params = {}) {
    this.getBrowserLocation(params)
  },
  /**
   * 百度地图:获取当前位置名称
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
  // 客户端默认返回控制
  back: function (backLvl, config) {
    const { history, success, fail } = config || {}
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      // 因为有可能是监听绑定, this指向有可能是window, 所以需要指定self
      // eslint-disable-next-line
      let self = window.top.window._bridge_self

      // 返回操作对象与返回层级
      let _history = window.history
      if (history && history.go) _history = history
      let _backLvl = backLvl || -1

      // 清空无效的h5返回
      if (
        Object.prototype.toString.call(window.onHistoryBacks) !== '[object Object]' ||
        Object.isEmptyObject(window.onHistoryBacks)
      ) {
        window.onHistoryBacks = null
      }

      let isFromApp = Device.getUrlParameter('isFromApp') || ''
      // 如果已经有h5返回监听, 优先执行h5返回监听
      if (window.onHistoryBacks || window.onHistoryBack) {
        console.log('back:window.onHistoryBack')
        fail && fail()
        resolve(false)
      }
      // 自定义返回
      else if (typeof window.onMonitorBack === 'function') {
        console.log('back:window.onMonitorBack自定义返回')
        let monitor = await window.onMonitorBack()
        let isBack = monitor || false
        if (isBack) {
          success && success()
        } else {
          fail && fail()
        }
        resolve(isBack)
      }
      // 关闭返回
      else if (isFromApp === '1') {
        console.log('back:', self.closeWindow)
        // 关闭当前页面
        try {
          self.closeWindow()
        } catch (error) {
          console.log(error)
        }
        success && success()
        resolve(true)
      }
      // 返回首页
      else if (isFromApp === 'home') {
        console.log('back:', self.goHome)
        try {
          self.goHome()
        } catch (error) {
          console.log(error)
        }
        success && success()
        resolve(true)
      }
      // 提示后，关闭返回，或者历史返回
      else if (isFromApp.indexOf('confirm-close') !== -1 || isFromApp.indexOf('confirm') !== -1) {
        // 默认提示信息
        let confirmCaption = locale('您确定要离开此页面吗?', 'SeedsUI_quit_page_confirm')
        // 地址栏动态提示信息
        if (isFromApp.indexOf('confirm-close:') !== -1) {
          let newConfirmCaption = isFromApp.replace('confirm-close:', '')
          if (newConfirmCaption) {
            confirmCaption = decodeURIComponent(decodeURIComponent(newConfirmCaption))
          }
        } else if (isFromApp.indexOf('confirm:') !== -1) {
          let newConfirmCaption = isFromApp.replace('confirm:', '')
          if (newConfirmCaption) {
            confirmCaption = decodeURIComponent(decodeURIComponent(newConfirmCaption))
          }
        }

        Modal.confirm({
          content: confirmCaption,
          submitProps: {
            onClick: () => {
              // 提示后关闭当前页面
              if (isFromApp.indexOf('confirm-close') !== -1) {
                console.log('back:confirm-close', self.closeWindow)
                self.closeWindow()
              }
              // 提示后返回上一页
              else {
                console.log('back:confirm-close, history')
                _history.go(_backLvl)
              }
              success && success()
              resolve(true)
              return true
            }
          },
          cancelProps: {
            onClick: () => {
              fail && fail()
              resolve(false)
              return true
            }
          }
        })
      }
      // 返回上一页
      else {
        _history.go(_backLvl)
        success && success()
        resolve(true)
      }
    })
  },
  /**
   * 动态加载桥接库
   * @param {Func} callback 加载完成回调
   * @param {Object} options {wechatLibSrc: '', weworkLibSrc: '', wqCordovaSrc: '', wqSrc: '', fail: func({errMsg: ''})}
   */
  ready: function (callback, options = {}) {
    let self = this
    let platform = self.platform
    let d = new Date()
    if (
      platform !== 'wechat' &&
      platform !== 'wework' &&
      platform !== 'alipay' &&
      platform !== 'wechatMiniprogram' &&
      platform !== 'weworkMiniprogram' &&
      platform !== 'alipayMiniprogram' &&
      platform !== 'waiqin' &&
      platform !== 'dinghuo' &&
      platform !== 'wq'
    ) {
      if (callback) callback()
      return
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = 'defer'
    if (
      platform === 'wechat' ||
      platform === 'wechatMiniprogram' ||
      platform === 'wework' ||
      platform === 'weworkMiniprogram' ||
      platform === 'alipay' ||
      platform === 'alipayMiniprogram'
    ) {
      // 微信平台
      // 加载微信库
      if (platform === 'wechat') {
        script.src = options.wechatLibSrc || '//res.wx.qq.com/open/js/jweixin-1.6.0.js'
      } else if (platform === 'wechatMiniprogram') {
        script.src = options.wechatMiniprogramLibSrc || '//res.wx.qq.com/open/js/jweixin-1.6.0.js'
      } else if (platform === 'wework') {
        script.src = options.weworkLibSrc || '//res.wx.qq.com/wwopen/js/jsapi/jweixin-1.0.0.js'
      } else if (platform === 'weworkMiniprogram') {
        script.src = options.weworkMiniprogramLibSrc || '//res.wx.qq.com/open/js/jweixin-1.6.0.js'
      } else if (platform === 'alipay' || platform === 'alipayMiniprogram') {
        script.src =
          options.alipayLibSrc ||
          '//gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js'
      }

      // 加载完成
      script.onload = async function () {
        // 支付宝平台库名称变更为wx
        if (platform === 'alipay' || platform === 'alipayMiniprogram') {
          window.wx = window.ap
        }
        // 支付小程序还需要加载一个js
        if (platform === 'alipayMiniprogram') {
          await Object.loadScript(options.alipayMiniprogramLibSrc || 'https://appx/web-view.min.js')
          if (window.my) {
            window.wx.miniProgram = window.my
          }
          // js加载失败
          else {
            console.error('支付小程序js加载失败')
            options?.fail?.({ errMsg: locale('支付小程序js加载失败') })
            return
          }
        }

        // eslint-disable-next-line
        if (window.wx && !window.top.wx) {
          // eslint-disable-next-line
          window.top.wx = window.wx
        }
        if (callback) callback()
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({ errMsg: locale('微信js加载失败', 'SeedsUI_wechat_js_load_failed') })
        }
      }
    } else if (platform === 'waiqin') {
      // 外勤cordova
      script.src =
        options.wqCordovaSrc || '//res.waiqin365.com/d/common_mobile/component/cordova/cordova.js'
      script.onload = function () {
        self.init(() => {
          if (callback) callback()
        })
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({ errMsg: locale('外勤cordova加载失败', 'SeedsUI_cordova_js_load_failed') })
        }
      }
    } else if (platform === 'wq') {
      if (window.top.wq) {
        callback()
        return
      }
      // 外勤jssdk
      // 用开发d目录可以使用新功能
      script.src =
        options.wqSrc ||
        `//res.waiqin365.com/d/open/js/waiqin365.min.js?v=${d.getMonth() + '' + d.getDate()}`
      script.onload = function () {
        self.init(callback)
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({ errMsg: locale('外勤js加载失败', 'SeedsUI_qince_js_load_failed') })
        }
      }
    } else if (platform === 'dinghuo') {
      if (window.top.wq) {
        callback()
        return
      }
      // 订货jssdk
      // 用开发d目录可以使用新功能
      script.src =
        options.wqSrc ||
        `//res.waiqin365.com/d/open/js/waiqin365.min.js?v=${d.getMonth() + '' + d.getDate()}`
      script.onload = function () {
        self.init(callback)
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({ errMsg: locale('外勤js加载失败', 'SeedsUI_qince_js_load_failed') })
        }
      }
    }
    if (script.src) document.body.appendChild(script)
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
  }
  /**
   * 基础功能:end
   */
}
export default Bridge
