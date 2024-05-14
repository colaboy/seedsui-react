import MapUtil from './../MapUtil'
import GeoUtil from './../GeoUtil'
import Loading from './../Loading'
import Bridge from './../Bridge'
import locale from './../locale' // 国际化

// eslint-disable-next-line
export default function () {
  var s = this
  s.mapUtil = null
  // 是否中断未完成的绘制
  s.abort = false
  // 标记
  s.markers = null
  s.tempMarker = null
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
    var self = this
    Loading.show()
    const mapUtil = new MapUtil(container, {
      // 缩放导航
      navigation: {
        position: 'bottom-right',
        type: 'zoom'
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
        self.drawTempMarker(false)
        // 拖拽点
        mapUtil.map.addEventListener('dragstart', () => {
          self.showTempMarker()
          self.hideMarker()
        })
        mapUtil.map.addEventListener('dragend', (e) => {
          self.hideTempMarker()
          if (!self.marker) return
          // 获取中心点, 并绘制坐标点, 获取的point为国测局坐标
          let point = self.getCenterPoint(self.marker)
          // 显示坐标点
          self.showMarker()
          // 地址逆解析, point为国测局坐标
          self.getAddress(point, {
            success: (result) => {
              if (self.onDragEnd) self.onDragEnd(result)
            },
            fail: () => {
              if (self.onDragEnd) self.onDragEnd(null)
            }
          })
        })
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
  // 获取中心点
  s.getCenterPoint = function (marker) {
    var self = this
    let bdPoint = self.mapUtil.map.getCenter()
    if (marker) marker.setPosition(bdPoint)
    let point = [bdPoint.lng, bdPoint.lat]
    return GeoUtil.coordtransform(point, 'bd09', 'gcj02')
  }
  // 绘制临时标记, 拖拽显示, 停止拖拽隐藏
  s.drawTempMarker = function (show) {
    var self = this
    if (!self.tempMarker) {
      self.tempMarker = document.createElement('span')
      self.tempMarker.className = 'map-marker-center'
      self.mapUtil.container.appendChild(self.tempMarker)
    }
    if (show) {
      self.showTempMarker()
    } else {
      self.hideTempMarker()
    }
  }
  s.showTempMarker = function () {
    var self = this
    if (self.tempMarker) {
      self.tempMarker.classList.remove('hide')
    }
  }
  s.hideTempMarker = function () {
    var self = this
    if (self.tempMarker) {
      self.tempMarker.classList.add('hide')
    }
  }
  // 初始化标记, 并逆解析地址
  s.initMarker = async function (point, callback) {
    var self = this
    if (!point) {
      console.error('初始化标记: 定位坐标参数不能为空')
      return null
    }
    if (self.abort) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.initMarker(point, callback)
      }, 500)
      return
    }

    // 绘制坐标点
    self.drawMarker(point)

    // 地址逆解析
    let result = await self.getAddress(point)
    if (callback) callback(result)
  }
  // 绘制坐标点, point为国测局坐标
  s.drawMarker = function (point) {
    var self = this
    if (!point) {
      console.error('绘制标记: 定位坐标参数不能为空')
      return null
    }
    if (self.abort) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawMarker(point)
      }, 500)
      return
    }
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
    // 只绘制一个定位到地图中心点
    setTimeout(() => {
      self.mapUtil.centerToPoints(bdPoint)
    }, 500)
  }
  s.hideMarker = function () {
    var self = this
    if (self.marker) {
      self.marker.setOffset(new window.BMap.Size(10000, 10000))
    }
  }
  s.showMarker = function () {
    var self = this
    if (self.marker) {
      self.marker.setOffset(new window.BMap.Size(0, 0))
    }
  }
  // 地址逆解析
  s.getAddress = async function (point, params = {}) {
    return new Promise(async (resolve) => {
      const result = await Bridge.getAddress({
        // 只支持gcj02
        latitude: point[1],
        longitude: point[0],
        ...(params || {})
      })
      resolve(result)
    })
  }
  s.destroy = function () {
    var self = this
    console.log('移除标注')
    self.mapUtil = null
    // 标记
    self.markers = null
    self.marker = null
  }
}
