// 内库使用-start
import Device from './../../../utils/Device'
// 内库使用-end

/* 测试使用-start
import { Device } from 'seedsui-react'
测试使用-end */

// Determine whether a safe area is needed
function needsSafeArea() {
  let customNeedsSafeArea = window.seedsIsSafeArea?.()
  if (typeof customNeedsSafeArea === 'boolean') {
    return customNeedsSafeArea
  }
  if (Device.platform === 'wechatMiniprogram' || Device.platform === 'alipayMiniprogram') {
    return true
  }
  // 微信、企微、钉钉会自动加安全区, 也会自己去掉安全区，所以只能根据分辨率判断
  if (
    Device.os === 'ios' &&
    (Device.platform === 'wechat' || Device.platform === 'wework' || Device.platform === 'dingtalk')
  ) {
    // iPhoneX
    if (window.innerWidth === 375 && window.innerHeight === 724) {
      return true
    }
    // iPhone11promax
    if (window.innerWidth === 414 && window.innerHeight === 808) {
      return true
    }
    // iPhone13min
    if (window.innerWidth === 375 && window.innerHeight === 718) {
      return true
    }
    // iPhone12, iPhone13pro, iPhone14
    if (window.innerWidth === 390 && window.innerHeight === 753) {
      return true
    }
    // iPhone14pro, iPhone15, iPhone15pro
    if (window.innerWidth === 393 && window.innerHeight === 754) {
      return true
    }
    // iPhone14promax,iPhone15promax
    if (window.innerWidth === 430 && window.innerHeight === 834) {
      return true
    }
    // iPhone16promax
    if (window.innerWidth === 430 && window.innerHeight === 833) {
      return true
    }
    return false
  }
  return false
}

export default needsSafeArea
