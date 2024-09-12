// 测试使用
// import { Device } from 'seedsui-react'
// 内库使用
import Device from './../Device'

import BridgeBrowser from './browser'
import BridgeWx from './wx'
import BridgeAlipay from './ap'
import BridgeDinghuo from './dinghuo'
import BridgeWaiqin from './wq'
import BridgeWaiqinCordova from './cordova'

let Bridge = {}
if (
  Device.platform === 'wechat' ||
  Device.platform === 'wework' ||
  Device.platform === 'wechatMiniprogram' ||
  Device.platform === 'weworkMiniprogram'
) {
  Bridge = BridgeWx
} else if (Device.platform === 'alipay' || Device.platform === 'alipayMiniprogram') {
  Bridge = BridgeAlipay
} else if (Device.platform === 'dinghuo') {
  Bridge = BridgeDinghuo
} else if (Device.platform === 'waiqin') {
  Bridge = BridgeWaiqinCordova
} else if (Device.platform === 'wq') {
  Bridge = BridgeWaiqin
} else {
  Bridge = BridgeBrowser
}

export default Bridge
