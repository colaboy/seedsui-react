import Device from './../Device'
import BridgeBase from './base'
import BridgeBrowser from './browser'
import BridgeWeixin from './wx'
import BridgeDinghuo from './dinghuo'
import BridgeWaiqin from './wq'
import BridgeWaiqinCordova from './cordova'

var Bridge = {}
if (
  Device.platform === 'wechat' ||
  Device.platform === 'wework' ||
  Device.platform === 'wechatMiniprogram' ||
  Device.platform === 'weworkMiniprogram'
) {
  Bridge = {
    ...BridgeBase,
    ...BridgeWeixin
  }
} else if (Device.platform === 'dinghuo') {
  Bridge = {
    ...BridgeBase,
    ...BridgeDinghuo
  }
} else if (Device.platform === 'waiqin') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWaiqinCordova
  }
} else if (Device.platform === 'wq') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWaiqin
  }
} else {
  Bridge = {
    ...BridgeBase,
    ...BridgeBrowser
  }
}

// 防止绑定事件时this指向window, 所以全局加一个变量用于存储this
// eslint-disable-next-line
top.window._bridge_self = Bridge

export default Bridge
