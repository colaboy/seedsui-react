import MapUtil from './../../../MapUtil'
import GeoUtil from './../../../GeoUtil'
import Bridge from './../../../Bridge'
import locale from './../../../locale'
import Loading from './../../../Loading'
import Utils from './../../Combo/Utils'

// eslint-disable-next-line
export default function () {
  var s = this
  s.mapUtil = null
  // 标记
  s.marker = null
  // 初始化地图
  s.initMap = function (container, center, callback) {
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
        window.clearTimeout(s.loadTimeout)
        // 加载完成开始绘制
        s.mapUtil = mapUtil
        console.log('初始化地图完成')
        callback(mapUtil)
      },
      false
    )
    // 超时处理
    if (s.loadTimeout) window.clearTimeout(s.loadTimeout)
    s.loadTimeout = setTimeout(() => {
      Loading.hide()
      callback(locale('初始化地图超时, 请检查当前网络是否稳定', 'hint_map_init_timeout'))
    }, 20000)
  }

  // 拖拽选点
  s.initDragPoint = function (onChange) {
    s.drawTempMarker(false)
    // 拖拽点
    s.mapUtil.map.addEventListener('dragstart', () => {
      if (!s.marker) return
      s.showTempMarker()
      s.hideMarker()
    })
    s.mapUtil.map.addEventListener('dragend', (e) => {
      s.hideTempMarker()
      if (!s.marker) return
      // 获取中心点, 并绘制坐标点, 获取的point为国测局坐标
      let point = s.getCenterPoint(s.marker)
      // 显示坐标点
      s.showMarker()
      // 地址逆解析, point为国测局坐标
      Bridge.getAddress({
        // 只支持gcj02
        latitude: point[1],
        longitude: point[0],
        success: (result) => {
          const address = result && result.address ? result.address : ''
          result.value = address
          if (!result.latitude) result.latitude = point[1]
          if (!result.longitude) result.longitude = point[0]
          if (onChange) onChange(result)
        },
        fail: () => {
          if (onChange) onChange(null)
        }
      })
    })
  }

  /**
   * 临时中间点
   */
  // 绘制临时标记, 拖拽显示, 停止拖拽隐藏
  s.drawTempMarker = function (show) {
    if (!s.tempMarker) {
      s.tempMarker = document.createElement('span')
      s.tempMarker.className = 'map-marker-center'
      s.mapUtil.container.appendChild(s.tempMarker)
    }
    if (show) {
      s.showTempMarker()
    } else {
      s.hideTempMarker()
    }
  }
  s.showTempMarker = function () {
    if (s.tempMarker) {
      s.tempMarker.classList.remove('hide')
    }
  }
  s.hideTempMarker = function () {
    if (s.tempMarker) {
      s.tempMarker.classList.add('hide')
    }
  }

  /**
   * 绘制点
   */
  // 标记: 绘制标记, 更新原marker, 则传入marker
  s.drawMarker = function (point, marker) {
    let bdPoint = s.toBdPoint(point)
    if (!bdPoint) {
      console.error('绘制标记: 定位坐标错误')
      return null
    }
    if (!s.marker) {
      s.marker = s.mapUtil.drawMarker(bdPoint, {
        options: {
          iconStyle: {
            width: '16px',
            height: '27px',
            backgroundImage: `url(//res.waiqin365.com/d/seedsui/mapview/location_red_shadow.png)`
          }
        }
      })
    } else {
      s.marker.setPosition(bdPoint)
    }
    return s.marker
  }
  s.hideMarker = function () {
    if (s.marker) {
      s.marker.setOffset(new window.BMap.Size(10000, 10000))
    }
  }
  s.showMarker = function () {
    if (s.marker) {
      s.marker.setOffset(new window.BMap.Size(0, 0))
    }
  }

  /**
   * 工具方法
   */
  // 地图视图位置
  s.centerToPoint = function (point) {
    let bdPoint = s.toBdPoint(point)
    if (!bdPoint) {
      console.error('绘制标记: 定位坐标错误')
      return null
    }
    s.mapUtil.centerToPoint(bdPoint)
  }

  // 获取中心点
  s.getCenterPoint = function (marker) {
    let bdPoint = s.mapUtil.map.getCenter()
    if (marker) marker.setPosition(bdPoint)
    let point = [bdPoint.lng, bdPoint.lat]
    return GeoUtil.coordtransform(point, 'bd09', 'gcj02')
  }
  // 国测局转百度坐标
  s.toBdPoint = function (point) {
    let bdPoint = GeoUtil.coordtransform(point, 'gcj02', 'bd09')
    if (!s.mapUtil?.pointToBdPoint) return bdPoint
    return s.mapUtil.pointToBdPoint(bdPoint) // eslint-disable-line
  }
  // 搜索
  s.search = function (value) {
    Loading.show()
    s.mapUtil.search({
      keyword: value,
      success: (result) => {
        Loading.hide()
        console.log(result)
        if (result.data && result.data.list) {
        }
      },
      fail: () => {
        Loading.hide()
      }
    })
  }

  // 获取定位
  s.getLocation = Utils.getLocation

  s.destroy = function () {
    s.mapUtil = null
    // 标记
    s.marker = null
  }
}
