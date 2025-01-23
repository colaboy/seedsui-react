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
          console.log('桥接文件已加载!')
          window.top.wq.config({ auth: false })
          console.log('桥接已配置, 调用ready')
          window.top.wq.ready(function (response) {
            // 单例
            if (isReady) return

            console.log('桥接ready完成!')
            isReady = true
            // 初始化完成回调
            if (response.errMsg === 'config:ok') {
              console.log('桥接加载完成')
            } else {
              console.error('桥接失败, 如果无法返回请左滑返回')
            }
            if (typeof callback === 'function') callback(response)
          })
          console.log('已调用ready')
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
  platform: 'dinghuo',
  // 自定义操作
  invoke: function (api, params, callback) {
    window.top.wq.invoke(api, params, callback)
  },
  // 判断是否是主页
  isHomePage: function (callback) {
    window.top.wq.invoke('isHomePage', null, function (data) {
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
  // 返回首页
  goHome: function (params) {
    window.top.wq.invoke('goHome', params)
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
    if (params.url) {
      if (params.url.indexOf('h5:') === 0) params.url = params.url.replace(/^h5:/, '')
      else if (params.url.indexOf('webview:') === 0)
        params.url = params.url.replace(/^webview:/, '')
    }
    window.top.wq.openWindow(params) // eslint-disable-line
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
    console.log('调用订货地图...', newParams)

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
    console.log('调用勤策订货定位...', params)
    window.top.wq.getLocation(params)
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
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
    // eslint-disable-next-line
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
      window.top.wq.invoke('chooseImage', chooseParams, function (res) {
        // eslint-disable-next-line
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
      return
    }
    console.log('外勤WK内核chooseImage', params)
    window.top.wq.chooseImage(params) // eslint-disable-line
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
    // eslint-disable-next-line
    params = params || {}
    if (!params.uploadDir) {
      if (params.fail)
        params.fail({
          errMsg:
            'uploadImage:fail' + LocaleUtil.text('没有上传目录', 'SeedsUI_uploadImage_no_uploadDir')
        })
      return
    }
    if (typeof params.localId !== 'string' || !params.localId) {
      if (params.fail)
        params.fail({
          errMsg:
            'uploadImage:fail' + LocaleUtil.text('没有上传地址', 'SeedsUI_uploadImage_no_localeId')
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
        window.top.wq.invoke('uploadImage', {
          uploadDir: params.uploadDir,
          tenantId: params.tenantId || '',
          localIds: [params.localId]
        })
      }, 1000)
      return
    }

    let uploadParams = _.cloneDeep(params)
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
    console.log('外勤WK内核上传')
    console.log(uploadParams)
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

    if (!localId) {
      if (fail)
        fail({
          errMsg:
            'uploadImage:fail' + LocaleUtil.text('没有上传地址', 'SeedsUI_uploadImage_no_localeId')
        })
      return
    }
    window.top.wq.invoke(
      'uploadFile',
      {
        url: url || `https://cloud.waiqin365.com/fileupload/v1/doUpload.do?uploadPath=file`,
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
        fail(LocaleUtil.text('more than', 'SeedsUI_version_min_prompt', ['chooseVideo', '6.2.0']))
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
  },
  /**
   * 订货特殊API
   * @param {*} params
   * @param {*} callback
   */
  // 监听/取消监听物理返回事件(仅android): @params true:监听 | false:取消监听
  setBackEnable: function (flag) {
    if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      window.top.wq.invoke('setBackEnable', flag)
    }
  },
  // 获取图片前缀
  getImagePrefix: function () {
    return 'LocalResource://imageid'
  },
  // 获取登陆信息
  loginInfo: function (callback) {
    window.top.wq.invoke('getLoginInfo', null, callback)
  },
  // 根据key获取登陆信息
  getLoginInfo: function (key, callback) {
    Bridge.loginInfo(function (result) {
      callback(result[key])
    })
  },
  // 获取系统参数
  systemParameter: function (callback) {
    window.top.wq.invoke('getSystemParameter', null, callback)
  },
  // 修改原生角标
  changeBadgeNum: function (count) {
    window.top.wq.invoke('setBadgeNum', { key: count })
  },
  /**
   * 支付宝支付
   * @param {Object} params {orderInfo: ''}
   * @param {Function} callback
   * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
   */
  alipay: function (params, callback) {
    window.top.wq.invoke('alipay', params, callback)
  },
  /**
   * 商联支付
   * @param {Object} params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
   * @param {Function} callback 回调
   */
  slopenpay: function (params, callback) {
    window.top.wq.invoke('slopenpay', params, callback)
  },
  /**
   * 大华捷通支付
   * @param {Object} params {payChannel:'UPPay 云闪付  WXPay微信支付 AliPay 支付宝支付', payData:'服务端获取'}
   * @param {Function} callback 回调
   */
  qmfpay: function (params, callback) {
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
    window.top.wq.invoke('qmfpay', params, callback)
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
    window.top.wq.invoke('shareText', params, callback)
  },
  /**
   * 获取订货包名
   * @param {Function} callback({result: 'cn.com.wq.ordergoods'}), ios包名cn.com.wq.ordergoods, android包名com.waiqin365.dhcloud
   */
  getIdentification: function (callback) {
    if (Device.compareVersion(Device.platformVersion, '2.3.6') < 0) {
      callback({})
      return
    }
    window.top.wq.invoke('getIdentification', null, callback)
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
    window.top.wq.invoke('isExistsFile', params, callback)
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
    window.top.wq.invoke('downloadFile', params, callback)
  },
  /* 附件打开
  openFile（{
    "filePath": ""
  }, (result) => {
  // 返回格式 {{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function (params, callback) {
    window.top.wq.invoke('openFile', params, callback)
  },
  // 获取当前网络状态 @return {networkType:'返回网络类型2g，3g，4g，wifi'}
  getNetworkType: function (callback) {
    window.top.wq.invoke('getNetworkType', null, callback)
  }
}

export default Bridge
