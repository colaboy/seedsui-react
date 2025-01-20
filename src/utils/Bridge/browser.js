import BridgeBase from './base'
import back from './utils/back'
import ready from './utils/ready'

// 内库使用-start
import Device from './../Device'
import Toast from './../../components/Toast'
import LocaleUtil from './../LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Device, Toast, locale } from 'seedsui-react'
测试使用-end */

let Bridge = {
  ...BridgeBase,
  ready: function (callback, options) {
    ready(callback, options, Bridge)
  },
  back: function (backLvl, options) {
    back(backLvl, options, Bridge)
  },
  /**
   * 定制功能
   */
  platform: 'browser',

  // 配置鉴权
  getLocation: function (params = {}) {
    Bridge.getBrowserLocation(params)
  },
  // 获得版本信息
  getAppVersion: function () {
    return ''
  },
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作')
  },
  // 打开新的窗口
  openWindow: function (params = {}) {
    let url = params.url
    if (url.indexOf('h5:') === 0) url = url.replace(/^h5:/, '')
    else if (url.indexOf('webview:') === 0) url = url.replace(/^webview:/, '')
    if (params.target === '_self') {
      window.location.replace(url)
    }
    if (Device.device === 'pc') {
      window.open(url)
      return
    }
    if (url) window.location.href = url
  },
  // 关闭窗口
  closeWindow: function () {
    window.history.go(-1)
  },
  // 返回监听
  onHistoryBack: function () {
    Toast.show({
      content: LocaleUtil.text(
        'onHistoryBack仅可在企业微信或APP中使用',
        'SeedsUI_only_app_wechat',
        ['onHistoryBack']
      )
    })
  },
  // setTitle: '已在base中实现'
  /**
   * 扫描二维码并返回结果
   * @param {Object} params
   * @return {Object} {resultStr: ''}
   */
  scanQRCode: function (params = {}) {
    if (!this.debug) {
      Toast.show({
        content: LocaleUtil.text('此功能仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', [
          'scanQRCode'
        ])
      })
      if (params.fail)
        params.fail({
          errMsg: `scanQRCode:${LocaleUtil.text(
            '扫码失败',
            'SeedsUI_scancode_failed'
          )}, ${LocaleUtil.text('请稍后重试', 'SeedsUI_try_again_later')}`
        })
      return
    }
    setTimeout(function () {
      if (params.success) params.success({ resultStr: '504823170310092750280333' })
    }, 500)
  },
  // 视频文件上传
  uploadFile: function () {
    Toast.show({
      content: LocaleUtil.text('uploadFile仅可在APP中使用', 'SeedsUI_only_app_wechat', [
        'uploadFile'
      ])
    })
  }
}
export default Bridge
