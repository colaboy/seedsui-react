// 测试使用
// import { Device, Loading, Toast, locale } from 'seedsui-react'
// import Preview from 'seedsui-react/lib/Preview/instance.js'
// 内库使用
import Device from './../Device'
import Loading from './../Loading'
import Toast from './../Toast'
import locale from './../locale'
import Preview from './../Preview/instance.js'

let Bridge = {
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
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
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
   * 获取当前地理位置
   * @param {Object} params
   * @prop {String} type 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * @return {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    let self = this
    // debug模拟定位
    if (self.debug) {
      if (self.locationTask) {
        self.locationTask.push(params)
        return
      }
      self.locationTask = []
      console.log('调用浏览器定位...')
      setTimeout(() => {
        let res = {
          errMsg: 'getLocation:ok',
          speed: '0.0',
          accuracy: '3.0.0'
        }
        if (params?.type === 'gcj02') {
          res.latitude = 39.909187
          res.longitude = 116.397451
        } else {
          res.latitude = 39.907783490367706
          res.longitude = 116.39120737493609
        }
        if (params.success) params.success(res)
        if (params.complete) params.complete(res)
        self?.getLocationTask?.(res)
      }, 2000)
      return
    }

    // 调用浏览器定位
    if (navigator.geolocation) {
      // 调用定位
      if (self.locationTask) {
        self.locationTask.push(params)
        return
      }
      self.locationTask = []
      console.log('调用浏览器定位...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let res = {
            errMsg: 'getLocation:ok',
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            speed: '0.0',
            accuracy: '3.0.0'
          }
          console.log('调用浏览器定位成功', res)
          if (params.success) params.success(res)
          self.getLocationTask(res)
        },
        (error) => {
          let errMsg = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errMsg = `getLocation:fail ${locale(
                '定位失败,用户拒绝请求地理定位',
                'SeedsUI_location_permission_denied_error'
              )}`
              break
            case error.POSITION_UNAVAILABLE:
              console.log(
                `${locale('定位失败,位置信息是不可用', 'SeedsUI_location_unavailable_error')}`
              )
              errMsg = `getLocation:fail ${locale(
                '定位失败,位置信息是不可用',
                'SeedsUI_location_unavailable_error'
              )}`
              break
            case error.TIMEOUT:
              console.log(
                `${locale('定位失败,位置信息是不可用', 'SeedsUI_location_overtime_error')}`
              )
              errMsg = `getLocation:fail ${locale(
                '定位失败,请求获取用户位置超时',
                'SeedsUI_location_overtime_error'
              )}`
              break
            case error.UNKNOWN_ERROR:
              console.log(
                `${locale('定位失败,位置信息是不可用', 'SeedsUI_location_unknown_error')}`
              )
              errMsg = `getLocation:fail ${locale(
                '定位失败,定位系统失效',
                'SeedsUI_location_unknown_error'
              )}`
              break
            default:
              console.log(`${locale('定位失败', 'SeedsUI_location_failed')}`)
              errMsg = `getLocation:fail ${locale('定位失败', 'SeedsUI_location_failed')}`
          }
          let res = { errMsg: errMsg }
          console.log('调用浏览器定位失败', res)
          if (params.fail) params.fail(res)
          self?.getLocationTask?.(res)
        },
        {
          enableHighAcuracy: true, // 指示浏览器获取高精度的位置，默认为false
          timeout: 5000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          maximumAge: 2000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        }
      )
    } else {
      console.log(`${locale('当前浏览器不支持定位', 'SeedsUI_location_not_supported')}`)
      let res = {
        errMsg: `getLocation:fail ${locale(
          '当前浏览器不支持定位',
          'SeedsUI_location_not_supported'
        )}`
      }
      if (params.fail) params.fail(res)
      self.getLocationTask(res)
    }
    return
  },
  /**
   * 扫描二维码并返回结果
   * @param {Object} params
   * @return {Object} {resultStr: ''}
   */
  scanQRCode: function (params = {}) {
    let self = this
    if (!self.debug) {
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
    let self = this
    if (!self.debug) {
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
    let self = this
    if (!self.debug) {
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
  // @params {urls:'需要预览的图片http链接列表',index:'图片索引',layerHTML:'图片上方的浮层'}
  preview: null,
  previewImage: function (params = {}) {
    let self = this
    if (!params.urls || !params.urls.length) {
      if (params.fail)
        params.fail({
          errMsg: 'previewImage:fail' + locale('没有预览图片地址', 'SeedsUI_previewimage_no_url')
        })
      return
    }
    let src = params.urls[params.index || 0]
    if (!src) {
      if (params.fail)
        params.fail({
          errMsg: 'previewImage:fail' + locale('图片地址无效', 'SeedsUI_invalid_image_src')
        })
      return
    }
    let layerHTML = params.layerHTML || ''
    if (!self.preview) {
      self.preview = new Preview({
        src: src,
        layerHTML: layerHTML,
        onSuccess: function (s) {
          s.show()
          if (params.success) params.success(s)
        },
        onError: function () {
          if (params.fail)
            params.fail({
              errMsg: 'previewImage:fail' + locale('图片地址无效', 'SeedsUI_invalid_image_src')
            })
        }
      })
    } else {
      self.preview.updateParams({
        src: src,
        layerHTML: layerHTML
      })
    }
    return self.preview
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
    let self = this
    if (!self.debug) {
      Toast.show({
        content: locale('previewFile仅可在微信或APP中使用', 'SeedsUI_only_app_wechat', [
          'previewFile'
        ])
      })
      if (params.fail)
        params.fail({
          errMsg: `previewFile:fail${locale(
            '预览文件失败',
            'SeedsUI_previewfile_failed'
          )}, ${locale('请稍后重试', 'SeedsUI_try_again_later')}`
        })
      return
    }
    if (params.success)
      params.success({
        errMsg: `previewFile:ok${locale('预览文件成功', 'SeedsUI_previewfile_success')}`
      })
    if (params.url) window.location.href = params.url
  }
}
export default Bridge
