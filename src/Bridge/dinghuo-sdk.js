var DinghuoJSBridge = {
  /**
   * 存放事件和对应的处理方法
   */
  handles: {},
  /**
   * 订阅事件
   * @param {string} type 事件类型
   * @param {function} handle 事件处理
   */
  on: function (type, handle) {
    if (!this.handles[type]) {
      this.handles[type] = []
    }
    this.handles[type].push(handle)
  },
  /**
   * 触发事件
   */
  emit: function () {
    // 通过传入参数获取事件类型
    var type = Array.prototype.shift.call(arguments)
    if (!this.handles[type]) {
      return false
    }
    for (var i = 0; i < this.handles[type].length; i++) {
      var handle = this.handles[type][i]
      // 执行事件
      handle.apply(this, arguments)
    }
  },
  /**
   * 自定义调用系统桥接
   * @param {string} api 桥接名称
   * @param {object} params 该桥接所需的参数
   * @param {function} callback 回调函数
   */
  invoke(api, params, callback) {
    var self = this
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      self.setup(function (bridge) {
        bridge.callHandler(api, params, function (response) {
          if (typeof callback === 'object') {
            self.handler(api, response, callback)
          } else {
            callback && callback.call(this, response)
          }
        })
      })
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      /* eslint-disable */
      self.connectJsBridge(function (bridge) {
        bridge.callHandler(api, params && JSON.stringify(params), function (response) {
          if (typeof callback === 'object') {
            self.handler(api, response && eval('(' + response + ')'), callback)
          } else {
            callback && callback.call(this, response && eval('(' + response + ')'))
          }
        })
      })
      /* eslint-enable */
    }
  },
  trigger(api, callback) {
    var self = this
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      self.setup(function (bridge) {
        bridge.registerHandler(api, function (response) {
          alert(JSON.stringify(response))
          if (typeof callback === 'object') {
            self.handler(api, response, callback)
          } else {
            callback && callback.call(this, response)
          }
        })
      })
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      /* eslint-disable */
      self.connectJsBridge(function (bridge) {
        bridge.registerHandler(api, function (response) {
          if (typeof callback === 'object') {
            self.handler(api, response && eval('(' + response + ')'), callback)
          } else {
            callback && callback.call(this, response && eval('(' + response + ')'))
          }
        })
      })
      /* eslint-enable */
    }
  },
  /**
   * ios下加载桥接方法
   * @param {function} callback
   */
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
  /**
   * android下加载桥接方法
   * @param {function} callback 回调函数
   */
  connectJsBridge: function (callback) {
    /* eslint-disable */
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(WebViewJavascriptBridge)
        },
        false
      )
    }
    /* eslint-enable */
  },
  /**
   * 统一处理桥接返回结果
   * @param {string} api 桥接名称
   * @param {object} response 返回结果
   * @param {function|object} callback 回调函数
   */
  handler(api, response, callback) {
    let msg = response.errMsg
    let index = msg.indexOf(':')
    let res = msg.substring(index + 1)
    switch (res) {
      case 'ok':
        callback.success && callback.success(response)
        break
      case 'cancel':
        callback.cancel && callback.cancel(response)
        break
      default:
        callback.fail && callback.fail(response)
    }
    callback.complete && callback.complete(response)
  },
  /**
   * 鉴权接口
   * @param {object} params 鉴权所需参数
   */
  config: function (params) {
    let self = this
    self.invoke(
      'config',
      Object.assign(
        {
          appId: '',
          timestamp: '',
          nonceStr: '',
          signature: '',
          jsApiList: []
        },
        params
      ),
      function (res) {
        if (res.errMsg === 'config:ok') {
          self.emit('ready', res)
        } else {
          self.emit('error', res)
        }
      }
    )
  },
  /**
   * 通过ready接口处理成功验证
   * @param {function} callback
   */
  ready: function (callback) {
    let self = this
    self.on('ready', function (res) {
      callback && callback.call(self, res)
    })
  },
  /**
   * 通过error接口处理失败验证
   * @param {function} callback
   */
  error: function (callback) {
    let self = this
    self.on('error', function (res) {
      callback && callback.call(self, res)
    })
  },
  /**
   * 打开新的窗口
   * @param {object} params 参数
   * @prop {string} title 窗口标题
   * @prop {string} url 页面的url
   */
  openWindow: function (params) {
    ;(params = params || {}),
      this.invoke(
        'openWindow',
        {
          title: params.title || '',
          url: params.url
        },
        params
      )
  },
  /**
   * 关闭当前窗
   * @param {object} params
   */
  closeWindow: function (params) {
    ;(params = params || {}), this.invoke('closeWindow', {}, params)
  },
  /**
   * 监听页面返回事件
   * @param {object} params
   */
  onHistoryBack: function (params) {
    ;(params = params || {}), this.invoke('onHistoryBack', {}, params)
  },
  /**
   * 修改页面title
   * @param {object} params
   */
  setTitle: function (params) {
    ;(params = params || {}), this.invoke('setTitle', params)
  },
  /**
   * 扫描二维码并返回结果
   * @param {object} params
   */
  scanQRCode: function (params) {
    ;(params = params || {}),
      this.invoke(
        'scanQRCode',
        {
          desc: params.desc || '',
          needResult: params.needResult || 0,
          scanType: params.scanType || ['qrCode', 'barCode']
        },
        params
      )
  },
  /**
   * 获取地理位置接口
   * @param {object} params
   */
  getLocation: function (params) {
    ;(params = params || {}),
      this.invoke(
        'getLocation',
        {
          type: params.type || 'gcj02'
        },
        (function () {
          return (
            (params._complete = function (params) {
              delete params.type
            }),
            params
          )
        })()
      )
  },
  /**
   * 使用内置地图查看位置接口
   * @param {object} params
   */
  openLocation: function (params) {
    this.invoke(
      'openLocation',
      {
        latitude: params.latitude,
        longitude: params.longitude,
        name: params.name || '',
        address: params.address || '',
        scale: params.scale || 16
      },
      params
    )
  },
  /**
   * 拍照或从手机相册中选图接口
   * @param {object} params
   */
  chooseImage: function (params) {
    // 兼容android 668版本照片校验问题
    var m = navigator.userAgent.match(/WqAppVersion\/([\w.]*)/)
    if (m && m[1] && m[1] === '6.6.8') {
      if (
        (params.isAI !== '1' && params.isAI !== 1) ||
        params.validate === 1 ||
        params.validate === '1'
      ) {
        params.validate = 6
      }
    }
    this.invoke(
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
        direction: String(params.direction || 0),
        realTimeRecognition: params.realTimeRecognition || 0
      },
      params
    )
  },
  /**
   * 预览图片接口
   * @param {object} params
   */
  previewImage: function (params) {
    this.invoke(
      'previewImage',
      {
        current: params.current,
        urls: params.urls
      },
      params
    )
  },
  /**
   * 上传图片接口
   * @param {object} params
   */
  uploadImage: function (params) {
    this.invoke(
      'uploadImage',
      {
        tenantId: params.tenantId || '',
        uploadDir: params.uploadDir || '',
        fileName: params.fileName || '',
        localId: params.localId,
        isShowProgressTips: 0 == params.isShowProgressTips ? 0 : 1,
        ext: params.ext || {}
      },
      params
    )
  },
  /**
   * 下载图片接口
   * @param {object} params
   */
  downloadImage: function (params) {
    this.invoke(
      'downloadImage',
      {
        serverId: params.serverId,
        isShowProgressTips: 0 == params.isShowProgressTips ? 0 : 1
      },
      params
    )
  },
  /**
   * 获取本地图片接口
   * @param {object} params
   * @prop {string} localId 本地图片名称
   */
  getLocalImgData: function (params) {
    this.invoke(
      'getLocalImgData',
      {
        localId: params.localId
      },
      params
    )
  },
  /**
   * 预览文件接口
   * @param {object} params
   * @prop {string} url 需要预览文件的地址
   * @prop {string} name 需要预览文件的文件名（不填的话截取url的最后部分）
   * @prop {number} size 需要预览文件的字节大小
   * @example
   * wq.previewFile({
   *    url: 'http://www.waiqin365.com/p/v3/assets/bannerbg7.png',
   *    name: '外勤365.png',
   *    size: 15312
   * })
   */
  previewFile: function (params) {
    ;(params = params || {}), this.invoke('previewFile', params, params)
  },
  /**
   * 开始录音接口
   * @param {object} params
   */
  startRecord: function (params) {
    ;(params = params || {}), this.invoke('startRecord', params, params)
  },
  /**
   * 停止录音接口
   * @param {object} params
   */
  stopRecord: function (params) {
    ;(params = params || {}), this.invoke('stopRecord', {}, params)
  },
  /**
   * 监听录音自动停止接口
   * @param {*} callback
   */
  onVoiceRecordEnd: function (params) {
    this.trigger('onVoiceRecordEnd', params)
  },
  /**
   * 播放语音接口
   * @param {object} params
   */
  playVoice: function (params) {
    this.invoke(
      'playVoice',
      {
        localId: params.localId
      },
      params
    )
  },
  /**
   * 暂停播放接口
   * @param {object} params
   */
  pauseVoice: function (params) {
    this.invoke(
      'pauseVoice',
      {
        localId: params.localId
      },
      params
    )
  },
  /**
   * 停止播放接口
   * @param {object} params
   */
  stopVoice: function (params) {
    this.invoke(
      'stopVoice',
      {
        localId: params.localId
      },
      params
    )
  },
  /**
   * 监听语音播放完毕接口
   * @param {object} params
   */
  onVoicePlayEnd: function (params) {
    this.trigger('onVoicePlayEnd', params)
  },
  /**
   * 上传语音接口
   * @param {object} params
   */
  uploadVoice: function (params) {
    this.invoke(
      'uploadVoice',
      {
        localId: params.localId,
        url: params.url,
        name: params.name,
        formData: params.formData,
        isShowProgressTips: 0 == params.isShowProgressTips ? 0 : 1
      },
      params
    )
  },
  /**
   * 下载语音接口
   * @param {object} params
   */
  downloadVoice: function (params) {
    this.invoke(
      'downloadVoice',
      {
        serverId: params.serverId,
        isShowProgressTips: 0 == params.isShowProgressTips ? 0 : 1
      },
      params
    )
  },
  /**
   * 文字识别
   * @param {object} params
   */
  getOCR: function (params) {
    this.invoke(
      'getOCR',
      {
        width: params.width,
        height: params.height,
        type: params.type
      },
      params
    )
  }
}
export default DinghuoJSBridge
