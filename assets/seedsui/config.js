// 加载seedsui库
import 'seedsui-react/lib/PrototypeArray.js'
import 'seedsui-react/lib/PrototypeMath.js'
import 'seedsui-react/lib/PrototypeObject.js'
import 'seedsui-react/lib/PrototypeString.js'
import 'seedsui-react/lib/PrototypeDate.js'
import 'seedsui-react/lib/PrototypePinyin.js'
import Device from 'seedsui-react/lib/Device'
import ApiAxios from 'seedsui-react/lib/ApiAxios'
import DistrictUtil from './DistrictUtil'
// Cookies管理
import Cookies from 'universal-cookie'

// 加载本地库
import Debugger from './Debugger'

// 解决ios老内核UIWebview点击慢的问题
import FastClick from 'seedsui-react/lib/FastClick'

// 解决微信分享自动加参数的bug
const link = window.location.href
let shareParam = ''
let shareParamIndex = -1
if (link.indexOf('?from=singlemessage') !== -1) {
  shareParam = '?from=singlemessage'
} else if (link.indexOf('?from=timeline') !== -1) {
  shareParam = '?from=timeline'
} else if (link.indexOf('?from=groupmessage') !== -1) {
  shareParam = '?from=groupmessage'
}
if (shareParam) shareParamIndex = link.indexOf(shareParam)
// 如果#号在分享参数后面, 说明分享参数拼错了位置
if (link.indexOf('#') > shareParamIndex && shareParamIndex > 0) {
  const domain = link.split(shareParam)[0]
  const suffix = link.split('#')[1]
  window.location.replace(`${domain}#${suffix}`)
}

// 解决ios点击不触发onClick的bug
window.document.addEventListener(
  'touchstart',
  function () {
    /* Do Nothing */
  },
  false
)

// 连续点击10次, 显示vconsole
Debugger.vconsoleLogger(document.getElementById('vconsoleHandler'))

var root = document.getElementById('root')

// 换click事件为tap
if (Device.platform === 'dinghuo' || Device.platform === 'waiqin' || Device.platform === 'wq') {
  // 适配差安卓, 解决在app中, 输入法上弹界面错位的问题
  if (root && Device.os === 'android' && Device.osVersion < '5.0') {
    root.style.position = 'fixed' // 处理客户端中, 输入法上弹收缩后, 界面显示错位的问题
  }
  // ios外勤客户端UIWebview点击慢的问题
  if (root && Device.platform === 'waiqin' && Device.os === 'ios') {
    FastClick.attach(root)
  }
}

// 适配齐刘海
if (Device.platform === 'wechatMiniprogram') {
  root.classList.add('ios-bang')
}

// 修复兼容ios的bug
// if (Device.os === 'ios') {
document.getElementById('root').addEventListener(
  'click',
  (e) => {
    let type = e.target.getAttribute('type')
    if (e.target.tagName === 'TEXTAREA') {
      type = 'textarea'
    }
    if (type) {
      type = type.toLocaleLowerCase()
    } else {
      type = ''
    }
    if (
      type === 'tel' ||
      type === 'number' ||
      type === 'text' ||
      type === 'password' ||
      type === 'textarea' ||
      type === 'search'
    ) {
      // 解决安卓外勤客户端不上弹的问题, 经测试因为弹出软键盘后webview高度未变导致, 文本框如果在底部则无法解决
      // if (Device.os === 'android' && Device.platform === 'wq') {
      //   e.target.scrollIntoView(true) // true顶到视窗头部, false顶到视窗底部
      // }
      // 弹出输入法页面白屏, 获取焦点时auto, 失去焦点时touch(很有可能是在非body元素下有fixed定位的元素导致, 不建议用此方式去解决)
      // document.getElementById('root').style.WebkitOverflowScrolling = 'auto | touch';
      // 修复ios中readOnly点击仍有焦点的问题
      if (Device.os === 'ios' && e.target.readOnly) {
        e.target.blur()
      }
      // 修复兼容ios12的bug: 弹出软键盘往上顶, 关闭键盘后界面半截白屏
      if (Device.os === 'ios' && Device.osVersion > '12') {
        // 兼容输入法把页面顶上去, 不回弹的问题
        if (window.inputToggleTimeout) {
          window.clearTimeout(window.inputToggleTimeout)
        }
        if (!e.target.getAttribute('ios-bug-blur')) {
          e.target.setAttribute('ios-bug-blur', '1')
          e.target.addEventListener(
            'blur',
            () => {
              window.inputToggleTimeout = window.setTimeout(() => {
                document.getElementById('root').scrollIntoView()
              }, 100)
            },
            false
          )
        }
      }
    }
  },
  false
)
// }

// axios设置
const env = process.env.NODE_ENV
if (env === 'development') {
  ApiAxios.setBaseURL(`/api`)
}

// 设置地址逆解析的方法(订货不支持getAddress方法)
window.getAddressDefault = DistrictUtil.getAddress

// token注入:获取token
function getToken(cookieStr) {
  let cookieMap = {}
  let cookieArr = cookieStr.split(/;|,/)
  if (cookieArr.length === 1 && cookieArr[0].indexOf('=') === -1) return cookieArr[0]
  for (let cookieItemStr of cookieArr) {
    let item = cookieItemStr.split('=')
    cookieMap[item[0]] = item[1]
  }
  return cookieMap['x-token'] || ''
}

// token注入:设置axios请求头
function setToken(token) {
  let newToken = getToken(token)
  const cookies = new Cookies()
  cookies.set('x-token', newToken, {
    path: '/',
    maxAge: 60 * 60 * 24 * 100
  })
}

// token注入:如果url上有cookie, 则优先注入cookie
const token = Device.getUrlParameter('token') || ''
if (token) {
  // 设置axios请求头
  setToken(decodeURIComponent(decodeURIComponent(token)))
}

// 处理401, 客户端不需要处理
// if (Device.platform !== 'dinghuo' && Device.platform !== 'waiqin' && Device.platform !== 'wq') {
//   ApiAxios.fail = function(error) {
//     if (error && error.response && error.response.status === 401) {
//       URLUtil.logOut(error.response.data.message);
//     }
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'));
