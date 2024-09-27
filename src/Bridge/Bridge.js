import BridgeBrowser from './browser'
import BridgeWx from './wx'
import BridgeAlipay from './ap'
import BridgeDingtalk from './dingtalk'
import BridgeDinghuo from './dinghuo'
import BridgeWq from './wq'
import BridgeWqCordova from './cordova'

// 内库使用
import Device from './../Device'

// 测试使用
// import { Device } from 'seedsui-react'

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
} else if (Device.platform === 'dingtalk') {
  Bridge = BridgeDingtalk
} else if (Device.platform === 'dinghuo') {
  Bridge = BridgeDinghuo
} else if (Device.platform === 'waiqin') {
  Bridge = BridgeWqCordova
} else if (Device.platform === 'wq') {
  Bridge = BridgeWq
} else {
  Bridge = BridgeBrowser
}

export default Bridge
