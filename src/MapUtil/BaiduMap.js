// BaiduMap 百度地图使用库
// 引入 PrototypeObject.js: Object.getUnitNum, Object.loadScript
// 引入 PrototypeString.js: Object.getUnitNum方法中使用toNumber()
import locale from './../locale'
import GeoUtil from './../GeoUtil'

/**
 * 初始化百度地图
 * @param {String} id 用于s.map = new BMap.Map(id)
 * @param {Object} params 见defaults
 */
let BaiduMap = function (id, params) {
  /* --------------------
  Model
  -------------------- */
  let defaults = {
    styleOptions: {
      strokeColor: '#0C8EFF', //边线颜色
      strokeWeight: 1, //边线的宽度，以像素为单位
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1
      strokeStyle: 'solid', //边线的样式，solid或dashed
      fillColor: '#0C8EFF', //填充颜色。当参数为空时，圆形将没有填充效果
      fillOpacity: 0.6 //填充的透明度，取值范围0 - 1
    },
    labelStyleOptions: {
      border: 0,
      padding: '6px 15px',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.74)',
      boxShadow:
        '0 9px 28px 8px rgba(0,0,0,0.05), 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12)',
      borderRadius: '4px'
    }
    /*
    // 中心位置
    center: '江苏省,南京市',
    // 缩放导航
    navigation: {
      position: 'bottom-right',
      type: 'zoom'
    },
    // Map构造函数的可选参数
    mapOptions: {} // 参考: http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b1
    */
  }
  // eslint-disable-next-line
  params = params || {}
  for (let def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }

  // BaiduMap
  let s = this

  // Params
  s.params = params
  // 常量
  /* eslint-disable */
  const {
    BMap,
    BMapLib = {},
    BMAP_ANCHOR_BOTTOM_LEFT,
    BMAP_ANCHOR_BOTTOM_RIGHT,
    BMAP_ANCHOR_TOP_RIGHT,
    BMAP_DRAWING_POLYGON,
    BMAP_DRAWING_POLYLINE,
    BMAP_DRAWING_CIRCLE,
    BMAP_DRAWING_RECTANGLE,
    BMAP_DRAWING_MARKER,
    BMAP_NAVIGATION_CONTROL_ZOOM,
    BMAP_STATUS_SUCCESS,
    BMAP_STATUS_TIMEOUT,
    BMAP_STATUS_UNKNOWN_LOCATION,
    BMAP_STATUS_PERMISSION_DENIED,
    BMAP_ANCHOR_TOP_LEFT,
    BMAP_NAVIGATION_CONTROL_LARGE
  } = window
  /* eslint-enable */
  // 鼠标绘制管理实例
  s.drawingManager = null
  // 容器
  s.container = typeof id === 'string' ? document.getElementById(id) : id
  // 地图实例
  s.map = null
  if (id) {
    try {
      s.map = new BMap.Map(id, s.params.mapOptions)
    } catch (error) {
      s.params.onError(s, {
        errMsg: locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed'),
        error: error
      })
    }
  }
  /**
   * 获取当前地理位置
   * @param {Object} params
   * params: {
   *   type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
   *   success {Function}: function ({
   *     latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度',
   *     province: '省', city: '市', district: '区', street: '街道', address: '详情地址'
   *   }),
   *   fail {Function}: function ()
   * }
   */
  s.getLocation = function (options = {}) {
    console.log('调用百度地图定位...')
    let geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition(
      function (res) {
        if (!res) {
          // 如果返回结果为null的话, 则返回
          console.log('没有开启定位权限')
          if (options.fail)
            options.fail(`${locale('定位失败,请检查定位权限是否开启', 'SeedsUI_location_failed')}`)
          return
        }
        const status = this.getStatus()
        if (status === BMAP_STATUS_SUCCESS) {
          // 定位成功
          const result = {
            errMsg: `${locale('定位成功', 'SeedsUI_location_success')}`,
            latitude: res.point.lat,
            longitude: res.point.lng,
            speed: null,
            accuracy: null,
            province: res.address.province,
            city: res.address.city,
            district: res.address.district
            // 百度地图返回的street是路名, 并非街道
            // street: res.address.street
          }
          result.address =
            (result.province || '') +
            (result.city ? ' ,' + result.city : '') +
            (result.district ? ' ,' + result.district : '') +
            (result.street ? ' ,' + result.street : '')

          // 构建选中省市区
          let data = []
          if (result.province) {
            data.push({
              id: '',
              name: result.province
            })
          }
          if (result.city) {
            data.push({
              id: '',
              name: result.city
            })
          }
          if (result.district) {
            data.push({
              id: '',
              name: result.district
            })
          }
          result.data = data

          if (options.success) options.success(result)
        } else if (status === BMAP_STATUS_TIMEOUT) {
          // 定位超时
          console.log('定位超时')
          options.fail({ errMsg: `${locale('定位超时', 'SeedsUI_location_overtime_error')}` })
        } else {
          console.log('定位失败')
          // BMAP_STATUS_UNKNOWN_LOCATION, BMAP_STATUS_PERMISSION_DENIED
          if (options.fail)
            options.fail(`${locale('定位失败,请检查定位权限是否开启', 'SeedsUI_location_failed')}`)
        }
      },
      {
        enableHighAccuracy: true, // 是否要求浏览器获取最佳效果，同浏览器定位接口参数。默认为false
        timeout: 5000, // 超时事件，单位为毫秒。默认为10秒
        maximumAge: 60000, // 允许返回指定事件内的缓存结果，单位为毫秒。如果为0，则每次请求都获取最新的定位结果。默认为60秒
        SDKLocation: false // 是否开启SDK辅助定位
      }
    )

    // 添加定位控件
    // let geolocationControl = new BMap.GeolocationControl()
    // geolocationControl.addEventListener('locationSuccess', function (res) {
    //   // e.addressComponent.province
    //   if (options.success) options.success({errMsg: res.message})
    // })
    // geolocationControl.addEventListener('locationError', function (res) {
    //   if (options.fail) options.fail({errMsg: res.message})
    // })
    // s.map.addControl(geolocationControl)
  }

  /**
   * 自动切换到有覆盖物的视图
   * @param {Point} point [lng, lat]
   * @param {ViewportOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b4
   * @return {Void}
   */
  s.centerToPoints = function (points, options) {
    if (!s.hasMap()) return
    let bdPoints = []
    if (points && points.length) {
      bdPoints = s.pointsToBdPoints(points)
    } else {
      let overlays = s.map.getOverlays()
      for (let i = 0; i < overlays.length; i++) {
        let overlay = overlays[i]
        if (overlay instanceof BMap.Polygon) {
          // 多边形
          bdPoints = bdPoints.concat(overlay.getPath())
        } else if (overlay instanceof BMap.Marker) {
          // 标记
          bdPoints = bdPoints.concat(overlay.point)
        }
      }
    }
    s.map.setViewport(bdPoints, options || {})
  }
  /**
   * 自动切换到有覆盖物的视图
   * @param {Point} point [lng, lat]
   * @param {ViewportOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b4
   * @return {Void}
   */
  s.centerToPoint = function (point, options) {
    if (!s.hasMap()) return
    let bdPoint = s.pointToBdPoint(point)
    s.map.setViewport([bdPoint], options || {})
  }
  /**
   * 自动切换到有覆盖物的视图
   * @param {Circle} point [lng, lat]
   * @param {ViewportOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a0b4
   * @return {Void}
   */
  s.centerToCircle = function (circle, options) {
    if (circle instanceof BMap.Circle !== true) {
      return
    }
    // let point = circle.getCenter()
    // let bounds = circle.getBounds()
    s.centerToPoints(circle.getPath(), options)
  }
  /**
   * 标准坐标转成百度坐标
   * @param {Array} point [lng, lat]
   * @param {String} type 'wgs84 | gcj02'
   * @return {Promise} result: {code: '1' 成功, point: 百度坐标Point对象}
   */
  s.pointConvertBdPoint = function (point, type = 'gcj02') {
    return new Promise((resolve) => {
      // eslint-disable-next-line
      point = new BMap.Point(point[0], point[1])
      let convertor = new BMap.Convertor()
      if (type === 'wgs84' || type === 'gcj02') {
        let types = [1, 5]
        if (type === 'gcj02') types = [3, 5]
        convertor.translate([point], types[0], types[1], (result) => {
          // 改造结果
          let res = result
          if (result.status !== 0) {
            res.code = '0'
          } else {
            res.code = '1'
            if (result.points && result.points.length) {
              res.point = result.points[0]
            }
          }
          resolve(res)
        })
      } else {
        resolve({ code: '0', status: -1, point: point })
      }
    })
  }
  function pointsConvertBdPoints(points, type = 'gcj02') {
    return new Promise((resolve) => {
      // eslint-disable-next-line
      points = points.map((point) => {
        return new BMap.Point(point[0], point[1])
      })
      let convertor = new BMap.Convertor()
      if (type === 'wgs84' || type === 'gcj02') {
        let types = [1, 5]
        if (type === 'gcj02') types = [3, 5]
        convertor.translate(points, types[0], types[1], (result) => {
          // 改造结果
          let res = result
          let errMsg = ''
          switch (res.status) {
            case 1:
              errMsg = '内部错误'
              break
            case 4:
              errMsg = '转换失败'
              break
            case 21:
              errMsg = 'form非法'
              break
            case 22:
              errMsg = 'to非法'
              break
            case 24:
              errMsg = 'coords非法'
              break
            case 25:
              errMsg = 'coords个数非法, 超过限制'
              break
            case 26:
              errMsg = '参数错误'
              break
            default:
              errMsg = 'ok'
          }
          res.errMsg = errMsg
          if (result.status !== 0) {
            res.code = '0'
          } else {
            res.code = '1'
          }
          resolve(res)
        })
      } else {
        resolve({ code: '0', status: -1, points: points, errMsg: '无需要转换' })
      }
    })
  }
  /**
   * 标准坐标转成百度坐标
   * @param {Array} point [lng, lat]
   * @param {String} type 'wgs84 | gcj02'
   * @return {Promise} result: {code: '1' 成功, points 百度坐标Point对象集合}
   */
  s.pointsConvertBdPoints = function (points, type = 'gcj02') {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      if (!Array.isArray(points) || !points.length) {
        resolve({ code: '0', points: points, errMsg: '没有传入points' })
      }
      // eslint-disable-next-line
      points = points.map((point) => {
        return new BMap.Point(point[0], point[1])
      })
      let result = null
      if (points.length > 10) {
        // 百度转换功能最多支持10条, 超过10条需要拆分开转
        let sumPoints = []
        let sumLength = points.length
        async function pointsIterator() {
          let splicePoints = points.splice(0, 10)
          // eslint-disable-next-line
          result = await pointsConvertBdPoints(splicePoints, (type = 'gcj02'))
          if (result.code === '1') {
            sumPoints = sumPoints.concat(result.points)
            if (sumPoints.length < sumLength) {
              pointsIterator()
            } else {
              result.points = sumPoints
              resolve(result)
            }
          } else {
            resolve(result)
            return
          }
        }
        pointsIterator()
      } else {
        // eslint-disable-next-line
        result = await pointsConvertBdPoints(points, (type = 'gcj02'))
        resolve(result)
      }
      // let convertor = new BMap.Convertor()
      // if (type === 'wgs84' || type === 'gcj02') {
      //   let types = [1, 5]
      //   if (type === 'gcj02') types = [3, 5]
      //   convertor.translate(points, types[0], types[1], (result) => {
      //     // 改造结果
      //     let res = result
      //     if (result.status !== 0) {
      //       res.code = '0'
      //     } else {
      //       res.code = '1'
      //     }
      //     resolve(res)
      //   })
      // } else {
      //   resolve({code: '0', status: -1, points: points})
      // }
    })
  }
  /**
   * 将[lng, lat]转换为百度点Point对象
   * @param {Any} point [lng, lat]或{lng: , lat: }或{longitude: , latitude: }
   * @param {String} type 'wgs84 | gcj02'
   * @return {Array<Point>}
   */
  s.pointToArrayPoint = function (point) {
    if (point instanceof BMap.Point) {
      return [point.lng, point.lat]
    }
    if (Array.isArray(point) && point[0] && point[1]) {
      return point
    }
    if (point && point.lng && point.lat) {
      return [point.lng, point.lat]
    }
    if (point && point.longitude && point.latitude) {
      return [point.longitude, point.latitude]
    }
    return null
  }
  /**
   * 将[lng, lat]转换为百度点Point对象
   * @param {Array} point [lng, lat]
   * @param {String} type 'wgs84 | gcj02'
   * @return {Array<Point>}
   */
  s.pointToBdPoint = function (point) {
    let arrPoint = s.pointToArrayPoint(point)
    if (!arrPoint) return null
    return new BMap.Point(arrPoint[0], arrPoint[1])
  }
  /**
   * 将[[lng, lat]]转换为百度点Point对象集合
   * @param {Array} points [[lng, lat], [lng, lat]]
   * @param {String} type 'wgs84 | gcj02'
   * @return {Point}
   */
  s.pointsToBdPoints = function (points) {
    return points.map((point) => {
      return s.pointToBdPoint(point)
    })
  }
  /**
   * 将标准坐标转换为百度点Polygon对象
   * @param {Array} points [[lng, lat], [lng, lat]]
   * @param {PolygonOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b15
   * @return {Polygon}
   */
  s.pointsToBdPolygon = function (points, options) {
    let bdPoints = s.pointsToBdPoints(points)
    // 校验是否有非法点
    for (let bdPoint of bdPoints) {
      if (!bdPoint) return null
    }
    return new BMap.Polygon(bdPoints, options)
  }
  /**
   * 将标准多边形坐标转换为百度点Polygon对象
   * @param {Array} polygons [[[lng, lat], [lng, lat]], [[lng, lat], [lng, lat]]]
   * @param {PolygonOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b15
   * @return {Array<Polygon>}
   */
  s.polygonsToBdPolygons = function (polygons, options) {
    let bdPolygons = []
    for (let polygon of polygons) {
      // 校验是否有非法多边形
      let bdPolygon = s.pointsToBdPolygon(polygon, options)
      if (!bdPolygon) return null
      bdPolygons.push(bdPolygon)
    }
    return bdPolygons
  }
  /**
   * 将[lng, lat]转换为百度点Circle对象
   * @param {Array} point [lng, lat]
   * @param {Number} radius 半径
   * @param {CircleOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b17
   * @return {Circle}
   */
  s.pointToBdCircle = function (point, radius, options = {}) {
    let bdPoint = s.pointToBdPoint(point)
    if (!bdPoint) return null
    let circleOptions = {
      strokeColor: options.strokeColor || s.params.styleOptions.strokeColor,
      fillColor: options.fillColor || s.params.styleOptions.fillColor,
      strokeWeight: options.strokeWeight || s.params.styleOptions.strokeWeight,
      strokeOpacity: options.strokeOpacity || s.params.styleOptions.strokeOpacity,
      fillOpacity: options.fillOpacity || s.params.styleOptions.fillOpacity,
      strokeStyle: options.strokeStyle || s.params.styleOptions.strokeStyle, // solid或dashed
      enableMassClear:
        typeof options.enableMassClear === 'boolean' ? options.enableMassClear : true, // 是否在调用map.clearOverlays清除此覆盖物，默认为true
      // enableEditing: typeof options.enableEditing === 'boolean' ? options.enableEditing : false, // 是否启用线编辑，默认为false(此属性与enableEditing方法冲突, 不建议使用此属性)
      enableClicking: typeof options.enableClicking === 'boolean' ? options.enableClicking : true // 是否响应点击事件，默认为true
    }
    return new BMap.Circle(bdPoint, radius || 1000, circleOptions)
  }
  /**
   * 地址逆解析
   * @param {Array} point [lng, lat]
   * @param {String} type 'wgs84 | gcj02 | bd09'
   * @return {Promise} result: {status: 0 成功, point 坐标, address 地址}
   */
  s.getAddress = function (point, type, options = {}) {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      if (!s.hasMap(false)) {
        if (options?.fail)
          options.fail({
            errMsg: `${locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed')}`
          })
        resolve(null)
        return
      }
      // 格式化坐标
      let arrPoint = s.pointToArrayPoint(point)
      if (!arrPoint) {
        resolve(null)
        return
      }
      let bdPoint = GeoUtil.coordtransform(arrPoint, type, 'bd09')
      bdPoint = new BMap.Point(bdPoint[0], bdPoint[1])
      // 逆解析
      let geocoder = new BMap.Geocoder()
      geocoder.getLocation(bdPoint, (res) => {
        // 对结果进行格式化
        // let result = res || {}
        let result = {}

        if (res.address) {
          result.address = res.address
        }

        if (res.addressComponents) {
          // result.point = point
          result.province = res.addressComponents.province
          result.city = res.addressComponents.city
          result.district = res.addressComponents.district

          // 构建选中省市区
          // let data = []
          // if (res.addressComponents.province) {
          //   data.push({
          //     id: '',
          //     name: res.addressComponents.province
          //   })
          // }
          // if (res.addressComponents.city) {
          //   data.push({
          //     id: '',
          //     name: res.addressComponents.city
          //   })
          // }
          // if (res.addressComponents.district) {
          //   data.push({
          //     id: '',
          //     name: res.addressComponents.district
          //   })
          // }
          // result.data = data
          if (options?.success) options.success(result)
        } else {
          result.errMsg = locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed')
          if (options?.fail) options.fail(result)
        }
        resolve(result)
      })
    })
  }
  /**
   * 本地搜索
   * @param {String} city 城市名称
   * @param {Number} lvl 地图显示级别
   * @return {Void}
   */
  s.search = function (options = {}) {
    const local = new BMap.LocalSearch(s.map, {
      pageCapacity: options.rows || 20,
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
          let res = []
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            const item = results.getPoi(i)
            res.push({
              id: item.uid,
              title: item.title,
              address: item.address,
              point: item.point,
              tel: item.phoneNumber,
              mobile: item.phoneNumber,
              city: item.city,
              province: item.province,
              postcode: item.postcode,
              isAccurate: item.isAccurate,
              tags: item.tags
            })
          }
          if (options.success) options.success({ code: '1', data: { list: res } })
        } else {
          if (options.fail) options.fail({ code: '0', message: '查询失败' })
        }
      },
      panel: options.panelId || null // 结果面板id
    })
    local.search(options.keyword)
    return local
  }
  /**
   * px转不百度坐标Point对象, 老版的百度地图不是用坐标而是px
   * @param {Object} px {x: , y: }
   * @return {Point}
   */
  s.pxToBdPoint = function (px) {
    if (!px) return null
    return new BMap.MercatorProjection().pointToLngLat(new BMap.Pixel(px.x, px.y))
  }
  /**
   * 格式化points, 将[[lng, lat], [lng, lat]]转为[{lng: '', lat: ''}]
   * @param {Points} points 点集合, 格式[[lng, lat], [lng, lat]]
   * @return {Points} 格式[{lng: '', lat: ''}]
   */
  s.pointsToArrayObject = function (points) {
    if (!points || !Array.isArray(points)) return []
    if (JSON.stringify(points).indexOf('lng') !== -1) return points
    if (!Array.isArray(points[0]) || !points[0][0] || !points[0][1]) return []
    return points.map(function (point) {
      let lng = point[0]
      let lat = point[1]
      if (point[0] < point[1]) {
        lng = point[1]
        lat = point[0]
      }
      return {
        lng,
        lat
      }
    })
  }
  /**
    * 通俗偏移量转为百度Size对象
    * @param {Object} wh {
        width: 0,
        height: 0
      }
    * @return {Size} 表示一个矩形区域的大小
    */
  s.whToBdSize = function (wh = {}) {
    if (wh instanceof BMap.Size) {
      return wh
    }
    if (wh && !isNaN(wh.width) && !isNaN(wh.height)) {
      return new BMap.Size(wh.width, wh.height)
    }
    return null
  }
  /**
   * 两个值的数字字符串转成宽高数字
   * @param {Object} position '0 0'
   * @return {Object} {width: 0, height: 0}
   */
  s.positionToWh = function (position) {
    let wh = position.split(' ')
    let w = null
    let h = null
    if (wh.length > 1) {
      w = Object.getUnitNum(wh[0])
      h = Object.getUnitNum(wh[1])
    } else {
      // 只有一个值
      w = Object.getUnitNum(wh[0])
    }
    return {
      width: w || 0,
      height: h || 0
    }
  }
  /**
   * html转成百度InfoWindow对象
   * @param {String} html
   * @param {InfoWindowOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b8
   * @return {InfoWindow} 窗口信息
   */
  s.htmlToBdInfoWindow = function (html, options) {
    if (!html) return null
    return new BMap.InfoWindow(html, options)
  }
  /**
   * 根据背景url()取出中间的url
   * @param {String} backgroundImage 'url()'
   * @return {String} 返回url
   */
  s.getUrlByBackgroundImage = function (backgroundImage = '') {
    let match = backgroundImage.match(/^url\((.+)\)$/)
    if (match && match.length && match[1]) {
      return match[1]
    }
    return ''
  }
  /**
    * 通俗style对象转成Icon对象
    * @param {Object} style {
        marginTop: 0, // 图标的定位点相对于图标左上角的偏移值
        marginLeft: 0,
        width: 16,
        height: 24,
        backgroundPosition: 'x y', // 仅支持x与y组合的方式控制位置
        backgroundSize: 'width height', // 仅支持宽高大小
        backgroundImage: 'url()',
      }
    * @return {Size} 表示一个矩形区域的大小
    */
  s.styleToBdIcon = function (style = {}, infoStyle = {}) {
    // marginTop和marginLeft
    let marginTop = Object.getUnitNum(style.marginTop)
    let marginLeft = Object.getUnitNum(style.marginLeft)
    let anchor =
      marginTop && marginLeft
        ? s.whToBdSize({ width: marginTop || 0, height: marginLeft || 0 })
        : null
    // width和height
    let width = Object.getUnitNum(style.width)
    let height = Object.getUnitNum(style.height)
    if (!width) width = 16
    if (!height) height = 24
    let size = s.whToBdSize({ width: width, height: height })
    // backgroundPosition
    let imageOffset = null
    if (style.backgroundPosition) {
      let bgWh = s.positionToWh(style.backgroundPosition)
      imageOffset = s.whToBdSize({ width: bgWh.width, height: bgWh.height })
    }
    // backgroundSize
    let imageSize = s.whToBdSize({ width: width, height: height })
    if (style.backgroundSize) {
      let bgWh = s.positionToWh(style.backgroundSize)
      imageOffset = s.whToBdSize({ width: bgWh.width || width, height: bgWh.height || height })
    }
    // backgroundImage
    let imageUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAMAAABHcohdAAAAOVBMVEUAAAAMjv8Njv8NkP8Nj/8MkP8Nkf8gn/8Nj/8Njv8Mj/8Mj/8Mjv+ZmZn////n8/+Nyv8hj+8vkeUvlTkDAAAADHRSTlMA5oyFdlM8CPPZv6h2+xS8AAAAs0lEQVQ4y+2TWw6EIAxFaQUEvDOo+1/sIFEjKDSZb89vD7TpQ12wHLxzPrBVD4yacEJ6rOOGUECmjA+4MVzjEx6YqvedPwwSc4xzbZi9ftri30Rt0JgFjUTchIgKnQVqC5T7BxQpCraeMnAWeYOTENAhJMH3BJ8E1xOcLMgp5CK5J3BuVAe7t7oF7cNqoo9xN6DxWJgGRlo5aWmltZcORz69O5bXBVhWtqrFJ6PUK7zCv8IP6rMmSWrDD8kAAAAASUVORK5CYII='
    if (style.backgroundImage) {
      imageUrl = s.getUrlByBackgroundImage(style.backgroundImage)
    }

    // window容器的marginTop和marginLeft
    let infoWindowAnchor = s.whToBdSize({
      width: infoStyle.marginLeft || 0,
      height: infoStyle.marginTop || 0
    })

    return new BMap.Icon(imageUrl, size, {
      anchor: anchor,
      size: size,
      imageOffset: imageOffset,
      imageSize: imageSize,
      imageUrl: imageUrl,
      infoWindowAnchor: infoWindowAnchor
    })
  }
  /**
    * 将点字面量转为百度的点
    * @param {Object} point {
        lng: ,
        lat:
      }
    * @return {Point}
    */
  s.objectToBdPoint = function (point = {}) {
    if (point instanceof BMap.Point) {
      return point
    }
    if (point && point.lng && point.lat) {
      return new BMap.Point(point.lng, point.lat)
    }
    return null
  }
  /**
   * 通俗位置转换成百度认识的位置字段
   * @param {String} position 通俗位置
   * @return {ControlAnchor} 百度位置字段
   */
  s.positionToBdAnchor = function (position) {
    // 位置
    let anchor = null
    switch (position) {
      case 'top-left':
        anchor = BMAP_ANCHOR_TOP_LEFT
        break
      case 'top-right':
        anchor = BMAP_ANCHOR_TOP_RIGHT
        break
      case 'bottom-left':
        anchor = BMAP_ANCHOR_BOTTOM_LEFT
        break
      case 'bottom-right':
        anchor = BMAP_ANCHOR_BOTTOM_RIGHT
        break
      default:
        anchor = BMAP_ANCHOR_TOP_LEFT
    }
    return anchor
  }
  /**
   * 显示距离比例控件
   * @param {Object} options {
   * position {String}: 'top-left | top-right | bottom-left | bottom-right' 通俗位置
   * offset {Object}: {width: Number, height: Number}
   * success {Function}: function(ScaleControl)
   * }
   */
  s.showDistance = function (options = {}) {
    if (!s.hasMap()) return
    // 位置
    const anchor = s.positionToBdAnchor(options.position)
    // 偏移量
    let offset = s.whToBdSize(options.offset)
    // 实例
    const scaleControl = new BMap.ScaleControl({
      anchor: anchor,
      offset: offset
    })
    s.map.addControl(scaleControl)
    // Return
    return scaleControl
  }
  /**
   * 显示缩放控件
   * @param {Object} options {
   * position {String}: 'top-left | top-right | bottom-left | bottom-right' 通俗位置
   * offset {Object}: {width: Number, height: Number}
   * success {Function}: function(NavigationControl)
   * }
   */
  s.showNavigation = function (options = {}) {
    if (!s.hasMap()) return
    // 位置
    let anchor = s.positionToBdAnchor(options.position)
    // 偏移量
    let offset = s.whToBdSize(options.offset)
    // 类型
    let type = null
    switch (options.type) {
      case 'zoom':
        type = BMAP_NAVIGATION_CONTROL_ZOOM
        break
      case 'large':
        type = BMAP_NAVIGATION_CONTROL_LARGE
        break
      default:
        type = BMAP_NAVIGATION_CONTROL_LARGE
    }
    // 是否显示级别提示信息
    const showZoomInfo = typeof options.showZoomInfo === 'boolean' ? options.showZoomInfo : false
    // 定位按钮, 启用会多出个定位按钮
    let enableGeolocation = false
    if (typeof options.enableGeolocation === 'boolean') {
      enableGeolocation = options.enableGeolocation
    }
    // 实例
    const navigationControl = new BMap.NavigationControl({
      anchor: anchor,
      offset: offset,
      type: type,
      showZoomInfo: showZoomInfo,
      enableGeolocation: enableGeolocation
    })
    s.map.addControl(navigationControl)
    // Return
    return navigationControl
  }
  /**
   * 清除覆盖物
   */
  s.clearOverlays = function (overlays) {
    if (!s.hasMap()) return
    if (overlays) {
      for (let overlay of overlays) {
        s.map.removeOverlay(overlay)
      }
      return
    }
    // 清除所有overlays, 此方法慎用, 经常会与鼠标事件冲突
    s.map.clearOverlays()
  }
  /**
   * 清除覆盖物
   */
  s.clearOverlay = function (overlay) {
    if (!s.hasMap()) return
    if (!overlay) return
    s.map.removeOverlay(overlay)
  }

  /**
   * 创建鼠标绘制管理类,设置当前的绘制模式, 参考http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html#constructor
   * @param {CONST} type
   */
  // BMAP_DRAWING_MARKER 画点
  // BMAP_DRAWING_CIRCLE 画圆
  // BMAP_DRAWING_POLYLINE 画线
  // BMAP_DRAWING_POLYGON 画多边形
  // BMAP_DRAWING_RECTANGLE 画矩形
  // circlecomplete(overlay) {Circle} 绘制圆完成后，派发的事件接口
  // markercomplete(overlay) {Marker} 绘制点完成后，派发的事件接口
  // overlaycomplete(e) {Event Object} 鼠标绘制完成后，派发总事件的接口
  // polygoncomplete(overlay) {Polygon} 绘制多边形完成后，派发的事件接口
  // polylinecomplete(overlay) {Polyline} 绘制线完成后，派发的事件接口
  // rectanglecomplete(overlay) {Polygon} 绘制矩形完成后，派发的事件接口
  s.createDrawingManager = function (options = {}) {
    // eslint-disable-next-line
    if (typeof options !== 'object') options = {}
    let type = options.drawingType || BMAP_DRAWING_POLYGON
    let opts = {
      isOpen: typeof options.isOpen === 'boolean' ? options.isOpen : false, // 是否开启绘制模式
      drawingType: type
    }
    // 是否添加绘制工具栏控件
    if (typeof options.enableDrawingTool === 'boolean') {
      opts.enableDrawingTool = options.enableDrawingTool
    }
    // 绘制工具栏控件配置
    if (typeof options.drawingToolOptions === 'object') {
      opts.drawingToolOptions = options.drawingToolOptions
      // {
      //   anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
      //   offset: new BMap.Size(5, 5), // 偏离值
      // }
    }
    // 多边形的样式
    if (type === BMAP_DRAWING_POLYGON) {
      opts.polygonOptions = s.params.styleOptions
    }
    // 多边线的样式
    if (type === BMAP_DRAWING_POLYLINE) {
      opts.polylineOptions = s.params.styleOptions
    }
    // 圆的样式
    if (type === BMAP_DRAWING_CIRCLE) {
      opts.circleOptions = s.params.styleOptions
    }
    // 矩形的样式
    if (type === BMAP_DRAWING_RECTANGLE) {
      opts.rectangleOptions = s.params.styleOptions
    }
    // 点样式
    if (type === BMAP_DRAWING_MARKER) {
      opts.markerOptions = s.params.styleOptions
    }
    // 设置样式
    if (options.polygonOptions) opts.polygonOptions = options.polygonOptions
    if (options.polylineOptions) opts.polylineOptions = options.polylineOptions
    if (options.circleOptions) opts.circleOptions = options.circleOptions
    if (options.rectangleOptions) opts.rectangleOptions = options.rectangleOptions
    if (options.markerOptions) opts.markerOptions = options.markerOptions

    try {
      s.drawingManager = new BMapLib.DrawingManager(s.map, opts)
      return s.drawingManager
    } catch (error) {
      if (s.params.onError)
        s.params.onError(s, {
          errMsg: locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed'),
          error: error
        })
      return null
    }
  }
  // 启用手动绘制
  s.enableManualDraw = function (type) {
    if (s.drawingManager) {
      s.drawingManager.open()
      s.drawingManager.setDrawingMode(type || BMAP_DRAWING_POLYGON) // 默认多边形
    }
  }
  s.disableManualDraw = function (type) {
    if (s.drawingManager) {
      s.drawingManager.close()
    }
  }

  /**
   * 绘制省市区域
   * @param {String} area 域名名称: 江苏南京市鼓楼区
   * @param {PolygonOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b15
   * @param {Object} callback 回调配置 {success: func(), fail: func()}
   * @param {Boolean} pureData 只要纯数据, 设置为true时, 则不会绘制到地图上
   * @return {Polygon}
   */
  s.drawBoundary = function (area, options, callback = {}, pureData) {
    if (!s.hasMap()) return
    let boundary = new BMap.Boundary()
    if (!area) {
      console.warn(
        `${locale('请传入参数', 'SeedsUI_need_pass_parameter_error')}area, ${locale(
          '例如“江苏省南京市建邺区”',
          'SeedsUI_example_address'
        )}`
      )
      callback.fail &&
        callback.fail({
          errMsg: `${locale('请传入参数', 'SeedsUI_need_pass_parameter_error')}area, ${locale(
            '例如“江苏省南京市建邺区”',
            'SeedsUI_example_address'
          )}`
        })
      return
    }
    boundary.get(area, function (res) {
      // 获取行政区域
      let count = res.boundaries.length // 行政区域的点有多少个
      if (count === 0) {
        console.warn(
          `${locale('参数不正确', 'SeedsUI_wrong_parameter_error')}area: ${area}不是一个合法的值`
        )
        callback.fail &&
          callback.fail({
            errMsg: `${locale(
              '参数不正确',
              'SeedsUI_wrong_parameter_error'
            )}area: ${area}不是一个合法的值`
          })
        return
      }
      let bdPolygons = []
      let bdPolygonsPath = []
      for (let i = 0; i < count; i++) {
        bdPolygons[i] = new BMap.Polygon(res.boundaries[i], {
          ...(s.params.styleOptions || {}),
          ...(options || {})
        })
        if (!pureData) s.map.addOverlay(bdPolygons[i]) // 添加覆盖物
        bdPolygonsPath = bdPolygonsPath.concat(bdPolygons[i].getPath())
      }
      // 获取polygons, 格式: [[lng,lat]]
      let polygons = []
      for (let bdPolygon of bdPolygons) {
        let polygon = []
        let bdPoints = bdPolygon.getPath()
        for (let bdPoint of bdPoints) {
          polygon.push([bdPoint.lng, bdPoint.lat])
        }
        polygons.push(polygon)
      }
      boundary.bdPolygons = bdPolygons
      boundary.bdPolygonsPath = bdPolygonsPath
      boundary.polygons = polygons
      callback.success && callback.success({ ...res, bdPolygons, bdPolygonsPath, polygons })
    })
    return boundary
  }
  /**
   * 绘制多边形
   * @param {Array} polygon
   * @param {PolygonOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b15
   * @return {Polygon}
   */
  s.drawPolygon = function (polygon, options = {}) {
    if (!s.hasMap()) return
    let bdPolygon = s.pointsToBdPolygon(polygon, options)
    if (!bdPolygon) {
      console.warn(
        `drawPolygon: ${locale(
          '请传入参数',
          'SeedsUI_need_pass_parameter_error'
        )}{polygon: {}}${locale('或者', 'or')}{points: []}`
      )
      return null
    }
    // 设置多边型的边线颜色，参数为合法的CSS颜色值
    bdPolygon.setStrokeColor(options.strokeColor || s.params.styleOptions.strokeColor)
    // 设置多边形边线的宽度，取值为大于等于1的整数
    bdPolygon.setStrokeWeight(options.strokeWeight || s.params.styleOptions.strokeWeight)
    // 设置圆形的边线透明度，取值范围0 - 1
    bdPolygon.setStrokeOpacity(options.strokeOpacity || s.params.styleOptions.strokeOpacity)
    // 设置圆形边线样式为实线或虚线，取值solid或dashed
    bdPolygon.setStrokeStyle(options.strokeStyle || s.params.styleOptions.strokeStyle)
    // 设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
    bdPolygon.setFillColor(options.fillColor || s.params.styleOptions.fillColor)
    // 设置矢量图标填充透明度,opacity范围0~1
    bdPolygon.setFillOpacity(options.fillOpacity || s.params.styleOptions.fillOpacity)

    // 添加覆盖物
    s.map.addOverlay(bdPolygon)
    return bdPolygon
  }
  /**
   * 绘制多边形
   * @param {Array} polygons
   * @param {PolygonOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b15
   * @return {Array<Polygon>}
   */
  s.drawPolygons = function (polygons, options) {
    let bdPolygons = []
    for (let polygon of polygons) {
      bdPolygons.push(s.drawPolygon(polygon, options))
    }
    return bdPolygons
  }

  /**
   * 绘制标记
   * @param {Point} point [lng, lat]
   * @param {String} content 显示内容
   * @param {LabelOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b10
   * @return {Label} 标记对象
   */
  s.drawLabel = function (point, content, options = {}) {
    if (!s.hasMap()) return
    // {point: [lng, lat], options: {}}
    // 绘制位置
    const bdPoint = s.pointToBdPoint(point)
    if (!bdPoint) return null
    const label = new BMap.Label(content || '', {
      offset: s.whToBdSize(options.offset),
      position: bdPoint,
      enableMassClear: typeof options.enableMassClear === 'boolean' ? options.enableMassClear : true // 是否在调用map.clearOverlays清除此覆盖物，默认为true
    })
    if (options.style) {
      label.setStyle(Object.assign(s.params.labelStyleOptions, options.style))
    } else {
      label.setStyle(s.params.labelStyleOptions)
    }
    s.map.addOverlay(label)
    return label
  }
  /**
    * 绘制标记
    * @param {Point} point [lng, lat]
    * @param {Object} opt {
        options: {
          offset: {width: , height: }
          icon: {backgroundImage: url(), backgroundSize: ''}
          enableMassClear: Boolean	是否在调用map.clearOverlays清除此覆盖物，默认为true
          enableDragging: Boolean	是否启用拖拽，默认为false
          enableClicking: Boolean	是否响应点击事件。默认为true
          raiseOnDrag: Boolean	拖拽标注时，标注是否开启离开地图表面效果。默认为false
          draggingCursor: String	拖拽标注时的鼠标指针样式。此属性值需遵循CSS的cursor属性规范
          rotation: Number	旋转角度
          shadow: Icon	阴影图标
          title: String	鼠标移到marker上的显示内容
        },
        info: {
          style: Object 弹出窗口样式属性参考styleToBdIcon,
          html: String 弹出窗口HTML
        },
        currentData: 点击事件带入数据,
        onClick: 点击事件
    * }
    * @return {Marker} 标记对象
    */
  s.drawMarker = function (point, opt = {}) {
    if (!s.hasMap()) return
    // {options: {}, info: {}, data: null}
    // 绘制位置
    const bdPoint = s.pointToBdPoint(point)
    if (!bdPoint) return null
    // 弹出窗口
    if (!opt.info) opt.info = {}
    // 绘制图标
    if (!opt.options) opt.options = {}
    const marker = new BMap.Marker(bdPoint, {
      offset: s.whToBdSize(opt.options.offset),
      icon: s.styleToBdIcon(opt.options.iconStyle, opt.info.style),
      enableMassClear:
        typeof opt.options.enableMassClear === 'boolean' ? opt.options.enableMassClear : true, // 是否在调用map.clearOverlays清除此覆盖物，默认为true
      enableDragging:
        typeof opt.options.enableDragging === 'boolean' ? opt.options.enableDragging : false, // 是否启用拖拽，默认为false
      enableClicking:
        typeof opt.options.enableClicking === 'boolean' ? opt.options.enableClicking : true, // 是否响应点击事件。默认为true
      raiseOnDrag: typeof opt.options.raiseOnDrag === 'boolean' ? opt.options.raiseOnDrag : false, // 拖拽标注时，标注是否开启离开地图表面效果。默认为false
      draggingCursor: opt.options.draggingCursor || '', // 拖拽标注时的鼠标指针样式。此属性值需遵循CSS的cursor属性规范
      rotation: opt.options.rotation || 0, // 旋转角度
      shadow: opt.options.shadow || null, // 阴影图标
      title: opt.options.title || '' // 鼠标移到marker上的显示内容
    })
    s.map.addOverlay(marker)
    // 点击显示弹框
    if (opt.onClick) {
      marker.addEventListener('click', function (e) {
        // 弹出窗口
        if (opt.info.html) e.infoWindow = s.htmlToBdInfoWindow(opt.info.html)
        // 点击数据
        e.currentData = opt.currentData || null
        opt.onClick(e)
      })
    }
    return marker
  }
  /**
   * 绘制圆形
   * @param {Point} point [lng, lat]
   * @param {Number} radius 半径
   * @param {CircleOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b17
   * @return {Circle}
   */
  s.drawCircle = function (point, radius, options = {}) {
    if (!s.hasMap()) return
    const circle = s.pointToBdCircle(point, radius, options)
    if (!circle) return null
    s.map.addOverlay(circle)
    // 如果point不在中心, 需要设置圆形的中心点坐标: circle.setCenter(bdPoint)
    return circle
  }
  // 添加右键菜单
  s.addContextMenu = function (overlay, options = {}) {
    // options: {menus: [{text: '', handler: func()}]}
    if (!overlay) {
      console.warn(
        `addContextMenu: ${locale('请传入参数', 'SeedsUI_need_pass_parameter_error')}overlay`
      )
      options.fail &&
        options.fail({
          errMsg: `addContextMenu: ${locale(
            '请传入参数',
            'SeedsUI_need_pass_parameter_error'
          )}overlay`
        })
      return
    }
    if (
      !options.menus ||
      !Array.isArray(options.menus) ||
      !options.menus[0] ||
      !options.menus[0].text
    ) {
      console.warn(
        `addContextMenu: ${locale(
          '请传入参数',
          'SeedsUI_need_pass_parameter_error'
        )}{menus: [{text: "", handler: func()}]}`
      )
      options.fail &&
        options.fail({
          errMsg: `addContextMenu: ${locale(
            '请传入参数',
            'SeedsUI_need_pass_parameter_error'
          )}{menus: [{text: "", handler: func()}]}`
        })
      return
    }
    let markerMenu = new BMap.ContextMenu()
    for (let [index, opt] of options.menus.entries()) {
      markerMenu.addItem(
        new BMap.MenuItem(opt.text || locale('菜单', 'SeedsUI_menu'), function () {
          opt.handler(opt, index)
        })
      )
    }
    overlay.addContextMenu(markerMenu)
    return markerMenu
  }
  // 判断地图是否已经加载
  s.hasMap = function (hasContainer) {
    if (!BMap) {
      console.error(
        '请先引入百度地图api: <script src="//api.map.baidu.com/api?v=3.0&ak=xxx&s=1"></script>'
      )
      return false
    }
    if (hasContainer !== false && !s.map) return false
    return true
  }
  // 渲染地图
  s.initMap = function () {
    if (!s.hasMap()) return
    // 缩放导航
    if (s.params.navigation) {
      s.showNavigation(s.params.navigation)
    }
    // 中心位置
    if (s.params.center) {
      s.map.centerAndZoom(s.params.center)
    } else {
      s.map.centerAndZoom('北京')
    }
    // 开启鼠标滚轮缩放
    s.map.enableScrollWheelZoom(true)
  }
  s.initMap()
}

