import DB from './../DB'
import Device from './../Device'

var self = null

var Bridge = {
  /**
   * 定制功能
   */
  platform: Device.platform,
  // 自定义操作
  invoke: function (api, params, callback) {
    /* eslint-disable */
    if (!top.wx.invoke) {
      console.log('没有wx.invoke的方法')
      return
    }
    top.wx.invoke(api, params, function (res) {
      callback && callback(res)
    })
    /* eslint-enable */
  },
  // 获得版本信息
  getAppVersion: function () {
    return Device.platformVersion
  },
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作')
  },
  // 打开新的窗口
  openWindow: function (params = {}) {
    if (params.url) window.location.href = params.url
  },
  // 关闭窗口
  closeWindow: function () {
    top.wx.closeWindow() // eslint-disable-line
  },
  // 防止返回事件叠加绑定
  monitorBack: null,
  // 客户端返回绑定
  addBackPress: function (callback) {
    self = this
    if (callback) self.monitorBack = callback
    else self.monitorBack = null
    // eslint-disable-next-line
    if (top.wx.onHistoryBack) {
      // eslint-disable-next-line
      top.wx.onHistoryBack(function () {
        if (self.monitorBack) self.monitorBack()
        else self.back()
        self.addBackPress(self.monitorBack)
        return false
      })
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    self = this
    self.monitorBack = null
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
    console.log('调用微信定位...')
    // eslint-disable-next-line
    top.wx.getLocation({
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: params.type || 'gcj02',
      success: (res) => {
        // 将位置信息存储到cookie中60秒
        if (res.longitude && res.latitude) {
          if (params.cacheTime) DB.setCookie('app_location', JSON.stringify(res), !isNaN(params.cacheTime) ? Number(params.cacheTime) : 60000)
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
  scanQRCode(params = {}) {
    // eslint-disable-next-line
    top.wx.scanQRCode({
      needResult: params.needResult || 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: params.scanType || ['qrCode', 'barCode'],
      desc: params.desc || '二维码／条码',
      success: function (res) {
        if (!params.success) return
        var wxRes = res
        // 如果没有设置prefix为false或者空,则清除前缀
        if (!params.prefix) {
          if (res.resultStr.indexOf('QR,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('QR,'.length)
          } else if (res.resultStr.indexOf('EAN_13,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('EAN_13,'.length)
          } else if (res.resultStr.indexOf('EAN_8,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('EAN_8,'.length)
          } else if (res.resultStr.indexOf('AZTEC,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('AZTEC,'.length)
          } else if (res.resultStr.indexOf('DATAMATRIX,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('DATAMATRIX,'.length)
          } else if (res.resultStr.indexOf('UPCA,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('UPCA,'.length)
          } else if (res.resultStr.indexOf('UPCE,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('UPCE,'.length)
          } else if (res.resultStr.indexOf('CODABAR,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODABAR,'.length)
          } else if (res.resultStr.indexOf('CODE_39,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_39,'.length)
          } else if (res.resultStr.indexOf('CODE_93,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_93,'.length)
          } else if (res.resultStr.indexOf('CODE_128,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_128,'.length)
          } else if (res.resultStr.indexOf('ITF,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('ITF,'.length)
          } else if (res.resultStr.indexOf('MAXICODE,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('MAXICODE,'.length)
          } else if (res.resultStr.indexOf('PDF_417,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('PDF_417,'.length)
          } else if (res.resultStr.indexOf('RSS_14,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('RSS_14,'.length)
          } else if (res.resultStr.indexOf('RSSEXPANDED,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('RSSEXPANDED,'.length)
          }
        }
        // 回调
        params.success(wxRes)
      },
      fail: function (res) {
        if (params.fail) params.fail(res)
      },
      cancel: function (res) {
        if (params.cancel) params.cancel(res)
      },
      complete: function (res) {
        if (params.complete) params.complete(res)
      }
    })
  },
  chooseImage: function (params) {
    top.wx.chooseImage(params) // eslint-disable-line
  },
  uploadImage: function (params) {
    top.wx.uploadImage(params) // eslint-disable-line
  },
  previewImage: function (params) {
    top.wx.previewImage(params) // eslint-disable-line
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
    top.wx.previewFile(params) // eslint-disable-line
  }
}

export default Bridge
