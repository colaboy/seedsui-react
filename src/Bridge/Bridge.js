// 测试使用
// import { Device } from 'seedsui-react'
// 内库使用
import Device from './../Device'

import BridgeBase from './base'
import BridgeBrowser from './browser'
import BridgeWeixin from './wx'
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
  Bridge = {
    ...BridgeBase,
    ...BridgeWeixin
  }
} else if (Device.platform === 'alipay' || Device.platform === 'alipayMiniprogram') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWeixin,
    ...BridgeAlipay
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
window.top.window._bridge_self = Bridge

/*
Bridge.ready(() => {
  // 增加返回监听
  const addBackMonitor = () => {
    Bridge.onHistoryBack(handleBack)
  }
  const handleBack = async () => {
    let isBack = await Bridge.back()
    if (!isBack) {
      addBackMonitor()
    }
    return false
  }

  // trigger的用法
  wq.trigger('onVoiceRecordEnd', {
    complete: function (res) {
      alert('onVoiceRecordEnd:' + JSON.stringify(res))
    }
  })
})
*/

export default Bridge