/**
 * 动态加载百度地图
 * @param {Object} params {
 *   ak: '百度地图ak',
 *   library: ['draw'], // 百度地图的其它库
 *   success: () => {},
 *   fail: ({errMsg: ''}) => {},
 * }
 */
async function _loadLibrary(options = {}) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    if (!Array.isArray(options?.library) || !options.library.length) {
      if (options?.success) options.success()
      resolve(true)
      return
    }
    // 判断系统系中是否包含此库
    let library = ['draw']
    let hasLibrary = false
    rootLoop: for (let sysLib of library) {
      for (let lib of options?.library) {
        if (sysLib === lib) {
          hasLibrary = true
          break rootLoop
        }
      }
    }
    if (hasLibrary === false) {
      if (options?.success) options.success()
      resolve(true)
      return
    }

    // 加载绘制库
    if (options?.library.indexOf('draw') !== -1) {
      Object.loadScript(
        'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js',
        null,
        (drawRes) => {
          if (!drawRes) {
            if (options?.fail) options.fail({ errMsg: `加载地图绘制库失败` })
            resolve(`加载地图绘制库失败`)
          } else {
            if (options?.success) options.success()
            resolve(true)
          }
        }
      )
    }
  })
}

BaiduMap.load = function (options = {}) {
  // 加载百度地图失败
  function loadError() {
    if (options.fail) options.fail({ errMsg: '加载地图失败' })
    // 加载失败移除dom
    if (document.getElementById(options.ak)) {
      document
        .getElementById(options.ak)
        .parentNode.removeChild(document.getElementById(options.ak))
    }
  }
  // window.BMAP_PROTOCOL = "https";
  // window.BMap_loadScriptTime = (new Date).getTime();
  // document.write(`<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=${options.ak}&services=&t=20200415105918"></script>`);
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    if (window.BMap) {
      let result = await _loadLibrary(options)
      resolve(result)
      return
    }
    if (!options.ak) {
      resolve('请在传入地图的密钥MapUtil.load({ak: ""})')
      if (options.fail) options.fail({ errMsg: '请在传入地图的密钥MapUtil.load({ak: ""})' })
      return
    }
    // 已经加载js库了, 防止重复加载
    let script = document.getElementById(options.ak)
    if (script) {
      console.log('百度地图正在加载, 请勿重新加载, 1秒后自动重试')
      setTimeout(async () => {
        if (window.BMap) {
          let result = await _loadLibrary(options)
          resolve(result)
        } else {
          loadError()
        }
      }, 1000)
      return
    }

    console.log('加载百度地图')
    window.BMAP_PROTOCOL = 'https'
    window.BMap_loadScriptTime = new Date().getTime()
    script = document.createElement('script')
    script.id = options.ak
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.src = `https://api.map.baidu.com/getscript?v=3.0&ak=${options.ak}&services=&t=20200415105918`
    document.body.appendChild(script)
    script.onload = async function () {
      // 加载绘制库
      let result = await _loadLibrary(options)
      resolve(result)
    }
    script.onerror = function (err) {
      loadError()
      resolve('加载地图失败')
    }
  })
}

export default BaiduMap
