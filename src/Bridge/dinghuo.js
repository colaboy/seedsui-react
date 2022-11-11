import DB from './../DB'
import Device from './../Device'
import locale from './../locale'

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'dinghuo',
  init: function (cb) {
    var self = this
    // 注册原生点击购物车、返回按键、直播、返回直接事件, 方便webview中调用
    self.registerHandler([
      'getGoodsByApp',
      'getCartGoodsByApp',
      'onBackPress',
      'setOnlineByApp',
      'reloadByApp'
    ])
    self.invoke('config', { auth: false })
    // 初始化完成回调
    if (typeof cb === 'function') cb()
  },
  /**
   * 统一处理桥接返回结果
   * @param {string} api 桥接名称
   * @param {object} response 返回结果
   * @param {function|object} callback 回调函数
   */
  handler: function (response, callback) {
    if (!callback) return
    if (typeof callback === 'function') {
      callback(response)
      return
    }
    if (typeof callback !== 'object') return
    var msg = response && response.errMsg ? response.errMsg : ''
    if (msg) {
      var index = msg.indexOf(':')
      var res = msg.substring(index + 1)
      switch (res) {
        case 'ok':
          if (callback.success) callback.success(response)
          break
        case 'cancel':
          if (callback.cancel) callback.cancel(response)
          break
        default:
          if (callback.fail) callback.fail(response)
      }
    }
    callback.complete && callback.complete(response)
  },
  // 公共方法，通过桥接调用原生方法公共入口
  invoke: function (name, param, callback) {
    var self = this
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      self.setup(function (bridge) {
        bridge.callHandler(name, param, function (response) {
          if (callback) {
            try {
              callback(JSON.parse(response))
            } catch (e) {
              callback(response)
            }
          }
        })
      })
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      // 注册分类页面事件
      if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(
          name,
          param && JSON.stringify(param),
          function (response) {
            if (callback) {
              try {
                callback(JSON.parse(response))
              } catch (e) {
                callback(response)
              }
            }
          }
        )
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          () => {
            window.WebViewJavascriptBridge.callHandler(
              name,
              param && JSON.stringify(param),
              function (response) {
                if (callback) {
                  try {
                    callback(JSON.parse(response))
                  } catch (e) {
                    callback(response)
                  }
                }
              }
            )
          },
          false
        )
      }
    }
  },
  setup: function (callback) {
    /* eslint-disable */
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    /* eslint-enable */
  },

  // 注册事件
  registerHandler: function (events) {
    var self = this
    if (typeof window !== 'undefined') {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        /* 判断iPhone|iPad|iPod|iOS */
        /* eslint-disable */
        self.setup(function (bridge) {
          events.forEach((eventName) => {
            bridge.registerHandler(eventName, () => {
              const event = new CustomEvent(eventName)
              // 分发事件
              window.dispatchEvent(event)
            })
          })
        })
        /* eslint-enable */
      } else if (/(Android)/i.test(navigator.userAgent)) {
        /* 判断Android */
        // 注册分类页面事件
        if (window.WebViewJavascriptBridge) {
          events.forEach((eventName) => {
            window.WebViewJavascriptBridge.registerHandler(eventName, () => {
              const event = new CustomEvent(eventName)
              // 分发事件
              window.dispatchEvent(event)
            })
          })
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady',
            () => {
              events.forEach((eventName) => {
                window.WebViewJavascriptBridge.registerHandler(eventName, () => {
                  const event = new CustomEvent(eventName)
                  // 分发事件
                  window.dispatchEvent(event)
                })
              })
            },
            false
          )
        }
      }
    }
  },
  // 判断是否是主页
  isHomePage: function (callback) {
    var self = this
    self.invoke('isHomePage', null, function (data) {
      if (data.result.toString() === '1') {
        callback(true)
      } else {
        callback(false)
      }
    })
  },
  // 获得版本信息
  getAppVersion: function () {
    return Device.platformVersion
  },
  // 去首页
  goHome: function (callback) {
    var self = this
    self.invoke('goHome', null, callback)
  },
  // 退出到登陆页面
  logOut: function () {
    var self = this
    self.invoke('logOut')
  },
  // 打开新的窗口
  openWindow: function (params, callback) {
    var self = this
    if (params.url) {
      if (params.url.indexOf('h5:') === 0) params.url = params.url.replace(/^h5:/, '')
      else if (params.url.indexOf('webview:') === 0)
        params.url = params.url.replace(/^webview:/, '')
    }
    self.invoke('openWindow', params, callback)
  },
  // 关闭当前窗
  closeWindow: function (callback) {
    var self = this
    self.invoke('closeWindow', null, callback)
  },
  /**
   * 修改原生标题
   * @param {Object} params {title: '自定义标题', visiable: '0' 隐藏  '1' 展示, left: { show: false 隐藏返回按钮 true 显示返回按钮}}
   * @param {Function} callback 回调
   */
  setTitle: function (params, callback) {
    var self = this
    if (params && params.title) {
      if (typeof params.title === 'string') {
        document.title = params.title
        self.invoke('setTitle', params, callback)
      } else if (typeof params.title === 'function') {
        params.title()
      }
    }
  },
  // 返回监听
  onHistoryBack: function (params, callback) {
    self.invoke('onHistoryBack', params, callback)
  },
  // 客户端添加返回绑定
  addBackPress: function (callback) {
    var self = this
    try {
      self.setBackEnable(true)
      window.addEventListener('onBackPress', callback || self.back)
      // ios客户端返回按钮绑定(ios不支持onBackPress)
      self.addIosBackPress(callback)
    } catch (error) {
      console.log(error)
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function (callback) {
    var self = this
    try {
      self.setBackEnable(false)
      window.removeEventListener('onBackPress', callback || self.back)
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 支付宝支付
   * @param {Object} params {orderInfo: ''}
   * @param {Function} callback
   * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
   */
  alipay: function (params, callback) {
    var self = this
    self.invoke('alipay', params, callback)
  },
  /**
   * 商联支付
   * @param {Object} params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
   * @param {Function} callback 回调
   */
  slopenpay: function (params, callback) {
    var self = this
    self.invoke('slopenpay', params, callback)
  },
  /**
   * 大华捷通支付
   * @param {Object} params {payChannel:'UPPay 云闪付  WXPay微信支付 AliPay 支付宝支付', payData:'服务端获取'}
   * @param {Function} callback 回调
   */
  qmfpay: function (params, callback) {
    var self = this
    // resultCode:
    // 0000 支付请求发送成功,商户订单是否成功支付应该以商户后台收到支付结果
    // 1000 用户取消支付
    // 1001 参数错误
    // 1002 网络连接错误
    // 1003 支付客户端未安装
    // 2001 订单处理中，支付结果未知(有可能已经支付成功)，请通过后台接口查询订单状态
    // 2002 订单号重复
    // 2003 订单支付失败
    // 9999 其他支付错误
    // 5004 版本过低
    if (Device.compareVersion(Device.platformVersion, '2.3.6') < 0) {
      callback({ resultCode: '5004', resultInfo: '{"resultMsg":"请安装2.3.6以上版本"}' })
      return
    }
    self.invoke('qmfpay', params, callback)
  },
  // ios客户端返回按钮绑定, ios不支持addBackPress
  addIosBackPress: function (callback) {
    var self = this
    self.invoke('onHistoryBack', null, () => {
      if (callback) callback()
      else if (self.back) self.back()
      self.addIosBackPress(callback)
    })
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
    var self = this
    self.invoke('shareText', params, callback)
  },
  /**
   * 获取订货包名
   * @param {Function} callback({result: 'cn.com.wq.ordergoods'}), ios包名cn.com.wq.ordergoods, android包名com.waiqin365.dhcloud
   */
  getIdentification: function (callback) {
    var self = this
    if (Device.compareVersion(Device.platformVersion, '2.3.6') < 0) {
      callback({})
      return
    }
    self.invoke('getIdentification', null, callback)
  },
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
  /* 文件是否存在
  isExistsFile({
    "fileName": "ss.txt",
    "size": 200
  }, (result) => {
  // 返回格式 {{"isExists":"","filePath":"","fileName":""}，isExists:'0'不存在，'1'存在
  })
  */
  isExistsFile: function (params, callback) {
    var self = this
    self.invoke('isExistsFile', params, callback)
  },
  /* 附件下载
  downloadFile({
    "id": "id",
    "fileName": "ss.txt",
    "downloadUrl": "http://...",
    "size": 200
  }, (result) => {
  // 返回格式 {{"code":"","filePath":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }) */
  downloadFile: function (params, callback) {
    var self = this
    self.invoke('downloadFile', params, callback)
  },
  /* 附件打开
  openFile（{
    "filePath": ""
  }, (result) => {
  // 返回格式 {{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function (params, callback) {
    var self = this
    self.invoke('openFile', params, callback)
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
    var self = this
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
        url: url || `https://cloud.waiqin365.com/fileupload/v1/doUpload.do?uploadPath=file`,
        filePath: localId,
        name: 'file',
        formData: data,
        ...othersParams
      },
      (response) => {
        self.handler(response, params)
      }
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

    console.log('[SeedsUI 订货]chooseVideo', params)

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
    if (!params) {
      console.warn('[SeedsUI 订货]previewFile:fail没有传入参数')
      return
    }
    var self = this
    self.invoke(
      'openFile',
      {
        filePath: params.url
      },
      (res) => {
        if (res.code === '1') {
          if (params.success)
            params.success({
              errMsg: `previewFile:ok${locale('预览文件成功', 'hint_previewFile_success')}`
            })
        } else {
          if (params.fail) params.fail({ errMsg: `previewFile:fail${res.message}` })
        }
      }
    )
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params) {
    var self = this
    self.invoke('scanQRCode', null, params.success)
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
  getLocation: function (params = {}) {
    var self = this
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
    console.log('调用订货定位...')
    self.invoke('getLocation', params.type || 'gcj02', (res) => {
      if (res && res.latitude) {
        // 将位置信息存储到cookie中60秒
        if (params.cacheTime)
          DB.setCookie(
            'app_location',
            JSON.stringify(res),
            !isNaN(params.cacheTime) ? Number(params.cacheTime) : 60000
          )
        if (params.success) params.success(res)
      } else {
        res.errMsg = { errMsg: 'getLocation:定位失败,请检查订货365定位权限是否开启' }
        if (params.fail) params.fail(res)
        else self.showToast('定位失败,请检查订货365定位权限是否开启', { mask: false })
      }
      self.getLocationTask(res)
    })
  },
  /* -----------------------------------------------------
    获取当前网络状态
    @return {networkType:'返回网络类型2g，3g，4g，wifi'}
  ----------------------------------------------------- */
  getNetworkType: function (callback) {
    var self = this
    self.invoke('getNetworkType', null, callback)
  },
  /**
    * 拍照、本地选图
    * @param {Object} params
    * {
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      watermark: { // 老订货, 新订货使用数组行显示
        orderNo: '编号',
        submitName: '提交人',
        customerName: '客户',
        cmLocation: '31.982473, 118.730515',
        isWaterMark: '1', // 是否启用水印
      },
      success({localIds:['LocalResource://imageid'+id]})
    * }
    */
  chooseImage: function (params) {
    var self = this
    params = params || {}
    if (params.async) {
      // 老客户端选择照片
      console.log('老订货chooseImage', params)
      let chooseParams = {
        count: 1, // 老客户端一次上传多张容易出问题, 所以只允许一次传一张
        sizeType: params.sizeType || ['original', 'compressed'],
        sourceType: params.sourceType || ['album', 'camera']
      }
      if (
        Object.prototype.toString.call(params.watermark) === '[object Object]' &&
        params.watermark.isWaterMark === '1'
      ) {
        if (params.watermark.orderNo) chooseParams.orderNo = params.watermark.orderNo // 编号
        if (params.watermark.submitName) chooseParams.submitName = params.watermark.submitName // 提交人
        if (params.watermark.customerName) chooseParams.customerName = params.watermark.customerName // 客户
        if (params.watermark.cmLocation) chooseParams.cmLocation = params.watermark.cmLocation // 偏差
        chooseParams.isWaterMark = '1'
      }
      self.invoke('chooseImage', chooseParams, function (res) {
        if (!res) res = {}
        if (!res.localIds) res.localIds = []
        res.localIds = res.localIds.map(function (id) {
          return 'LocalResource://imageid' + id
        })
        if (Array.isArray(res.localIds) && res.localIds.length) {
          if (params.success) params.success(res)
        } else if (Array.isArray(res.localIds) && res.localIds.length === 0) {
          if (params.cancel) params.cancel({ errMsg: 'chooseImage:cancel' })
        } else {
          if (params.fail) params.fail({ errMsg: 'chooseImage:fail' })
        }
      })
    } else {
      // 新客户端选择照片
      console.log('新订货chooseImage', params)
      self.invoke(
        'chooseImage',
        {
          scene: '1|2',
          count: params.count || 9,
          sizeType: params.sizeType || ['original', 'compressed'],
          sourceType: params.sourceType || ['album', 'camera'],
          watermark: params.watermark || [],
          width: params.width || 1024,
          isSaveToAlbum: params.isSaveToAlbum || 1,
          isAI: params.isAI || 0,
          validate: params.validate || 0,
          sceneValidate: params.sceneValidate || 0,
          direction: params.direction || ''
        },
        (response) => {
          self.handler(response, params)
        }
      )
    }
  },
  /**
    * 照片上传, ios测试环境无法上传
    * @param {Object} params
    * {
      uploadDir: '目录/年月',
      tenantId: 'ios必传'
      localId: 'localId',
      success: func(res)
    * }
    */
  uploadImage: function (params) {
    var self = this
    params = params || {}
    if (!params.uploadDir) {
      if (params.fail)
        params.fail({ errMsg: 'uploadImage:fail' + locale('没有上传目录', 'hint_no_upload_dir') })
      return
    }
    if (typeof params.localId !== 'string' || !params.localId) {
      if (params.fail)
        params.fail({
          errMsg: 'uploadImage:fail' + locale('没有上传地址', 'hint_no_upload_localeid')
        })
      return
    }
    // 上传不能包含'LocalResource://imageid'
    if (params.localId.indexOf('LocalResource://imageid') !== -1) {
      params.localId = params.localId.replace(/LocalResource:\/\/imageid/gim, '')
    }
    // ios判断: navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
    if (params.async) {
      // 老客户端使用异步上传
      console.log('老订货客户端异步上传', params)
      // 安卓没有回调, ios回调返回{result: true}
      if (params.success) {
        params.success({
          errMsg: 'uploadImage:ok',
          path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
          serverId: params.localId,
          tenantId: params.tenantId || ''
        })
      }
      // 旧客户端上传完成后将会删除, 所以延迟上传, 以保证页面显示正确
      setTimeout(() => {
        self.invoke('uploadImage', {
          uploadDir: params.uploadDir,
          tenantId: params.tenantId || '',
          localIds: [params.localId]
        })
      }, 1000)
    } else {
      // 新客户端同步上传
      console.log('新订货客户端同步上传', params)
      // ext参数: isAutoCheck: '0'/'1'是否自动识别|cmId: 客户Id|appId：应用Id|menuId: 菜单Id(必填)|funcId: 表单Id
      let menuId = Device.getUrlParameter('menuId') || ''
      let ext = params.ext || {}
      if (menuId) {
        ext = {
          menuId: menuId,
          ...(params.ext || {})
        }
      }
      self.invoke(
        'uploadImage',
        {
          tenantId: params.tenantId || '',
          uploadDir: params.uploadDir || '',
          fileName: params.fileName || '',
          localId: params.localId,
          isShowProgressTips: 0 == params.isShowProgressTips ? 0 : 1, // eslint-disable-line
          ext: ext
        },
        (response) => {
          if (response.errMsg.indexOf('uploadImage:ok') !== -1) {
            response = {
              errMsg: 'uploadImage:ok',
              path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
              serverId: response.serverId,
              tenantId: params.tenantId
            }
          }
          self.handler(response, params)
        }
      )
    }
  },
  /**
   * 图片预览
   * @param {Object} params
   * {
   * urls:['本地照片需要加上LocalResource://imageid'],
   * current:'当前显示图片地址',
   * index:'当前显示图片索引'
   * }
   */
  previewImage: function (params) {
    var self = this
    params = params || {}
    if (!params.urls || !params.urls.length) {
      if (params.fail)
        params.fail({
          errMsg: 'previewImage:fail' + locale('没有预览图片地址', 'hint_preview_image_must_urls')
        })
      return
    }
    self.invoke('previewImage', params)
  },
  /* -----------------------------------------------------
    监听/取消监听物理返回事件(仅android)
    @params true:监听 | false:取消监听
  ----------------------------------------------------- */
  setBackEnable: function (flag) {
    var self = this
    if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      self.invoke('setBackEnable', flag)
    }
  },
  // 获取图片前缀
  getImagePrefix: function () {
    return 'LocalResource://imageid'
  },
  // 下载图片
  downloadImage: function () {},
  // 分享给朋友
  onMenuShareAppMessage: function () {},
  // 分享到朋友圈
  onMenuShareTimeline: function () {},
  // 获取登陆信息
  loginInfo: function (callback) {
    var self = this
    self.invoke('getLoginInfo', null, callback)
  },
  // 根据key获取登陆信息
  getLoginInfo(key, callback) {
    var self = this
    self.loginInfo(function (result) {
      callback(result[key])
    })
  },
  // 获取系统参数
  systemParameter(callback) {
    var self = this
    self.invoke('getSystemParameter', null, callback)
  },
  // 修改原生角标
  changeBadgeNum: function (count) {
    var self = this
    self.invoke('setBadgeNum', { key: count })
  }
}

export default Bridge
