let self = null

let Bridge = {
  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    const { type, success, fail, complete, ...otherParams } = params || {}
    self = this
    // 调用定位
    if (self.locationTask) {
      self.locationTask.push(params)
      return
    }
    self.locationTask = []
    console.log('调用支付宝定位...', params)
    window.top.wx.getLocation({
      ...otherParams,
      type: '2',
      success: (res) => {
        if (res.longitude && res.latitude) {
          if (success) success(res)
        } else {
          if (fail) fail(res)
        }
        self.getLocationTask(res)
      },
      fail: (res) => {
        if (fail) fail(res)
        self.getLocationTask(res)
      },
      complete: (res) => {
        if (complete) complete(res)
      }
    })
  },
  /**
   * 扫码
   * @param {Object} params
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  scanQRCode(params = {}) {
    const { needResult, scanType, desc, success, ...othersParams } = params || {}

    window.top.wx.scan({
      success: function (res) {
        success && success({ resultStr: res.code })
      },
      ...othersParams
    })
  }
}

export default Bridge
