import MapUtil from './../MapUtil'
import GeoUtil from './../../utils/GeoUtil'
import Loading from './../../components/Loading'
import Toast from './../../utils/Toast'
import locale from './../../utils/locale' // 国际化

// eslint-disable-next-line
export default function () {
  let s = this
  s.mapUtil = null
  // 是否中断未完成的绘制
  s.abort = false
  // 标记
  s.markers = null
  s.marker = null
  // 标签
  s.label = null
  // 地区
  s.district = null
  s.districtPolygons = null
  // 多边形
  s.polygon = null
  // 圆形
  s.circle = null
  // 初始化地图
  s.initMap = function (container, center, callback) {
    let self = this
    Loading.show()
    const mapUtil = new MapUtil(container, {
      onError: (s, err) => {
        if (callback) callback(err.errMsg)
      },
      // 缩放导航
      navigation: {
        position: 'bottom-right',
        type: 'zoom'
      },
      // 禁用点击景点弹出详细信息的方法
      mapOptions: {
        enableMapClick: false
      },
      // 中心位置
      center: center
    })
    mapUtil.map.addEventListener(
      'load',
      (e) => {
        Loading.hide()
        window.clearTimeout(self.loadTimeout)
        // 加载完成开始绘制
        self.mapUtil = mapUtil
        console.log('初始化地图完成')
        callback(mapUtil)
      },
      false
    )
    // 超时处理
    if (self.loadTimeout) window.clearTimeout(self.loadTimeout)
    self.loadTimeout = setTimeout(() => {
      Loading.hide()
      callback(locale('初始化地图超时, 请检查当前网络是否稳定', 'SeedsUI_mapinit_overtime_error'))
    }, 20000)
  }

  // 标记: 绘制全部标记
  s.drawMarkers = function (points) {
    let self = this
    if (!points || !points.length) {
      console.error('绘制标记: 定位坐标参数不能为空')
      return null
    }
    if (self.abort) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawMarkers(points)
      }, 500)
      return
    }
    // 绘制标记
    if (self.markers) {
      self.mapUtil.clearOverlays(self.markers)
    }
    self.markers = []
    for (let point of points) {
      let marker = self.drawMarker(point)
      self.markers.push(marker)
    }
    setTimeout(() => {
      let bdPoints = []
      for (let marker of self.markers) {
        bdPoints.push(marker.getPosition())
      }
      self.mapUtil.centerToPoints(bdPoints)
      console.log('绘制标记完成')
    }, 500)
    return self.markers
  }

  // 标记: 绘制标记, 更新原marker, 则传入marker
  s.drawMarker = function (point, marker) {
    let self = this
    self.marker = marker
    // 国测局转百度坐标
    let bdPoint = GeoUtil.coordtransform(point, 'gcj02', 'bd09')
    bdPoint = self.mapUtil.pointToBdPoint(bdPoint) // eslint-disable-line
    if (!bdPoint) {
      console.error('绘制标记: 定位坐标错误')
      return null
    }
    if (!self.marker) {
      self.marker = self.mapUtil.drawMarker(bdPoint, {
        options: {
          iconStyle: {
            width: '16px',
            height: '27px',
            backgroundImage: `url(//res.waiqin365.com/d/seedsui/mapview/location_red_shadow.png)`
          }
        }
      })
    } else {
      self.marker.setPosition(bdPoint)
    }
    return self.marker
  }

  // 圆形: 绘制标签
  s.drawLabel = function (point, radius) {
    let self = this
    if (self.abort) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawLabel(point, radius)
      }, 500)
      return
    }
    let bdPoint = GeoUtil.coordtransform(point)
    bdPoint = this.mapUtil.pointToBdPoint(bdPoint)
    if (!self.label) {
      self.label = self.mapUtil.drawLabel(
        bdPoint,
        locale(`半径${radius}米`, 'SeedsUI_radius_meters', [radius]),
        {
          offset: {
            width: 0,
            height: 14
          },
          style: {
            pointerEvents: 'none'
          }
        }
      )
    } else {
      self.label.setPosition(bdPoint)
      self.label.setContent(
        locale(`半径${Math.trunc(radius, 2)}米`, 'SeedsUI_radius_meters', [Math.trunc(radius, 2)])
      )
    }
  }

  // 绘制圆形
  s.drawCircle = function (point, radius) {
    let self = this
    if (self.abort) return
    if (!point || point.length !== 2) {
      console.log(`point参数${JSON.stringify(point)}格式不正确, 请传入[lng, lat]`)
      return
    }
    if (!radius) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawCircle(point, radius)
      }, 500)
      return
    }
    let bdPoint = GeoUtil.coordtransform(point)
    bdPoint = this.mapUtil.pointToBdPoint(bdPoint)
    if (self.circle) {
      self.circle.setCenter(bdPoint)
    } else {
      self.circle = self.mapUtil.drawCircle(bdPoint, radius)
    }
    if (!self.circle) return
    setTimeout(() => {
      self.mapUtil.centerToCircle(self.circle, {
        zoomFactor: -1
      })
    }, 300)
    console.log('绘制圆形完成')
    self.drawLabel(point, radius)
  }

  // 绘制多边形
  s.drawPolygon = function (polygon) {
    let self = this
    if (self.abort) return
    if (!polygon || !polygon.length) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawPolygon(polygon)
      }, 500)
      return
    }
    let bdPolygons = polygon.map((point) => {
      return GeoUtil.coordtransform(point)
    })
    if (self.polygon) {
      self.mapUtil.clearOverlay(self.polygon)
    }
    self.polygon = self.mapUtil.drawPolygon(bdPolygons)
    self.mapUtil.centerToPoints(bdPolygons)
    console.log('绘制多边形完成')
  }

  /**
   * 地区
   */
  s.drawDistrict = function (districtName) {
    let self = this
    if (self.abort) return
    if (!districtName) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawDistrict(districtName)
      }, 500)
      return
    }
    if (self.district) {
      self.mapUtil.clearOverlays(self.district)
    }
    self.mapUtil.drawBoundary(districtName, null, {
      success: (res) => {
        self.district = res.bdPolygons
        self.districtPolygons = res.polygons
        self.mapUtil.centerToPoints(res.bdPolygonsPath)
        console.log('绘制区域完成')
      },
      fail: (err) => {
        Toast.show({
          content: locale(`暂无${districtName}的边界数据`, 'SeedsUI_no_map_boundary_data', [
            districtName
          ])
        })
      }
    })
  }

  s.destroy = function () {
    let self = this
    console.log('移除标注')
    self.mapUtil = null
    // 标记
    self.markers = null
    // 标签
    self.label = null
    // 地区
    self.district = null
    self.districtPolygons = null
    // 多边形
    self.polygon = null
    // 圆形
    self.circle = null
  }
}
