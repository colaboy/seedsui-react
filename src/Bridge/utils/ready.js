// 内库使用
import locale from './../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

/**
 * 动态加载桥接库
 * @param {Func} callback 加载完成回调
 * @param {Object} options {wechatLibSrc: '', weworkLibSrc: '', wqCordovaSrc: '', wqSrc: '', fail: func({errMsg: ''})}
 */
function ready(callback, options = {}, Bridge) {
  let platform = Bridge.platform

  let date = new Date()

  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.defer = 'defer'

  // 微信支付宝平台
  if (
    platform === 'wechat' ||
    platform === 'wechatMiniprogram' ||
    platform === 'wework' ||
    platform === 'weworkMiniprogram' ||
    platform === 'alipay' ||
    platform === 'alipayMiniprogram'
  ) {
    // 初始化完成不需要重复加载
    if (window.top.wx || window.top.wq) {
      if (callback) callback()
      return
    }

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
  }
  // 勤策cordova内核
  else if (platform === 'waiqin') {
    console.error('请勿使用cordova内核, 请安排版本转成新内核')
    // 外勤cordova
    script.src =
      options.wqCordovaSrc || '//res.waiqin365.com/d/common_mobile/component/cordova/cordova.js'
    script.onload = function () {
      Bridge.init(() => {
        if (callback) callback()
      })
    }
    if (options.fail) {
      script.onerror = function () {
        options.fail({ errMsg: locale('外勤cordova加载失败', 'SeedsUI_cordova_js_load_failed') })
      }
    }
  }
  // 勤策与订货平台
  else if (platform === 'wq' || platform === 'dinghuo') {
    // 初始化完成不需要重复加载
    if (window.top.wq) {
      if (callback) callback()
      return
    }

    // 外勤jssdk
    // 用开发d目录可以使用新功能
    script.src =
      options.wqSrc ||
      `//res.waiqin365.com/d/open/js/waiqin365.min.js?v=${date.getMonth() + '' + date.getDate()}`
    script.onload = function () {
      Bridge.init(callback)
    }
    if (options.fail) {
      script.onerror = function () {
        options.fail({ errMsg: locale('外勤js加载失败', 'SeedsUI_qince_js_load_failed') })
      }
    }
  }
  // 浏览器
  else {
    if (callback) callback()
    return
  }

  if (script.src) document.body.appendChild(script)
}

export default ready