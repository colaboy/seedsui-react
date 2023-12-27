// import jsonp from 'seedsui-react/lib/jsonp'
// import Device from 'seedsui-react/lib/Device'
// import MapUtil from 'seedsui-react/lib/MapUtil'
// import Modal from 'seedsui-react/lib/Modal'
// import Toast from 'seedsui-react/lib/Toast'
// import Alert from 'seedsui-react/lib/Alert/instance.js'
// import Loading from 'seedsui-react/lib/Loading'
// import locale from 'library/utils/locale'
// import ToastInstance from 'seedsui-react/lib/Toast/instance.js'

import jsonp from './../jsonp'
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
      Toast.show({ content: locale('此功能仅可在手机中使用', 'hint_only_mobile') })
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
        caption: params.caption || locale('正在加载...', 'loading'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      })
    } else {
      self.loading.updateParams({
        ...params,
        caption: params.caption || locale('正在加载...', 'loading'),
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
        buttonSubmitHTML: locale('确定', 'ok'), // 实例化时需要国际化
        buttonCancelHTML: locale('取消', 'cancel'), // 实例化时需要国际化
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
          buttonSubmitHTML: locale('确定', 'ok'), // 实例化时需要国际化
          buttonCancelHTML: locale('取消', 'cancel'), // 实例化时需要国际化
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
        buttonSubmitHTML: locale('确定', 'ok'), // 实例化时需要国际化
        buttonCancelHTML: locale('取消', 'cancel'), // 实例化时需要国际化
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
          buttonSubmitHTML: locale('确定', 'ok'), // 实例化时需要国际化
          buttonCancelHTML: locale('取消', 'cancel'), // 实例化时需要国际化
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
   * 百度地图:获取当前位置名称
   * @param {Object} params: {longitude: '', latitude: '', success: fn, fail: fn}
   * @param {String} type 'wgs84 | gcj02', 默认gcj02
   * @return {Promise} result: {status: 0 成功, points 百度坐标}
   */
  getAddress: function (params = {}, type = 'gcj02') {
    if (window.getAddressDefault && typeof window.getAddressDefault === 'function') {
      return window.getAddressDefault(params, type)
    }
    const mapUtil = new MapUtil()
    return mapUtil.getAddress([params.longitude, params.latitude], type, params)
  },
  /**
   * 百度地图:获得天气
   * @param {Object} params: {location: 'lng,lat|lng,lat|lng,lat' | '北京市|上海市', success: fn, fail: fn}
   * @returns {Object} 天气信息results
   */
  getWeather: function (params = {}) {
    let url =
      'http://api.map.baidu.com/telematics/v3/weather?location=' +
      (params.location || '南京市') +
      '&output=json&ak=IlfRglMOvFxapn5eGrmAj65H'
    jsonp(url, null, (err, data) => {
      if (err) {
        if (params.fail)
          params.fail({
            errMsg: `getWeather:${locale('获取天气失败, 请稍后重试', 'hint_weather_failed')}` + err
          })
      } else {
        if (data.results && data.results.length) {
          if (params.success) params.success(data.results)
        } else {
          if (params.fail)
            params.fail({
              errMsg: `getWeather:${locale('获取天气失败, 请稍后重试', 'hint_weather_failed')}`
            })
        }
      }
    })
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
        let confirmCaption = locale('您确定要离开此页面吗?', 'confirm_quit_page')
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
      platform !== 'wechatMiniprogram' &&
      platform !== 'weworkMiniprogram' &&
      platform !== 'alipay' &&
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
      platform === 'alipay'
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
      } else if (platform === 'alipay') {
        script.src =
          options.alipayLibSrc ||
          '//gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js'
      }

      // 加载完成
      script.onload = function () {
        // 支付宝平台库名称变更为wx
        if (platform === 'alipay') {
          window.wx = window.ap
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
          options.fail({ errMsg: locale('微信js加载失败', 'hint_wx_failed_to_load') })
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
          options.fail({ errMsg: locale('外勤cordova加载失败', 'hint_cordova_failed_to_load') })
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
          options.fail({ errMsg: locale('外勤js加载失败', 'hint_wq_failed_to_load') })
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
          options.fail({ errMsg: locale('外勤js加载失败', 'hint_wq_failed_to_load') })
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
        document.title = params.title
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
