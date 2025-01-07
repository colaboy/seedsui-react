// 内库使用-start
import Bridge from './../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge } from 'seedsui-react'
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

  // Qince support wechat,wecom,dingtalk,lark
  if (Bridge.platform === 'wq') {
    if (shareTo?.wechat || shareTo?.wecom || shareTo?.dingtalk || shareTo?.lark) return true
    return false
  }

  return false
}

export default support
