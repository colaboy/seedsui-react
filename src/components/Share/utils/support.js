// 内库使用-start
import Bridge from './../../../utils/Bridge'
import Device from './../../../utils/Device'
// 内库使用-end

/* 测试使用-start
import { Device, Bridge } from 'seedsui-react'
测试使用-end */

function support(shareTo) {
  // WeChat only support wechat
  if (Bridge.platform === 'wechat') {
    if (shareTo?.wechat) return true
    return false
  }

  // WeCom only support wecom
  if (Bridge.platform === 'wework') {
    if (shareTo?.wecom) return true
    return false
  }

  // DingTalk only support dingtalk
  if (Bridge.platform === 'dingtalk') {
    if (shareTo?.dingtalk) return true
    return false
  }

  // Lark only support lark
  if (Bridge.platform === 'lark') {
    if (shareTo?.lark) return true
    return false
  }

  // Custom Extension Items
  if (Array.isArray(shareTo?.extensions) && shareTo?.extensions.length) {
    for (let extension of shareTo.extensions) {
      if (extension?.isVisible?.({ shareTo })) {
        return true
      }
    }
  }

  return false
}

export default support
