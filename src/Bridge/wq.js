import DB from './../DB'
import Device from './../Device'
import GeoUtil from './../GeoUtil'
import locale from './../locale'

var self = null

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'wq',
  // 自定义操作
  // eslint-disable-next-line
  trigger: top?.wq?.trigger,
  // eslint-disable-next-line
  invoke: top?.wq?.invoke,
  // 配置鉴权
  init: function (cb) {
    self = this
    /* eslint-disable */
    top.wq.config({ auth: false })
    let isReady = false
    top.wq.ready(function (response) {
      isReady = true
      // 初始化完成回调
      if (typeof cb === 'function') cb(response)
    })
    setTimeout(() => {
      if (!isReady) {
        alert('桥接超时, 如果无法使用本地能力, 请退出重试')
        if (typeof cb === 'function') cb({ errMsg: 'config:fail timeout' })
      }
    }, 2000)
    /* eslint-enable */
  },
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && top.window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  // 获得版本信息
  getAppVersion: function () {
    return Device.platformVersion
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 退出到登陆页面
  logOut: function () {
    top.wq.invoke('logout') // eslint-disable-line
  },
  /**
   * 打开新的窗口
   * @param {Object} params {title: '自定义标题', url: '打开地址(h5:为打开老内容)', target: '_self'}}
   */
  openWindow: function (params = {}) {
    self = this
    // 新内核打开老内核
    if (params.url.indexOf('h5:') === 0) {
      if (Device.os === 'android') {
        let url = params.url
        if (url.indexOf('h5:/') === 0) {
          url = `${window.origin}${url.replace(/^h5:/, '')}`
        } else {
          url = `${url.replace(/^h5:/, '')}`
        }
        // eslint-disable-next-line
        top.wq.invoke(
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
        if (params.target === '_self') self.back()
      } else if (Device.os === 'ios') {
        let option = params
        if (!params.cancel && params.target === '_self') {
          option.cancel = function () {
            setTimeout(() => {
              self.back()
            }, 500)
          }
        }
        top.wq.openWindow(option) // eslint-disable-line
      }
    } else {
      // 新内核间跳转
      top.wq.openWindow(params) // eslint-disable-line
    }
  },
  // 关闭窗口
  closeWindow: function (params) {
    top.wq.closeWindow(params) // eslint-disable-line
  },
  /**
   * 修改原生标题
   * @param {Object} params {title: '自定义标题', visiable: '0' 隐藏  '1' 展示, left: { show: false 隐藏返回按钮 true 显示返回按钮}}
   */
  setTitle: function (params) {
    if (params && params.title) {
      if (typeof params.title === 'string') {
        document.title = params.title
        top.wq.setTitle(params) // eslint-disable-line
      } else if (typeof params.title === 'function') {
        params.title()
      }
    }
  },
  // 返回监听
  onHistoryBack: function (params) {
    top.wq.onHistoryBack(params) // eslint-disable-line
  },
  // 防止返回事件叠加绑定
  // monitorBack: null,
  // 客户端返回绑定
  // addBackPress: function (callback) {
  //   self = this
  //   if (callback) self.monitorBack = callback
  //   else self.monitorBack = null
  //   // eslint-disable-next-line
  //   if (top.wq.onHistoryBack) {
  //     // eslint-disable-next-line
  //     top.wq.onHistoryBack(function () {
  //       if (self.monitorBack) self.monitorBack()
  //       else self.back()
  //       self.addBackPress(self.monitorBack)
  //       return false
  //     })
  //   }
  // },
  // 客户端移除返回绑定
  // removeBackPress: function () {
  //   self = this
  //   self.monitorBack = null
  // },
  /**
   * 获取当前地理位置
   * @param {Object} params
   * @prop {String} type 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * @prop {Number} cacheTime 默认60秒缓存防重复定位
   * @return {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    self = this
    // 先从cookie中读取位置信息
    var appLocation = DB.getCookie('app_location')
    if (appLocation === 'undefined') {
      DB.removeCookie('app_location')
      appLocation = ''
    }
    try {
      if (appLocation) appLocation = JSON.parse(appLocation)
    } catch (error) {
      appLocation = ''
    }
    if (appLocation) {
      if (params.success) params.success(appLocation)
      return
    }
    // 调用定位
    if (self.locationTask) {
      self.locationTask.push(params)
      return
    }
    self.locationTask = []
    console.log('调用外勤定位...')
    // eslint-disable-next-line
    top.wq.getLocation({
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: params.type || 'gcj02',
      success: (res) => {
        // 将位置信息存储到cookie中60秒
        if (res.longitude && res.latitude) {
          // 兼容ios客户端622以前的版本只能返回wgs84的问题
          if (Device.os === 'ios' && Device.compareVersion(Device.platformVersion, '6.6.2') < 0) {
            let point = GeoUtil.coordtransform([res.longitude, res.latitude], 'wgs84', 'gcj02')
            res.longitude = point[0]
            res.latitude = point[1]
          }
          if (params.cacheTime)
            DB.setCookie(
              'app_location',
              JSON.stringify(res),
              !isNaN(params.cacheTime) ? Number(params.cacheTime) : 60000
            )
          if (params.success) params.success(res)
        } else {
          if (params.fail) params.fail(res)
        }
        self.getLocationTask(res)
      },
      fail: (res) => {
        if (params.fail) params.fail(res)
        self.getLocationTask(res)
      },
      complete: (res) => {
        if (params.complete) params.complete(res)
      }
    })
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function (params = {}) {
    const { needResult, scanType, desc, ...othersParams } = params || {}
    // eslint-disable-next-line
    top.wq.scanQRCode({
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
    top.wq.chooseImage(params) // eslint-disable-line
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
    // self = this
    var uploadParams = Object.clone(params)
    if (!params.uploadDir) {
      if (params.fail)
        params.fail({ errMsg: 'uploadImage:fail' + locale('没有上传目录', 'hint_no_upload_dir') })
      return
    }
    if (!params.localId) {
      if (params.fail)
        params.fail({
          errMsg: 'uploadImage:fail' + locale('没有上传地址', 'hint_no_upload_localeid')
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
      if (params.success) {
        params.success({
          errMsg: 'uploadImage:ok',
          path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
          serverId: res && res.serverId ? res.serverId : '',
          tenantId: params.tenantId
        })
      }
    }
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0 && uploadParams.ext) {
      delete uploadParams.ext
    }
    console.log('外勤WK内核上传')
    console.log(uploadParams)
    top.wq.uploadImage(uploadParams) // eslint-disable-line
  },
  previewImage: function (params) {
    top.wq.previewImage(params) // eslint-disable-line
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
    self = this
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
            locale('此功能需要升级至6.6.0及以上的客户端', 'hint_upload_file_version')
        })
      return
    }
    if (!localId) {
      if (fail)
        fail({
          errMsg: 'uploadImage:fail' + locale('没有上传地址', 'hint_no_upload_localeid')
        })
      return
    }
    self.invoke(
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
    const self = this
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
      if (fail) fail(locale('此功能需要升级至6.6.0及以上的客户端', 'hint_choose_video_version'))
      return
    }
    console.log('外勤WK内核chooseVideo', params)

    self.invoke(
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
    top.wq.previewFile(params) // eslint-disable-line
  }
}

export default Bridge
