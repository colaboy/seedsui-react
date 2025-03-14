// 内库使用-start
import Device from './../../utils/Device'
import Bridge from './../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge, Device } from 'seedsui-react'
测试使用-end */

function getUploadType(type) {
  // 指定类型
  if (typeof type === 'string') {
    if (['qince', 'browser', 'weChatMiniProgram', 'weChat'].includes(type)) {
      return type
    }
    return 'browser'
  }

  // 优先调用客户端能力
  if (Bridge.platform === 'wq' || Bridge.platform === 'dinghuo') {
    return 'wq'
  }

  // file框模式上传
  if (type === 'browser' || Device.device === 'pc') {
    return 'browser'
  }

  // In WeChatMiniProgram When Real-time upload， just use WeMini
  if (DB.getSession('weChatMiniProgram') && !props?.async) {
    return 'weChatMiniProgram'
  }

  if (
    Bridge.platform === 'wechat' ||
    Bridge.platform === 'wework' ||
    Bridge.platform === 'wechatMiniprogram' ||
    Bridge.platform === 'weworkMiniprogram'
  ) {
    return 'weChat'
  }
}

export default getUploadType
