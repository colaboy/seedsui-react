import BridgeBase from './base'
import back from './utils/back'
import ready from './utils/ready'

// 内库使用
import Device from './../Device'
import Loading from './../Loading'
import Toast from './../Toast'
import locale from './../locale'

// 测试使用
// import { Device, Loading, Toast, locale } from 'seedsui-react'

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
  // 自定义操作
  invoke: function () {
    Toast.show({
      content: locale('invoke仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', ['invoke'])
    })
  },
  // 配置鉴权
  init: function (cb) {
    if (typeof cb === 'function') cb({ errMsg: 'config:ok' })
  },
  getLocation: function (params = {}) {
    Bridge.getBrowserLocation(params)
  },
  // 获得版本信息
  getAppVersion: function () {
    return ''
  },
  // 回到主页
  goHome: function () {
    window.history.go(-1)
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
  // setTitle: '已在base中实现'
  // 返回监听
  onHistoryBack: function () {
    Toast.show({
      content: locale('onHistoryBack仅可在企业微信或APP中使用', 'SeedsUI_only_app_wechat', [
        'onHistoryBack'
      ])
    })
  },
  // 导航
  openLocation: function () {
    Toast.show({
      content: locale('openLocation仅可在企业微信或APP中使用', 'SeedsUI_only_app_wechat', [
        'openLocation'
      ])
    })
  },

  /**
   * 扫描二维码并返回结果
   * @param {Object} params
   * @return {Object} {resultStr: ''}
   */
  scanQRCode: function (params = {}) {
    if (!this.debug) {
      Toast.show({
        content: locale('此功能仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', ['scanQRCode'])
      })
      if (params.fail)
        params.fail({
          errMsg: `scanQRCode:${locale('扫码失败', 'SeedsUI_scancode_failed')}, ${locale(
            '请稍后重试',
            'SeedsUI_try_again_later'
          )}`
        })
      return
    }
    setTimeout(function () {
      if (params.success) params.success({ resultStr: '504823170310092750280333' })
    }, 500)
  },
  // 拍照、本地选图
  chooseImage: function (params = {}) {
    if (!this.debug) {
      Toast.show({
        content: locale('chooseImage仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', [
          'chooseImage'
        ])
      })
      return
    }
    let res = {
      sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
      errMsg: 'chooseImage:ok',
      localIds: [
        'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg',
        'https://static.zcool.cn/v3.5.180706.5/zcool/client/image/logo.png'
      ]
    }
    if (params.success) params.success(res)
  },
  // 上传图片
  uploadImage: function (params = {}) {
    if (!this.debug) {
      Toast.show({
        content: locale('uploadImage仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', [
          'uploadImage'
        ])
      })
      return
    }
    Loading.show()
    setTimeout(() => {
      Loading.hide()
      Toast.show({ content: locale('上传完成', 'SeedsUI_upload_finished') })
      let res = {
        errMsg: 'uploadImage:ok',
        mediaUrl: '',
        serverId: new Date().getTime()
      }
      if (params.success) params.success(res)
    }, 1000)
  },
  // 图片预览
  previewImage: function (params = {}) {
    Toast.show({
      content: locale('previewImage仅可在APP中使用', 'SeedsUI_only_app_wechat', ['previewImage'])
    })
  },
  // 视频文件上传
  uploadFile: function () {
    Toast.show({
      content: locale('uploadFile仅可在APP中使用', 'SeedsUI_only_app_wechat', ['uploadFile'])
    })
  },
  // debug:录像
  chooseVideo: function (params = {}) {
    console.log('chooseVideo方法在浏览器上无法运行')
    let res = {
      sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
      errMsg: 'chooseVideo:ok',
      tempFilePath: 'http://res.waiqin365.com/video/v2001.MP4',
      duration: '',
      size: '',
      height: '',
      width: ''
    }
    if (params.success) params.success(res)
  },
  /**
   * 文件操作: 预览文件
   * @param {Object} params
   * params: {
   *  url: '', // 需要预览文件的地址(必填，可以使用相对路径)
   *  name: '', // 需要预览文件的文件名(不填的话取url的最后部分)
   *  size: 1048576 // 需要预览文件的字节大小(必填)
   * }
   */
  previewFile: function (params) {
    if (!this.debug) {
      Toast.show({
        content: locale('previewFile仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', [
          'previewFile'
        ])
      })
      if (params?.fail) {
        params.fail({
          errMsg: `previewFile:fail${locale(
            '预览文件失败',
            'SeedsUI_previewfile_failed'
          )}, ${locale('请稍后重试', 'SeedsUI_try_again_later')}`
        })
      }
      return
    }
    if (params?.success) {
      params.success({
        errMsg: `previewFile:ok${locale('预览文件成功', 'SeedsUI_previewfile_success')}`
      })
    }
    if (params?.url) window.location.href = params.url
  }
}
export default Bridge
