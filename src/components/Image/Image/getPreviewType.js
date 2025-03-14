// 内库使用-start
import Device from './../../../utils/Device'
import Bridge from './../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge, Device } from 'seedsui-react'
测试使用-end */

function getPreviewType(type) {
  // Not video
  if (
    type !== 'video' &&
    Device.device === 'mobile' &&
    (Bridge.platform === 'wq' ||
      Bridge.platform === 'waiqin' ||
      Bridge.platform === 'wechat' ||
      Bridge.platform === 'wework' ||
      Bridge.platform === 'alipay' ||
      Bridge.platform === 'dingtalk' ||
      Bridge.platform === 'lark' ||
      Bridge.platform === 'wechatMiniprogram' ||
      Bridge.platform === 'weworkMiniprogram' ||
      Bridge.platform === 'alipayMiniprogram')
  ) {
    return 'nativeImage'
  }
  // Video
  if (Bridge.platform === 'wq' && type === 'video') {
    return 'nativeFile'
  }

  // Video or image
  return 'browser'
}

export default getPreviewType
