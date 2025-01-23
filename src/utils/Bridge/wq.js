import _ from 'lodash'
import BridgeBase from './base'
import back from './utils/back'
import ready from './utils/ready'
import coordToFit from './utils/coordToFit'

// 内库使用-start
import Device from './../Device'
import LocaleUtil from './../LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Device, locale } from 'seedsui-react'
测试使用-end */

let Bridge = {
  ...BridgeBase,
  ready: function (callback, options) {
    ready(
      () => {
        if (window.wq && !window.top.wq) {
          window.top.wq = window.wq
        }

        let isReady = false
        if (window.top.wq) {
          window.top.wq.config({ auth: false })
          window.top.wq.ready(function (response) {
            if (isReady) return

            isReady = true
            // 初始化完成回调
            if (response.errMsg === 'config:ok') {
              console.log('桥接加载完成')
            } else {
              console.error('桥接失败, 如果无法返回请左滑返回')
            }
            if (typeof callback === 'function') callback(response)
          })
        }
        setTimeout(() => {
          // 单例
          if (isReady) return

          isReady = true
          console.error('桥接超时, 如果无法使用本地能力, 请退出重试')
          if (typeof callback === 'function') callback({ errMsg: 'config:fail timeout' })
        }, 2000)
      },
      options,
      Bridge
    )
  },
  back: function (backLvl, options) {
    back(backLvl, options, Bridge)
  },
  /**
   * 定制功能
   */
  platform: 'wq',
  // 自定义操作
  invoke: function (api, params, callback) {
    window.top.wq.invoke(api, params, callback)
  },
  // 获得版本信息
  getAppVersion: function () {
    return Device.platformVersion
  },
  // 退出到登陆页面
  logOut: function () {
    window.top.wq.invoke('logout') // eslint-disable-line
  },
  /**
   * 打开新的窗口
   * @param {Object} params {title: '自定义标题', url: '打开地址(h5:为打开老内容)', target: '_self'}}
   */
  openWindow: function (params = {}) {
    // 新内核打开老内核
    if (params.url.indexOf('h5:') === 0) {
      if (Device.os === 'android') {
        let url = params.url
        if (url.indexOf('h5:/') === 0) {
          url = `${window.origin}${url.replace(/^h5:/, '')}`
        } else {
          url = `${url.replace(/^h5:/, '')}`
        }
        window.top.wq.invoke(
          'nativeComponent',
          {
            android: {
              name: 'org.apache.cordova.WqCordovaActivity',
              params: {
                url: url,
                title: params.title || ''
              }
            }
          },
          () => {}
        )
        if (params.target === '_self') Bridge.back()
      } else if (Device.os === 'ios') {
        let option = params
        if (!params.cancel && params.target === '_self') {
          option.cancel = function () {
            setTimeout(() => {
              Bridge.back()
            }, 500)
          }
        }
        window.top.wq.openWindow(option) // eslint-disable-line
      }
    } else {
      // 新内核间跳转
      window.top.wq.openWindow(params) // eslint-disable-line
    }
  },
  // 关闭窗口
  closeWindow: function (params) {
    window.top.wq.closeWindow(params) // eslint-disable-line
  },
  // 返回监听
  onHistoryBack: function (params) {
    window.top.wq.onHistoryBack(params) // eslint-disable-line
  },
  /**
   * 修改原生标题
   * @param {Object} params {title: '自定义标题', visiable: '0' 隐藏  '1' 展示, left: { show: false 隐藏返回按钮 true 显示返回按钮}}
   */
  setTitle: function (params) {
    if (params && params.title) {
      if (typeof params.title === 'string') {
        window.top.document.title = params.title
        window.top.wq.setTitle(params) // eslint-disable-line
      } else if (typeof params.title === 'function') {
        params.title()
      }
    }
  },
  // 导航
  openLocation: function (params) {
    if (_.isEmpty(params)) return
    let newParams = coordToFit(params)
    console.log('调用勤策地图...', newParams)

    window.top.wq.openLocation(newParams)
  },
  /**
   * 获取当前地理位置
   * @param {Object} params
   * @prop {String} type 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * @return {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    if (!params.type) {
      params.type = 'gcj02'
    }
    console.log('调用外勤定位...', params)
    window.top.wq.getLocation(params)
  },
  /**
   * 扫描二维码并返回结果
   * @param {Object} params
   * @return {Object} {resultStr: ''}
   */
  scanQRCode: function (params = {}) {
    const { needResult, scanType, desc, ...othersParams } = params || {}
    window.top.wq.scanQRCode({
      needResult: needResult || 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: scanType || ['qrCode', 'barCode'],
      desc: desc || '二维码／条码',
      ...othersParams
    })
  },
  /**
    * 拍照、本地选图
    * @param {Object} params
    * {
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      watermark: ['第一行', '第二行'],
      success({localIds:[src]})
    * }
    */
  chooseImage: function (params) {
    console.log('外勤WK内核chooseImage', params)
    window.top.wq.chooseImage(params) // eslint-disable-line
  },
  /**
    * 照片上传, ios测试环境无法上传
    * @param {Object} params
    * {
      uploadDir: '目录/年月',
      tenantId: '企业id',
      localId: 'localId',
      success: func(res)
    * }
    */
  uploadImage: function (params = {}) {
    let uploadParams = _.cloneDeep(params)
    if (!params.uploadDir) {
      if (params.fail)
        params.fail({
          errMsg:
            'uploadImage:fail' +
            LocaleUtil.locale('没有上传目录', 'SeedsUI_uploadImage_no_uploadDir')
        })
      return
    }
    if (!params.localId) {
      if (params.fail)
        params.fail({
          errMsg:
            'uploadImage:fail' +
            LocaleUtil.locale('没有上传地址', 'SeedsUI_uploadImage_no_localeId')
        })
      return
    }
    if (params.tenantId) uploadParams.tenantId = params.tenantId
    // ext参数: isAutoCheck: '0'/'1'是否自动识别|cmId: 客户Id|appId：应用Id|menuId: 菜单Id(必填)|funcId: 表单Id
    let menuId = Device.getUrlParameter('menuId') || ''
    uploadParams.ext = {
      menuId: menuId,
      ...(params.ext || {})
    }
    // 构建成功回调的参数
    uploadParams.success = function (res) {
      console.log('外勤WK内核上传成功', res)
      if (params.success) {
        params.success({
          errMsg: 'uploadImage:ok',
          ...res,
          path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
          serverId: res && res.serverId ? res.serverId : '',
          tenantId: params.tenantId
        })
      }
    }
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0 && uploadParams.ext) {
      delete uploadParams.ext
    }
    console.log('外勤WK内核上传', uploadParams)
    window.top.wq.uploadImage(uploadParams) // eslint-disable-line
  },
  previewImage: function (params) {
    window.top.wq.previewImage(params) // eslint-disable-line
  },
  /**
    * 视频文件上传
    * @param {Object} params
    * {
      uploadDir: '目录/年月',
      localId: 'localId',
      success: func(res)
    * }
    */
  uploadFile: function (params) {
    // eslint-disable-next-line
    params = params || {}

    const {
      data,
      url,
      localId,
      // success,
      // cancel,
      fail,
      // complete,
      ...othersParams
    } = params

    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      if (fail)
        fail({
          errMsg:
            'uploadImage:fail' +
            LocaleUtil.locale('more than', 'SeedsUI_version_min_prompt', ['uploadFile', '6.2.0'])
        })
      return
    }
    if (!localId) {
      if (fail)
        fail({
          errMsg:
            'uploadImage:fail' +
            LocaleUtil.locale('没有上传地址', 'SeedsUI_uploadImage_no_localeId')
        })
      return
    }
    window.top.wq.invoke(
      'uploadFile',
      {
        url: url || `${window.origin}/fileupload/v1/doUpload.do?uploadPath=file`,
        filePath: localId,
        name: 'file',
        formData: data,
        ...othersParams
      },
      params
    )
  },
  /**
    * 选择、录制视频
    * @param {Object} params
    * {
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      maxDuration: 10, // 最大录相时长
      camera: 'back', // back || front，默认拉起的是前置或者后置摄像头。非必填，默认back
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success({localIds:[src]})
    * }
    */
  chooseVideo: function (params) {
    // eslint-disable-next-line
    params = params || {}

    const {
      sourceType,
      maxDuration,
      camera,
      sizeType,
      success,
      cancel,
      fail,
      complete,
      ...othersParams
    } = params

    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      if (fail)
        fail(LocaleUtil.locale('more than', 'SeedsUI_version_min_prompt', ['chooseVideo', '6.6.0']))
      return
    }
    console.log('外勤WK内核chooseVideo', params)

    window.top.wq.invoke(
      'chooseVideo',
      {
        sourceType: sourceType || ['album', 'camera'],
        maxDuration: maxDuration || 10,
        camera: camera || 'back',
        compressed:
          sizeType && sizeType.length && sizeType.indexOf('compressed') === -1 ? false : true,
        ...othersParams
      },
      function (res) {
        // 标准化回调参数: 将tempFilePath改为localId
        if (res.tempFilePath) {
          res.localIds = [res.tempFilePath]
        }
        if (res.errMsg.indexOf('chooseVideo:ok') !== -1) {
          if (success) success(res)
        } else if (res.errMsg.indexOf('chooseVideo:cancel') !== -1) {
          if (cancel) cancel(res)
        } else {
          if (fail) fail(res)
        }
        if (complete) complete(res)
      }
    )
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
    window.top.wq.previewFile(params) // eslint-disable-line
  }
}

export default Bridge
