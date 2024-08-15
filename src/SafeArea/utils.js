// 测试使用
// import { Device } from 'seedsui-react'
// 内库使用
import Device from './../Device'

// 微信勤策客户端，Layout全屏时增加安全区域（仅对苹果的安全区域生效）
function hasSafeArea() {
  if (Device.platform === 'wq' && Device.compareVersion(Device.platformVersion, '7.1.90') >= 0) {
    return true
  }
  if (Device.platform === 'wechatMiniprogram' || Device.platform === 'alipayMiniprogram') {
    return true
  }
  return false
}

// Set pick safe area
function setPickerSafeArea() {
  let className = 'safe-area-picker'
  if (hasSafeArea()) {
    document.documentElement.classList.add(className)
  } else {
    document.documentElement.classList.remove(className)
  }
}

// Set global safe area border-bottom
function setRootSafeArea() {
  // Set root safe area
  let className = 'safe-area-root'

  if (hasSafeArea()) {
    document.documentElement.classList.add(className)
  } else {
    document.documentElement.classList.remove(className)
  }
}

// eslint-disable-next-line
export default {
  hasSafeArea,
  setRootSafeArea,
  setPickerSafeArea
}
