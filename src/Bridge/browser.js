import DB from './../DB'
import Device from './../Device'
import Preview from './../Preview/instance.js'
import MediaUtil from './../MediaUtil'
import FullScreen from './../FullScreen'
import locale from './../locale'

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'browser',
  // 初始化配置
  config: function (params = {}) {
    var self = this
    if (params.debug) self.debug = params.debug
    if (!self.debug) {
      console.log('config方法仅在微信上工作')
      return
    }
    if (params.success) params.success()
  },
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作')
  },
  // 回到主页
  goHome: function () {
    window.history.go(-1)
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
  // 视频播放
  previewVideo: function (params = {}) {
    var target = document.getElementById('seedsui_preview_video')
    if (!target) {
      target = MediaUtil.video(params.src)
      target.id = 'seedsui_preview_video'
      target.style = 'position:absolute;top:-1000px;left:-1000px;width:100;height:100px;'
      document.body.appendChild(target)
    }
    if (target) {
      FullScreen.enter(target)
      setTimeout(() => {
        target.play()
      }, 500)
    }
  },
  /* -----------------------------------------------------
    图片插件
  ----------------------------------------------------- */
  // 拍照、本地选图
  chooseImage: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在微信或APP中使用', 'hint_only_app_and_wx'), { mask: false })
      return
    }
    var res = {
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
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在微信或APP中使用', 'hint_only_app_and_wx'), { mask: false })
      return
    }
    self.showLoading()
    setTimeout(() => {
      self.hideLoading()
      self.showToast(locale('上传完成', 'uploaded_completed'), { mask: false })
      var res = {
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
    var self = this
    if (!params.urls || !params.urls.length) {
      if (params.fail)
        params.fail({
          errMsg: 'previewImage:fail' + locale('没有预览图片地址', 'hint_preview_image_must_urls')
        })
      return
    }
    var src = params.urls[params.index || 0]
    if (!src) {
      if (params.fail)
        params.fail({ errMsg: 'previewImage:fail' + locale('图片地址无效', 'invalid_image_src') })
      return
    }
    var layerHTML = params.layerHTML || ''
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
              errMsg: 'previewImage:fail' + locale('图片地址无效', 'invalid_image_src')
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
  /* -----------------------------------------------------
    视频插件
  ----------------------------------------------------- */
  // debug:录像
  chooseVideo: function (params = {}) {
    console.log('chooseVideo方法在浏览器上无法运行')
    var res = {
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
  /* -----------------------------------------------------
    人员插件
  ----------------------------------------------------- */
  getContactMore: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success([
        {
          id: '4655721687632479006',
          name: '员工1'
        },
        {
          id: '4655721687632479007',
          name: '员工2'
        }
      ])
  },
  getContact: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success({
        id: '4655721687632479006',
        name: '员工1'
      })
  },
  /* -----------------------------------------------------
    客户插件
  ----------------------------------------------------- */
  customerMore: [
    {
      check: true,
      distance: 31,
      labelType: 0,
      addr: '南京市建邺区康文路康缘智汇港附近',
      approval_status: '3',
      code: '20180403004',
      cooperate_status: '1',
      district_id: '',
      id: '5330457627710680963',
      lat: '',
      location: '31.983362,118.73069',
      lon: '',
      manager_name: '',
      name: '客户门店经销商1',
      name_py: '20180403004 20180403004',
      trade_type: '3',
      type_id: '',
      type_image: ''
    },
    {
      check: true,
      distance: 5,
      labelType: 0,
      addr: '江苏省南京市建邺区康文路康缘智汇港附近',
      approval_status: '3',
      code: 'storethree',
      cooperate_status: '1',
      district_id: '',
      id: '8834765014408029232',
      lat: '',
      location: '31.983679,118.730766',
      lon: '',
      manager_name: '',
      name: '客户门店经销商2',
      name_py: 'mendian3 md3',
      trade_type: '3',
      type_id: '',
      type_image: ''
    },
    {
      addr: '南京市建邺区康文路南京金贝网络科技有限公司附近',
      approval_status: '3',
      check: false,
      code: 'CUS000084',
      cooperate_status: '1',
      distance: -1,
      district_id: '-1',
      id: '8045732772848971055',
      labelType: 2,
      lat: '31.983311',
      location: '31.983311,118.730527',
      lon: '118.730527',
      manager_name: '大表哥',
      name: '客户门店经销商3',
      name_py: '201801171557 201801171557',
      trade_type: '3',
      type_id: '-1',
      type_image: ''
    },
    {
      addr: '南京市建邺区康文路南京金贝网络科技有限公司附近',
      approval_status: '3',
      check: true,
      code: 'CUS000085',
      cooperate_status: '1',
      distance: 46,
      district_id: '',
      id: '8353170616312361122',
      labelType: 0,
      lat: '',
      location: '31.983301,118.730517',
      lon: '',
      manager_name: '',
      name: '客户门店经销商4',
      name_py: '201801171624 201801171624',
      trade_type: '3',
      type_id: '',
      type_image: ''
    }
  ],
  customerMoreLen: 1,
  getCustomerMore: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    const result = []
    for (let i = 0; i < self.customerMoreLen; i++) {
      result.push(self.customerMore[i])
    }
    self.customerMoreLen++
    if (self.customerMoreLen > self.customerMore.length) {
      self.customerMoreLen = 1
    }
    if (params.success) params.success(result)
  },
  getCustomer: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success({
        id: '6468207804099075062',
        name: '客户门店经销商1'
      })
  },
  getCustomerType: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success({
        id: '5365268129453435373',
        name: '客户类型1'
      })
  },
  getCustomerAreaMore: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success([
        {
          id: '5365268129453435373',
          name: '客户区域1'
        },
        {
          id: '5365268129453435374',
          name: '客户区域2'
        }
      ])
  },
  getCustomerArea: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success({
        id: '5365268129453435373',
        name: '客户区域1'
      })
  },
  // 部门插件
  getDepartmentMore: function (params) {
    var self = this
    self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
  },
  getDepartment: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    params.success({
      id: '5343180131602024954',
      name: '开发一部'
    })
  },
  // 单选商品
  getGoods: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在外勤客户端中使用', 'hint_only_wqapp'), { mask: false })
      return
    }
    if (params.success)
      params.success({
        id: '5343180131602024954',
        name: '商品1',
        propvalues: '', // 商品属性不带排序号
        nameSpec: '', // 规格名称
        productRemarks: '', // 备注
        props: '', // 商品属性介绍
        propDetail: '', // 商品属性详情
        reportUnitName: '', // 报表单位名称
        reportUnitID: '', // 报表单位ID
        reportUnitRatio: '' // 报表单位比率
      })
  },
  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   * timeout {Number}: 超时,
   * cacheTime {Number}: 缓存毫秒数防重复定位
   * }
   * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
   */
  getLocation: function (params = {}) {
    var self = this
    if (!self.debug) {
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
            var res = {
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
                  'hint_location_failed_PERMISSION_DENIED'
                )}`
                break
              case error.POSITION_UNAVAILABLE:
                console.log(
                  `${locale(
                    '定位失败,位置信息是不可用',
                    'hint_location_failed_POSITION_UNAVAILABLE'
                  )}`
                )
                errMsg = `getLocation:fail ${locale(
                  '定位失败,位置信息是不可用',
                  'hint_location_failed_POSITION_UNAVAILABLE'
                )}`
                break
              case error.TIMEOUT:
                console.log(
                  `${locale('定位失败,位置信息是不可用', 'hint_location_failed_TIMEOUT')}`
                )
                errMsg = `getLocation:fail ${locale(
                  '定位失败,请求获取用户位置超时',
                  'hint_location_failed_TIMEOUT'
                )}`
                break
              case error.UNKNOWN_ERROR:
                console.log(
                  `${locale('定位失败,位置信息是不可用', 'hint_location_failed_UNKNOWN_ERROR')}`
                )
                errMsg = `getLocation:fail ${locale(
                  '定位失败,定位系统失效',
                  'hint_location_failed_UNKNOWN_ERROR'
                )}`
                break
              default:
                console.log(`${locale('定位失败', 'hint_location_failed')}`)
                errMsg = `getLocation:fail ${locale('定位失败', 'hint_location_failed')}`
            }
            let res = { errMsg: errMsg }
            console.log('调用浏览器定位失败', res)
            if (params.fail) params.fail(res)
            self.getLocationTask(res)
          },
          {
            enableHighAcuracy: true, // 指示浏览器获取高精度的位置，默认为false
            timeout: 5000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            maximumAge: 2000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          }
        )
      } else {
        console.log(`${locale('当前浏览器不支持定位', 'hint_location_failed_not_supported')}`)
        let res = {
          errMsg: `getLocation:fail ${locale(
            '当前浏览器不支持定位',
            'hint_location_failed_not_supported'
          )}`
        }
        if (params.fail) params.fail(res)
        self.getLocationTask(res)
      }
      return
    }
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
    console.log('调用浏览器定位...')
    setTimeout(() => {
      var res = {
        errMsg: 'getLocation:ok',
        longitude: '116.397451',
        latitude: '39.909187',
        speed: '0.0',
        accuracy: '3.0.0'
      }
      // 将位置信息存储到cookie中60秒
      if (params.cacheTime)
        DB.setCookie(
          'app_location',
          JSON.stringify(res),
          !isNaN(params.cacheTime) ? Number(params.cacheTime) : 60000
        )
      if (params.success) params.success(res)
      self.getLocationTask(res)
    }, 2000)
  },
  // 获取当前地理位置带地图
  getLocationMap: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在微信或APP中使用', 'hint_only_wqapp'), { mask: false })
      if (params.fail)
        params.fail({
          errMsg: `getLocationMap:${locale('此功能仅可在微信或APP中使用', 'hint_only_wqapp')}`
        })
      return
    }
    setTimeout(function () {
      if (params.success)
        params.success({
          longitude: '116.397451',
          latitude: '39.909187',
          speed: '0.0',
          accuracy: '3.0.0',
          address: '北京市天安门'
        })
    }, 500)
  },

  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在微信或APP中使用', 'hint_only_app_and_wx'), { mask: false })
      if (params.fail)
        params.fail({
          errMsg: `scanQRCode:${locale('扫码失败', 'hint_scan_failed')}, ${locale(
            '请稍后重试',
            'hint_try_again_later'
          )}`
        })
      return
    }
    setTimeout(function () {
      if (params.success) params.success({ resultStr: '504823170310092750280333' })
    }, 500)
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
    var self = this
    if (!self.debug) {
      self.showToast(locale('此功能仅可在微信或APP中使用', 'hint_only_app_and_wx'), { mask: false })
      if (params.fail)
        params.fail({
          errMsg: `previewFile:fail${locale('预览文件失败', 'hint_previewFile_failed')}, ${locale(
            '请稍后重试',
            'hint_try_again_later'
          )}`
        })
      return
    }
    if (params.success)
      params.success({
        errMsg: `previewFile:ok${locale('预览文件成功', 'hint_previewFile_success')}`
      })
    if (params.url) window.location.href = params.url
  }
}
export default Bridge
