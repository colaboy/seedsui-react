import MapUtil from './../../MapUtil'
import Bridge from './../../Bridge'

let self = null
let zoomNum = 18
let BMap

export default {
  // 初始化地图
  initMap: function (container, opt = {}, callback) {
    self = this
    const { center = '', list = [] } = opt
    self.list = list
    Bridge.showLoading()
    var mapUtil = new MapUtil(container, {
      // 缩放导航
      // navigation: {
      //   position: 'bottom-right',
      //   type: 'zoom',
      //   offset: {
      //     width: 10,
      //     height: 60
      //   }
      // },
      // 禁用点击景点弹出详细信息的方法
      mapOptions: {
        enableMapClick: true
      },
      // 中心位置
      center
    })
    mapUtil.map.addEventListener(
      'load',
      (e) => {
        Bridge.hideLoading()
        BMap = window.BMap
        // 加载完成开始绘制
        self.mapUtil = mapUtil
        // 绘制地图
        self.drawMap(list, true)
        self.markersControl(opt)
        self.markersClose(opt)
        self.location(callback)
        self.init = true
      },
      false
    )

    // mapUtil.map.addEventListener(
    //   'zoomend',
    //   (e) => {
    //     // 重新绘制一次，在放大缩小的时候，出现icon消失问题
    //     // 清除覆盖物
    //     self.mapUtil.clearOverlays()

    //     // 动态生成多个marker标记
    //     // self.drawMarkers(self.list)

    //     // zoomNum = mapUtil.map.getZoom();
    //   },
    //   false
    // )

    mapUtil.map.addEventListener('dragend', function showInfo() {
      // 清除覆盖物
      self.mapUtil.clearOverlays()
      var cp = mapUtil.map.getCenter()

      var geoc = new BMap.Geocoder() //地址解析对象
      geoc.getLocation(cp, function (rs) {
        var addComp = rs.addressComponents
        var address =
          addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
        callback && callback(address)
      })

      mapUtil.map.centerAndZoom(cp, zoomNum)

      // 绘制中心点marker标记
      self.drawMarkers([
        {
          lng: cp.lng,
          lat: cp.lat
        }
      ])
    })

    return mapUtil
  },
  drawMap: function (list, isInit = false) {
    self.list = list
    if (!isInit) {
      // 清除覆盖物
      self.mapUtil.clearOverlays()
    }
    // 设置中心点的位置，自动适配缩放级别
    self.setNewCenter(list)

    // 动态生成多个marker标记
    self.drawMarkers(list)

    // 绘制折线
    self.drawPolyline(list)
  },
  setNewCenter: function (list) {
    const points = list.map((l) => [l.lng, l.lat])
    self.mapUtil.centerToPoints(points, {})
  },
  drawMarkers: function (list) {
    list.forEach((item, index) => {
      self.drawMarker([item.lng, item.lat], { key: '', ...item })
    })
  },
  drawMarker: function (point, opt) {
    self.mapUtil.drawLabel(point, opt.key, {
      offset: { width: -4, height: -30 },
      style: { padding: 0, backgroundColor: 'none', color: '#FFF', fontSize: '14px' }
    })

    self.mapUtil.drawMarker(point, {
      options: {
        iconStyle: {
          width: 36,
          height: 36,
          marginTop: 12,
          marginLeft: 34,
          backgroundImage: `url(${'//res.waiqin365.com/d/waiqin365_h5/components/location.png'})`
        }
      },
      info: {
        html: opt.html
      },
      onClick: function (e) {
        self.mapUtil.map.openInfoWindow(e.infoWindow, self.mapUtil.pointToBdPoint(point))
      }
    })
  },
  drawPolyline: function (list) {
    let visitedList = list.map((item) => [item.lng, item.lat])
    if (visitedList.length) {
      let visitPolyline = new BMap.Polyline(self.mapUtil.pointsToBdPoints(visitedList), {
        strokeOpacity: 0.7,
        strokeColor: '#00AF57'
      })
      self.mapUtil.map.addOverlay(visitPolyline)
    }
  },
  // 定位控件
  markersControl: function (opt) {
    function MarkerControl() {
      this.defaultAnchor = window.BMAP_ANCHOR_BOTTOM_RIGHT
      this.defaultOffset = new BMap.Size(0, 0)
    }
    MarkerControl.prototype = new BMap.Control()
    MarkerControl.prototype.initialize = function (map) {
      let div = document.createElement('div')
      let img = document.createElement('img')
      img.style.height = '22px'
      img.style.width = '22px'
      img.style.marginLeft = '4px'
      img.src = '//res.waiqin365.com/d/waiqin365_h5/components/position.png'
      div.appendChild(img)
      let span = document.createElement('span')
      span.style.marginLeft = '4px'
      div.appendChild(span)
      div.style.display = 'flex'
      div.style.justifyContent = 'center'
      div.style.alignItems = 'center'
      div.style.width = '30px'
      div.style.height = '30px'
      div.style.marginBottom = '6px'
      div.style.marginRight = '6px'
      div.style.cursor = 'pointer'
      div.style.borderRadius = '50%'
      div.style.backgroundColor = 'white'
      div.onclick = function (e) {
        opt.onMapLocation && opt.onMapLocation()
      }
      // 添加DOM元素到地图中
      map.getContainer().appendChild(div)
      return div
    }
    let myMarkerCtrl = new MarkerControl()
    //添加到地图中
    self.mapUtil.map.addControl(myMarkerCtrl)
  },
  // 关闭
  markersClose: function (opt) {
    function MarkerControl() {
      this.defaultAnchor = window.BMAP_ANCHOR_TOP_RIGHT
      this.defaultOffset = new BMap.Size(0, 0)
    }
    MarkerControl.prototype = new BMap.Control()
    MarkerControl.prototype.initialize = function (map) {
      let div = document.createElement('div')
      let icon = document.createElement('i')
      icon.className = 'icon-rdo-close-fill'
      icon.style.fontSize = '20px'
      icon.style.color = '#707070'
      div.appendChild(icon)
      let span = document.createElement('span')
      span.style.marginLeft = '4px'
      div.appendChild(span)
      div.style.display = 'flex'
      div.style.justifyContent = 'center'
      div.style.alignItems = 'center'
      div.style.width = '30px'
      div.style.height = '30px'
      div.style.marginTop = '6px'
      div.style.marginRight = '4px'
      div.style.cursor = 'pointer'
      div.style.borderRadius = '50%'
      div.onclick = function (e) {
        opt.onMapClose && opt.onMapClose()
      }
      // 添加DOM元素到地图中
      map.getContainer().appendChild(div)
      return div
    }
    let myMarkerCtrl = new MarkerControl()
    //添加到地图中
    self.mapUtil.map.addControl(myMarkerCtrl)
  },
  location: function (callback) {
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var latitude = position.coords.latitude //纬度
            var longitude = position.coords.longitude //经度
            var myPos = new BMap.Point(longitude, latitude)
            var pointArr = []
            pointArr.push(myPos)
            var convertor = new BMap.Convertor()
            convertor.translate(pointArr, 1, 5, (data) => {
              let { lng, lat } = data.points[0]
              self.mapUtil.map.centerAndZoom(new BMap.Point(lng, lat), zoomNum)
              self.mapUtil.map.clearOverlays()
              // 绘制中心点marker标记
              self.drawMarkers([
                {
                  lng,
                  lat
                }
              ])
              var geoc = new BMap.Geocoder() //地址解析对象
              geoc.getLocation(new BMap.Point(lng, lat), function (rs) {
                var addComp = rs.addressComponents
                var address =
                  addComp.province +
                  addComp.city +
                  addComp.district +
                  addComp.street +
                  addComp.streetNumber
                callback && callback(address)
              })
            })
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert('定位失败,用户拒绝请求地理定位')
                break
              case error.POSITION_UNAVAILABLE:
                alert('定位失败,位置信息是不可用')
                break
              case error.TIMEOUT:
                alert('定位失败,请求获取用户位置超时')
                break
              case error.UNKNOWN_ERROR:
                alert('定位失败,定位系统失效')
                break
              default:
                break
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 5000
            // coordsType: 'gcj02'
            // geocode: true
          }
        )
      } else {
        alert('浏览器不支持地理定位。')
      }
    }, 300)
    // Bridge.getLocation({
    //   type: 'gcj02',
    //   success: (data) => {
    //     if (data.errMsg === 'getLocation:ok') {
    //       let { country, province, city, district, street, latitude, longitude } = data
    //       let nowAddress =
    //         (country || '') + (province || '') + (city || '') + (district || '') + (street || '')
    //       callback && callback(nowAddress)
    //       let points = GeoUtil.coordtransform([longitude, latitude], 'gcj02', 'bd09')
    //       let lng = ''
    //       let lat = ''
    //       if (Array.isArray(points) && points.length > 1) {
    //         lng = points[0]
    //         lat = points[1]
    //       }
    //       self.mapUtil.map.centerAndZoom(new BMap.Point(lng, lat), zoomNum)
    //       self.mapUtil.map.clearOverlays()
    //       // 绘制中心点marker标记
    //       self.drawMarkers([
    //         {
    //           lng,
    //           lat
    //         }
    //       ])
    //     }
    //     // alert(JSON.stringify(data))
    //   },
    //   fail: (err) => {}
    // })
    // setTimeout(() => {
    //   var geolocation = new BMap.Geolocation()
    //   geolocation.getCurrentPosition(
    //     function (r) {
    //       let { country, province, city, district, street } = r?.address || {}
    //       let nowAddress =
    //         (country || '') + (province || '') + (city || '') + (district || '') + (street || '')
    //       alert(nowAddress)

    //     },
    //     {
    //       enableHighAccuracy: true, //是否要求高精度的地理位置信息
    //       timeout: 1000, //对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
    //       maximumAge: 60 * 1000 //设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
    //     }
    //   )
    // }, 300)
  },
  localSearch: function (val, callback) {
    var map = new BMap.Map('l-map')
    let local = new BMap.LocalSearch(self.mapUtil.map, {
      renderOptions: { map: map },
      onSearchComplete: function (r) {
        callback && callback(r?.Cr || [])
      }
    })
    local.search(val)
  }
}
