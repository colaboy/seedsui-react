// 测试使用
// import { DB, Toast, Device, locale } from 'seedsui-react/lib/DB'
// 内库使用
import DB from './../DB'
import Toast from './../Toast'
import Device from './../Device'
import locale from './../locale'

let self = null

let Bridge = {
  /**
   * 定制功能
   */
  platform: 'waiqin',
  init: function (cb) {
    self = this
    document.addEventListener(
      'deviceready',
      () => {
        // 初始化完成回调
        if (typeof cb === 'function') cb()
      },
      false
    )
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
    return Device.platformVersion
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 退出到登陆页面
  logOut: function (msg) {
    // eslint-disable-next-line
    wq.wqload.wqBackToLogin(
      JSON.stringify({ message: msg || '您的帐号因正在它处登录, 需要您重新登录' })
    )
  },
  // 打开新的窗口
  openWindow: function (params, callback) {
    // eslint-disable-next-line
    wq.wqload.wqOpenUrl(callback ? callback : null, null, params ? JSON.stringify(params) : null) // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function () {
    // eslint-disable-next-line
    wq.wqload.wqClosePage()
  },
  // 防止返回事件叠加绑定
  cordovaMonitorBack: null,
  handleCordovaMonitorBack: function () {
    if (self.cordovaMonitorBack) self.cordovaMonitorBack()
    else self.back()
  },
  // 客户端返回绑定: cordova中必须在无原生头的情况下才工作
  // addBackPress: function (callback) {
  //   self = this
  //   if (callback) self.cordovaMonitorBack = callback
  //   else self.cordovaMonitorBack = null
  //   document.addEventListener('backbutton', self.handleCordovaMonitorBack, false) // eslint-disable-line
  // },
  // 客户端移除返回绑定
  // removeBackPress: function () {
  //   self = this
  //   document.removeEventListener('backbutton', self.handleCordovaMonitorBack, false) // eslint-disable-line
  // },
  /**
   * 支付宝支付
   * @param {Object} params
   * @param {Function} callback
   * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
   */
  alipay: function (params, callback) {
    // eslint-disable-next-line
    wq.wqpay.alipay(
      (result) => {
        if (callback) callback(result)
      },
      null,
      params ? JSON.stringify(params) : null
    )
  },
  /**
   * 商联支付
   * @param {Object} params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
   * @param {Function} callback 回调
   */
  slopenpay: function (params, callback) {
    // eslint-disable-next-line
    wq.wqpay.slopenpay(
      (result) => {
        if (callback) callback(result)
      },
      null,
      params ? JSON.stringify(params) : null
    )
  },
  /**
   * 大华捷通支付
   * @param {Object} params {payChannel:'UPPay 云闪付  WXPay微信支付 AliPay 支付宝支付', payData:'服务端获取'}
   * @param {Function} callback 回调
   */
  qmfpay: function (params, callback) {
    // eslint-disable-next-line
    wq.wqpay.qmfpay(
      (result) => {
        if (callback) callback(result)
      },
      null,
      params ? JSON.stringify(params) : null
    )
  },
  /*
   * 获取APP信息
   * params: {operation: 'AllInfo'}
   * */
  getApp: function (callback, params = { operation: 'AllInfo' }) {
    // eslint-disable-next-line
    wq.wqapp.getApp(
      (result) => {
        if (callback) callback(result)
      },
      null,
      JSON.stringify(params)
    )
  },
  /**
   * 分享文本
   * @param {Object} params
   * {
   * title: '标题(仅ios支持)',
   * desc: '副标题(仅ios支持)',
   * link: '链接(仅ios支持)',
   * text: '文本(安卓只支持发送文本)',
   * }
   * @param {Function} callback 回调
   */
  shareText: function (params, callback) {
    // eslint-disable-next-line
    wq.wqsocial.wqWXSocialWithUrl(
      (result) => {
        if (callback) callback(result)
      },
      JSON.stringify({
        title: params.title,
        url: params.link,
        description: params.desc
      })
    )
  },
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
  /* // 文件是否存在
  isExistsFile({
    fileName: 'ss.txt',
    size: 200
  }，(result) => { // result => {isExists: '', filePath: '', fileName: ''}，isExists:'0'不存在，'1'存在

  })
  */
  isExistsFile: function (params, callback) {
    // eslint-disable-next-line
    wq.wqio.verifyFileHasExist(
      (result) => {
        if (callback) callback(result)
      },
      params ? JSON.stringify(params) : null
    )
  },
  /* // 附件下载
  downloadFile({
    id: '',
    fileName: src.substring(src.lastIndexOf('/') + 1, src.length), // 必填
    downloadUrl: "http://...", // 必填
    size: 200 // 必填
  }，(result) => { // result => {{flag:'', filePath: '', msg: ''}, flag:'0'失败，'1'成功，msg失败原因

  }) */
  downloadFile: function (params, callback) {
    // eslint-disable-next-line
    wq.wqio.downloadFile(
      (result) => {
        if (callback) callback(result)
      },
      params ? JSON.stringify(params) : null
    )
  },
  /* // 附件打开
  openFile({
    filePath: ''
  }，(result) => { // result => {flag:'', msg:''} flag:'0'失败, '1'成功, msg失败原因

  }） */
  openFile: function (params, callback) {
    // eslint-disable-next-line
    wq.wqio.openFile(
      (result) => {
        if (callback) callback(result)
      },
      params ? JSON.stringify(params) : null
    )
  },
  /* // 附件转为base64
  wqUrlToBase64({
    path: ['', ''],
    destroy: '1' // '0'转完后删除, '1'转完后不删除
  }, (result) => { // result => [{path:'', name:'', src:'base64'}]

  }） */
  wqUrlToBase64: function (params, callback) {
    // eslint-disable-next-line
    wq.wqphoto.wqUrlToBase64(
      (result) => {
        if (callback) callback(result)
      },
      params ? JSON.stringify(params) : null
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
    if (!params) {
      console.warn('[SeedsUI cordova内核]previewFile:fail没有传入参数')
      return
    }
    // eslint-disable-next-line
    wq.wqio.openFile(
      (res) => {
        if (res.flag === '1') {
          if (params.success)
            params.success({
              errMsg: `previewFile:ok${locale('预览文件成功', 'hint_previewFile_success')}`
            })
        } else {
          if (params.fail) params.fail({ errMsg: `previewFile:fail${res.msg}` })
        }
      },
      params
        ? JSON.stringify({
            filePath: params.url
          })
        : null
    )
  },
  /* -----------------------------------------------------
    视频播放
    @params {src: '视频地址', title: '标题'}
  ----------------------------------------------------- */
  previewVideo: function (params = {}) {
    self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      Toast.show({ content: '视频播放功能需要升级至6.2.2及以上的客户端' })
      return
    }
    // eslint-disable-next-line
    wq.wqload.wqOpenCustomerPager(
      JSON.stringify({
        IOSViewController: 'JNCVideoPlayerVC',
        androidUIR: 'com.waiqin365.lightapp.jiannanchun.VideoPlayActivity',
        androidParma: {
          videoUrl: params.src,
          title: params.title || '视频播放'
        },
        IOSParma: {
          videoUrl: params.src,
          title: params.title || '视频播放'
        }
      })
    )
  },
  /* -----------------------------------------------------
    视频录制
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒'}
  ----------------------------------------------------- */
  videoRecord: function (params = {}) {
    self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      Toast.show({
        content: locale('视频录制功能需要升级至6.2.2及以上的客户端', 'hint_video_record_version')
      })
      return
    }
    // eslint-disable-next-line
    wq.wqjnc.videoRecord((res) => {
      if (res.result === '1') {
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({ errMsg: 'videoRecord:录制失败' })
        else Toast.show({ content: locale('录制失败', 'hint_video_record_version') })
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    视频上传
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: ''}
  ----------------------------------------------------- */
  videoUpload: function (params = {}) {
    self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      Toast.show({
        content: locale('视频上传功能需要升级至6.2.2及以上的客户端', 'hint_video_upload_version')
      })
      return
    }
    // eslint-disable-next-line
    wq.wqjnc.videoUpload((res) => {
      if (res.result === '1') {
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({ errMsg: 'videoUpload:上传失败' })
        else Toast.show({ content: locale('上传失败', 'hint_upload_failed') })
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    视频是否已经录制过了
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: '仅在hasUpload=1的情况下返回', hasVideo: '0|1', hasUpload: '0|1}
  ----------------------------------------------------- */
  videoInfo: function (params = {}) {
    self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      Toast.show({
        content: locale('视频功能需要升级至6.2.2及以上的客户端', 'hint_video_info_version')
      })
      return
    }
    // eslint-disable-next-line
    wq.wqjnc.videoInfo((res) => {
      if (res.result === '1') {
        if (params.success) params.success(res)
      } else {
        if (params.fail)
          params.fail({
            errMsg: `videoInfo:${locale('未查到此视频信息', 'hint_video_info_failed')}`
          })
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params = {}) {
    self = this
    // eslint-disable-next-line
    wq.wqhardware.getQrCode((res) => {
      if (res && res.qrCode) {
        let wqRes = res
        wqRes.resultStr = res.qrCode
        if (params && params.success) params.success(wqRes)
      } else {
        if (params.fail)
          params.fail({
            errMsg: `scanQRCode:${locale('扫码失败', 'hint_scan_failed')}, ${locale(
              '请稍后重试',
              'hint_try_again_later'
            )}`
          })
        else
          Toast.show({
            content: `scanQRCode:${locale('扫码失败', 'hint_scan_failed')}, ${locale(
              '请稍后重试',
              'hint_try_again_later'
            )}`
          })
      }
    })
  },
  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * cacheTime {Number}: 缓存毫秒数防重复定位
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  /* -----------------------------------------------------
    获取当前地理位置 转为与微信的api一致, 原api如下:
    外勤365默认使用国测局'gcj02'定位,没有参数控制
    @return {
      "city": "南京市",
      "citycode": "0",
      "district": "秦淮区",
      "wqAddress": "江苏省南京市",
      "street": "应天大街388号",
      "loctime": "2015-09-22 17:31:25",
      "province": "江苏省",
      "wqLongitude": 118.787027,
      "wqLatitude": 32.007889,
      "radius": 40.25990676879883,
      "mokelocation": false
    }
  ----------------------------------------------------- */
  getLocation: function (params = {}) {
    self = this
    // 先从cookie中读取位置信息
    let appLocation = DB.getCookie('app_location')
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
    console.log('调用cordova定位...')
    // 调用定位
    // eslint-disable-next-line
    wq.wqlocation.getLocationBackground((res) => {
      if (res && res.wqLatitude) {
        let result = res
        // 对结果进行格式化
        result.latitude = res.wqLatitude
        result.longitude = res.wqLongitude
        result.point = [res.wqLongitude, res.wqLatitude]
        // result.speed = null
        result.accuracy = res.radius
        result.address = res.wqAddress
        // result.country = '中国'
        // result.province = res.province
        // result.city = res.city
        // result.district = res.district
        // result.street = res.street
        result.fake = res.mokelocation === 'true' || res.mokelocation === true
        // 将位置信息存储到cookie中60秒
        if (params.cacheTime)
          DB.setCookie(
            'app_location',
            JSON.stringify(res),
            !isNaN(params.cacheTime) ? Number(params.cacheTime) : 60000
          )
        if (params.success) params.success(result)
        self.getLocationTask(result)
      } else {
        let res = {
          errMsg: `getLocation:fail${locale(
            '定位失败,请检查定位权限是否开启',
            'hint_location_failed'
          )}`
        }
        if (params.fail) params.fail(res)
        else
          Toast.show({
            content: locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed')
          })
        self.getLocationTask(res)
      }
    }, JSON.stringify({ locationType: '1' })) // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
  },
  /* -----------------------------------------------------
    获取当前地理位置带地图 转为与微信的api一致, 原api如下:
    外勤365默认使用国测局'gcj02'定位, 没有参数控制
    @params {editable: '是否可以标记位置, 1可标记', latlng: '经纬度,只在editable为0时生效', title: '标题, 可不传'}
    @return {
      "city": "南京市",
      "citycode": "0",
      "district": "秦淮区",
      "wqAddress": "江苏省南京市",
      "street": "应天大街388号",
      "loctime": "2015-09-22 17:31:25",
      "province": "江苏省",
      "wqLongitude": 118.787027,
      "wqLatitude": 32.007889,
      "radius": 40.25990676879883,
      "mokelocation": false,
      "poiname":""
    }
  ----------------------------------------------------- */
  getLocationMap: function (params = {}) {
    self = this
    // eslint-disable-next-line
    wq.wqlocation.getLocationMap((res) => {
      if (res && res.wqLatitude) {
        let result = res
        // 对结果进行格式化
        result.latitude = res.wqLatitude
        result.longitude = res.wqLongitude
        result.point = [res.wqLongitude, res.wqLatitude]
        // result.speed = null
        result.accuracy = res.radius
        result.address = res.poiname || res.wqAddress
        // result.country = '中国'
        // result.province = res.province
        // result.city = res.city
        // result.district = res.district
        // result.street = res.street
        result.fake = res.mokelocation === 'true' || res.mokelocation === true
        if (params.success) params.success(result)
      } else {
        if (params.fail)
          params.fail({
            errMsg: `getLocationMap:fail${locale(
              '定位失败, 请检查外勤365定位权限是否开启',
              'hint_location_map_failed'
            )}`
          })
        else
          Toast.show({
            content: locale('定位失败, 请检查外勤365定位权限是否开启', 'hint_location_map_failed')
          })
      }
    }, JSON.stringify(Object.assign({ editable: '1' }, params))) // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
  },
  /**
    * 拍照、本地选图
    * @param {Object} params
    * {
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      isAI: '1',
      validate: 0,// 0：不校验，1：货架陈列，2：冰箱，3：端架陈列，4：地堆，5：割箱
      watermark: {
        photoType: '标题',
        customerName: '客户',
        submitName: '提交人',
        cmLocation: '31.982473, 118.730515',
        isAiPicCheck: '1' // AI识别的图片
      },
      success({localIds:[src]})
    * }
    */
  chooseImage: function (params) {
    let chooseParams = Object.clone(params)
    if (params.isAI !== '1') delete chooseParams.isAI
    // 格式化sourceType
    let operation = '2'
    if (params && params.sourceType) {
      if (params.sourceType.indexOf('album') >= 0 && params.sourceType.indexOf('camera') >= 0) {
        operation = '2'
      } else if (params.sourceType.indexOf('album') >= 0) {
        operation = '1'
      } else {
        operation = '0'
      }
      chooseParams.operation = operation
      delete chooseParams.sourceType
    }
    // 格式化sizeType
    let pwidth = null
    if (params && params.sizeType) {
      if (!isNaN(params.sizeType)) {
        pwidth = params.sizeType
      } else if (params.sizeType.indexOf('compressed') >= 0) {
        pwidth = '750'
      }
    }
    if (params.width && !isNaN(params.width) && Number(params.width) > 0) {
      pwidth = params.width
    }
    if (pwidth) {
      chooseParams.pwidth = pwidth
      delete chooseParams.sizeType
    }
    // 格式化count
    let max = 5
    if (params && params.count) {
      max = params.count
      chooseParams.max = '' + max
      delete chooseParams.count
    }
    // success
    if (chooseParams.success) {
      delete chooseParams.success
    }
    // fail
    if (chooseParams.fail) {
      delete chooseParams.fail
    }
    // viewId 临时目录,不能重复
    chooseParams.viewId = '' + new Date().getTime()
    // 水印相关: photoType | customerName | submitName | cmLocation | isAiPicCheck | selectItems
    if (params.watermark) {
      if (params.watermark.photoType) chooseParams.photoType = params.watermark.photoType
      if (params.watermark.customerName) chooseParams.customerName = params.watermark.customerName
      if (params.watermark.submitName) chooseParams.submitName = params.watermark.submitName
      if (params.watermark.cmLocation) chooseParams.cmLocation = params.watermark.cmLocation
      if (params.watermark.isAiPicCheck) chooseParams.isAiPicCheck = params.watermark.isAiPicCheck
      if (params.watermark.selectItems) chooseParams.selectItems = params.watermark.selectItems
      delete chooseParams.watermark
    }
    if (!isNaN(params.validate)) {
      chooseParams.validate = params.validate || 0
    }
    if (!isNaN(params.scene)) {
      chooseParams.scene = params.scene || 0
    }
    console.log('外勤cordova内核chooseImage', chooseParams)
    // eslint-disable-next-line
    wq.wqphoto.getPhoto(
      (result) => {
        if (params && params.success) {
          // 格式化返回结果
          let res = {
            sourceType: operation === '0' ? 'camera' : 'album',
            errMsg: 'chooseImage:ok',
            localIds: result.map((item) => {
              return item.src
            }),
            originRes: result
          }
          params.success(res)
        }
      },
      null,
      JSON.stringify(chooseParams)
    )
  },
  /**
    * 照片上传
    * @param {Object} params
    * {
      uploadDir: '目录/年月',
      tenantId: ''
      localId: 'src',
      success: func(res)
    * }
    */
  uploadImage: function (params = {}) {
    self = this
    if (!params.uploadDir) {
      Toast.show({ content: locale('没有上传目录', 'hint_no_upload_dir') })
      return
    }
    if (!params.localId || Object.isEmptyObject(params.localId)) {
      Toast.show({ content: locale('没有上传地址', 'hint_no_upload_localeid') })
      return
    }
    let filePathList = [
      {
        path: params.localId
      }
    ]
    if (params.ext && params.ext.isAutoCheck === '1') {
      filePathList = [
        {
          isAI: '1',
          path: params.localeId
        }
      ]
    }

    // ext参数: isAutoCheck: '0'/'1'是否自动识别|cmId: 客户Id|appId：应用Id|menuId: 菜单Id(必填)|funcId: 表单Id
    let menuId = Device.getUrlParameter('menuId') || ''
    // 格式化params
    let uploadParams = {
      filePathList: filePathList,
      url: params.uploadDir,
      ext: {
        menuId: menuId,
        ...(params.ext || {})
      }
    }
    if (params.tenantId) uploadParams.tenantId = params.tenantId
    console.log('外勤Cordova内核上传', uploadParams)
    wq.wqphoto.startUpload(JSON.stringify(uploadParams)) // eslint-disable-line
    // 截取路径
    let serverId = params.localId.substring(
      params.localId.lastIndexOf('/') + 1,
      params.localId.length
    )
    if (params.success) {
      params.success({
        errMsg: 'uploadImage:ok',
        path: `${params.uploadDir}/${serverId}`, // 前后不带/, 并且不带企业参数的上传路径
        serverId: serverId,
        tenantId: params.tenantId
      })
    }
  },
  /**
   * 图片预览
   * @param {Object} params
   * {
   * urls:[],
   * current:'当前显示的资源序号或者当前资源的url链接',
   * }
   */
  previewImage: function (params) {
    self = this
    if (!params.urls || !params.urls.length) {
      Toast.show({ content: locale('没有预览图片地址', 'hint_preview_image_must_urls') })
      return
    }
    // 格式化index
    let position = 0
    if (params && params.index) position = params.index
    if (typeof params.current === 'number') {
      position = params.current
    } else if (typeof params.current === 'string') {
      for (let [index, source] of params.urls.entries()) {
        if (source.src === params.current) position = index
      }
    }
    // 格式化urls
    let photos = []
    if (params && params.urls && params.urls.length) {
      photos = params.urls.map((item) => {
        return {
          path: item
        }
      })
    }
    let previewParams = {
      position: position,
      photos: photos
    }
    wq.wqphoto.photoPreview(JSON.stringify(previewParams)) // eslint-disable-line
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
  uploadFile: function (params = {}) {
    self = this
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      Toast.show({
        content: locale('此功能需要升级至6.6.0及以上的客户端', 'hint_upload_file_version')
      })
      return
    }
    if (!params.localId) {
      Toast.show({ content: locale('没有上传地址', 'hint_no_upload_localeid') })
      return
    }
    let localIds = params.localId.split(':')
    if (localIds.length !== 2) {
      Toast.show({ content: locale('localeId错误', 'hint_error_localeid') })
      return
    }
    window.wq.wqio.uploadFile(
      JSON.stringify({
        // 拍摄完后开始上传文件
        filePathList: [{ path: params[1], fileAlias: params[0] }],
        url: params.uploadDir
      })
    )
    setTimeout(() => {
      if (params.success)
        params.success({
          errMsg: 'uploadFile:ok',
          filePath: params[1],
          fileName: params[0]
        })
    }, 3000)
  },
  /**
    * 选择、录制视频
    * @param {Object} params
    * {
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      maxDuration: 60, // 最大录相时长
      camera: 'back', // back || front，默认拉起的是前置或者后置摄像头。非必填，默认back
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success({localIds:[src]})
    * }
    */
  chooseVideo: function (argParams = {}) {
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      Toast.show({
        content: locale('此功能需要升级至6.6.0及以上的客户端', 'hint_choose_video_version')
      })
      return
    }
    window.wq.wqphoto.getVideo(
      (res) => {
        res.localIds = [res.tempPath]
        // 标准化回调参数: 将tempFilePath改为localId
        if (res.path) {
          res.localIds = [res.name + ':' + res.path]
        }
        if (argParams.success) argParams.success(res)
      },
      null,
      JSON.stringify({ maxtime: argParams.maxDuration || 10 })
    )
  },
  /* -----------------------------------------------------
    人员插件
    @params {success: fn}
  ----------------------------------------------------- */
  getContactMore: function (params = {}) {
    // {selectedIds: 'id,id', aclType: '0只能看到下属 不传或者其他的参数为全部人员,默认为空', success([{id: '', name: ''}])}
    // eslint-disable-next-line
    wq.wqcontact.getContactMore(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getContact: function (params = {}) {
    // eslint-disable-next-line
    wq.wqcontact.getContact((args) => {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    客户插件
    dms_type说明,DMS需要的客户选择接口类型:
    【1】当前用户所属的经销商的下级终端+直属下级经销商(经销商:销售订单、发货单确认、回单确认) ；
    【2】自己是客户经理的经销商(业代:经销商库存盘点、经销商库存查询)；
    【3】自己是客户经理（或者客户经理是自己下属），如果tradeType=3,结果为没有经销商的终端，否则结果为没有上级经销商的经销商（业代：采购订单(又称直营订单)选客户）
    【4】自己是客户经理,且是“终端或有上级的经销商”（业代：销售订单(又称分销订单)选客户）；
    【5】根据dms_type=4选择的客户筛选经销商，需要传dms_cm_id、dms_trade_type参数，如果客户是终端，则选择终端所属的经销商，
    如果客户是经销商，则选择上级经销商(（业代：销售订单(又称分销订单)选供货商）)。
    【6】获取当前人所属的经销商的上级经销商
    setEmployeeId: '1'自动补充semployeeId
  ----------------------------------------------------- */
  getCustomerMore: function (params = {}) {
    // {isonline: '1.在线0.离线', selectedIds: 'id,id', setEmployeeId: '1', tradeType: '1客户 2经销商 3门店,默认1', superTradeType: '2经销商,指门店上级经销商默认无', hiddenAdd: '隐藏添加按钮,默认false', dms_type: 'dms类型', success([{id: '', name: ''}])}
    // eslint-disable-next-line
    wq.wqcustomer.getCustomerMore(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(Object.assign({ hiddenAdd: true }, params)))
  },
  getCustomer: function (params = {}) {
    // eslint-disable-next-line
    wq.wqcustomer.getCustomer(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(Object.assign({ hiddenAdd: true }, params)))
  },
  getCustomerType: function (params = {}) {
    // {id: 'id', name: 'name', success({id: '', name: ''})}
    // eslint-disable-next-line
    wq.wqcustomer.getCustomerType(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getCustomerAreaMore: function (params = {}) {
    // {selectedIds: 'id,id', success([{id: '', name: ''}])}
    self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      Toast.show({
        content: locale(
          '此功能需要升级至6.2.2及以上的客户端',
          'hint_get_customer_area_more_version'
        )
      })
      return
    }
    // eslint-disable-next-line
    wq.wqcustomer.getCustomerAreaMore(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getCustomerArea: function (params = {}) {
    // eslint-disable-next-line
    wq.wqcustomer.getCustomerArea(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    部门插件
    @params: {selectedIds: '',success: fn}
  ----------------------------------------------------- */
  getDepartmentMore: function (params = {}) {
    // {selectedIds: 'id,id', success([{id: '', name: ''}])}
    // eslint-disable-next-line
    wq.wqdepartment.getDepartmentMore(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getDepartment: function (params = {}) {
    // eslint-disable-next-line
    wq.wqdepartment.getDepartment(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    单选商品
    @return {
      id: '5343180131602024954',
      name: '商品1',
      propvalues: '', // 商品属性不带排序号
      nameSpec: '', // 规格名称
      productRemarks: '', // 备注
      props: '', // 商品属性介绍
      propDetail: '', // 商品属性详情
      reportUnitName: '', // 报表单位名称
      reportUnitID: '', // 报表单位ID
      reportUnitRatio: '', // 报表单位比率
    }
  ----------------------------------------------------- */
  getGoods: function (params = {}) {
    // eslint-disable-next-line
    wq.wqproduct.wqSelectSingleProduct(function (args) {
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    打开原生窗口
    @params {ios: {url: '', params: {}}, android: {url: '', params: {}}}默认为打开一个webview页面
  ----------------------------------------------------- */
  openNativePage: function (params = { ios: {}, android: {} }) {
    self = this
    if (!params.ios.url) {
      Toast.show({ content: locale('ios参数url不能为空', 'hint_open_native_page_must_ios_url') })
      return
    }
    if (!params.android.url) {
      Toast.show({
        content: locale('android参数url不能为空', 'hint_open_native_page_must_android_url')
      })
      return
    }
    window.wq.wqload.wqOpenCustomerPager({
      androidUIR: params.android.url,
      androidParma: params.android.params,
      IOSViewController: params.ios.url,
      IOSParma: params.ios.params
    })
  }
}

export default Bridge
