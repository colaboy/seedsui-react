import { Device } from 'seedsui-react'

// 微信勤策客户端，Layout全屏时增加安全区域（仅对苹果的安全区域生效）
function needsSafeArea() {
  if (Device.platform === 'wq' && Device.compareVersion(Device.platformVersion, '7.1.90') >= 0) {
    return true
  }
  if (Device.platform === 'wechatMiniprogram' || Device.platform === 'alipayMiniprogram') {
    return true
  }
  if (Device.os === 'ios' && (Device.platform === 'wework' || Device.platform === 'dingtalk')) {
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
