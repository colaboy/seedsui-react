/**
 * @overview
 * @param {Point} 格式:[latitude, longitude]
 * @param {Polygon} 格式:[[latitude, longitude], [latitude, longitude]]
 * @param {Line} 格式:[latitude1, longitude1, latitude2, longitude2]
 * @param {Line<Array>} 格式:[[latitude1, longitude1, latitude2, longitude2]]
 */

var GeoUtil = {}
;(function () {
  /**
   * 多边形转线
   * @param {Polygon} polygon 多边形
   * @param {Boolean} isRegular 是否要求是一个标准的多边形, 如果传true, 则返回集合会加上首尾互连
   * @return {Line<Array>} [[[lng, lat], [lng, lat]], [[lng, lat], [lng, lat]]]
   */
  GeoUtil.polygonToLines = function (polygon, isRegular) {
    var lines = []
    // 取出所有相邻的线
    for (var i = 0; i < polygon.length - 1; i++) {
      lines.push([
        [polygon[i][0], polygon[i][1]],
        [polygon[i + 1][0], polygon[i + 1][1]]
      ])
    }
    // 再将首尾互连, 防止出现一个不规则的多边形, 例如五角星
    if (isRegular) {
      lines.push([
        [polygon[polygon.length - 1][0], polygon[polygon.length - 1][1]],
        [polygon[0][0], polygon[0][1]]
      ])
    }
    return lines
  }

  /**
   * 判断点是否在多边形里
   * @param {Point} point 点
   * @param {Polygon} polygon 多边形
   * @return {Boolean}
   */
  GeoUtil.pointInsidePolygon = function (point, polygon) {
    var x = point[0],
      y = point[1]

    var inside = false
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      var xi = polygon[i][0],
        yi = polygon[i][1]
      var xj = polygon[j][0],
        yj = polygon[j][1]

      // eslint-disable-next-line
      var intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }

    return inside
  }
  /**
   * 判断两条线是否相交
   * @param {Line} line0 [[lng, lat], [lng, lat]]
   * @param {Line} line1 [[lng, lat], [lng, lat]]
   * @return {Boolean}
   */
  GeoUtil.lineIntersectLine = function (line0, line1) {
    if (line0.length !== 2) return false
    if (line1.length !== 2) return false
    if (line0[0].length !== 2) return false
    if (line0[1].length !== 2) return false
    if (line1[0].length !== 2) return false
    if (line1[1].length !== 2) return false

    let a = line0[0][1]
    let b = line0[0][0]
    let c = line0[1][1]
    let d = line0[1][0]

    let p = line1[0][1]
    let q = line1[0][0]
    let r = line1[1][1]
    let s = line1[1][0]
    // var [a,b,c,d] = line0
    // var [p,q,r,s] = line1
    var det, gamma, lambda
    det = (c - a) * (s - q) - (r - p) * (d - b)
    if (det === 0) {
      return false
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
      return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
    }
  }
  /**
   * 判断多边形是否在多边形里
   * @param {Polygon} py0 多边形
   * @param {Polygon} py1 多边形
   * @return {Boolean}
   */
  GeoUtil.polygonInsidePolygon = function (py0, py1) {
    // 判断一个多边形的一个点是否位于另一个多边形多边形内
    var i
    var inside = 0
    for (i = 0; i < py0.length; i += 1) {
      if (GeoUtil.pointInsidePolygon(py0[i], py1)) {
        inside++
      }
    }
    if (inside === py0.length) return true

    inside = 0
    for (i = 0; i < py1.length; i += 1) {
      if (GeoUtil.pointInsidePolygon(py1[i], py0)) {
        inside++
      }
    }
    if (inside === py0.length) return true

    return false
  }

  /**
   * 是否是不合法的经纬度
   * @param {Point} point 含经纬度点
   * @return {Boolean}
   */
  GeoUtil.isPoint = function (point) {
    var precision = 2e-10
    if (Math.abs(point[0]) < precision && Math.abs(point[1]) < precision) {
      return false
    } else {
      return true
    }
  }

  /**
   * 是否是相同的点
   * @param {Point} p0
   * @param {Point} p1
   * @return {Boolean}
   */
  GeoUtil.equalPoint = function (p0, p1) {
    var precision = 2e-8
    if (Math.abs(p0[0] - p1[0]) < precision && Math.abs(p0[1] - p1[1]) < precision) {
      return true
    } else {
      return false
    }
  }

  /**
   * 获取两个坐标间的中心点
   * @param {Point} p0
   * @param {Point} p1
   * @return {Point}
   */
  GeoUtil.getMiddlePoint = function (p0, p1) {
    return [(p0[0] + p0[1]) / 2, (p1[0] + p1[1]) / 2]
  }

  /**
   * 判断是否是一个合法的多边形, 具体为多边形, 且不允许交叉, 或者五角星等不规则的多边形
   * @param {Polygon} polygon [[lng, lat], [lng, lat], [lng, lat]]
   * @returns {Boolean}
   */
  GeoUtil.isPolygon = function (polygon) {
    // 获取边线, [[[lng, lat], [lng, lat]], [[lng, lat], [lng, lat]]]
    var lines = GeoUtil.polygonToLines(polygon, true)
    for (var i = 0; i < lines.length; i++) {
      for (var j = i + 1; j < lines.length; j++) {
        if (GeoUtil.lineIntersectLine(lines[i], lines[j])) return false
      }
    }
    return true
  }

  /**
   * 判断点是否在线上
   * @param {Line} line
   * @param {Point} point
   * @return {Boolean}
   */
  GeoUtil.pointOnLine = function (point, line) {
    // 首先判断该点是否在该线段的外包矩形内
    if (
      point[1] >= Math.min(line[1], line[3]) &&
      point[1] <= Math.max(line[1], line[3]) &&
      point[0] >= Math.min(line[0], line[2]) &&
      point[0] <= Math.max(line[0], line[2])
    ) {
      // 判断点是否在直线上公式
      var precision =
        (line[1] - point[1]) * (line[2] - point[0]) - (line[3] - point[1]) * (line[0] - point[0])
      if (precision < 2e-10 && precision > -2e-10) {
        // 实质判断是否接近0
        return true
      }
    }
    return false
  }
  /**
   * 获得两个点之间的距离
   * @param {Point} p0 // [lng, lat]
   * @param {Point} p1 // [lng, lat]
   * @return {Number} km, 错误返回-1
   */
  GeoUtil.getDistance = function (p0, p1) {
    if (!p0[0] || !p0[1] || !p1[0] || !p1[1]) {
      return -1
    }
    var lng1 = p0[0]
    var lat1 = p0[1]
    var lng2 = p1[0]
    var lat2 = p1[1]
    var radLat1 = (lat1 * Math.PI) / 180.0
    var radLat2 = (lat2 * Math.PI) / 180.0
    var a = radLat1 - radLat2
    var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    var s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    return s
  }
  /**
   * 多边形坐标点按逆时针排序, 从右上角开始到右下角结束
   * @param {Polygon} points [[lng, lat]]
   * @return {Polygon} 错误返回-1
   * 参考:https://cs.stackexchange.com/questions/52606/sort-a-list-of-points-to-form-a-non-self-intersecting-polygon
   */
  GeoUtil.sortPoints = function (points) {
    points = points.splice(0)
    var p0 = {}
    p0[1] = Math.min.apply(
      null,
      points.map((p) => p[1])
    )
    p0[0] = Math.max.apply(
      null,
      points.filter((p) => p[1] === p0[1]).map((p) => p[0])
    ) // 将==改为===以兼容eslint
    points.sort((a, b) => angleCompare(p0, a, b))
    return points
  }
  function angleCompare(p0, a, b) {
    var left = isLeft(p0, a, b)
    if (left === 0) return distCompare(p0, a, b) // 将==改为===以兼容eslint
    return left
  }

  function isLeft(p0, a, b) {
    return (a[0] - p0[0]) * (b[1] - p0[1]) - (b[0] - p0[0]) * (a[1] - p0[1])
  }

  function distCompare(p0, a, b) {
    var distA = (p0[0] - a[0]) * (p0[0] - a[0]) + (p0[1] - a[1]) * (p0[1] - a[1])
    var distB = (p0[0] - b[0]) * (p0[0] - b[0]) + (p0[1] - b[1]) * (p0[1] - b[1])
    return distA - distB
  }
  /**
   * 坐标转换
   * @param {Point} point [lng, lat]
   * @param {String} from 原始坐标类型 'wgs84 | gcj02 | bd09'
   * @param {String} to 转换坐标类型 'wgs84 | gcj02 | bd09'
   * @return {Point} 错误返回null
   */
  GeoUtil.coordtransform = function (point, from, to) {
    if (!point || point.length !== 2) {
      console.log('GeoUtil coordtransform: point参数不正确')
      return null
    }
    if (from === to) return point
    if (!from) return point
    if (!to) return point
    // 定义一些常量
    var x_PI = (3.14159265358979324 * 3000.0) / 180.0
    var PI = 3.1415926535897932384626
    var a = 6378245.0
    var ee = 0.00669342162296594323
    // 百度经纬度坐标转国测局坐标
    function bd09togcj02(bd_lon, bd_lat) {
      var x_pi = (3.14159265358979324 * 3000.0) / 180.0
      var x = bd_lon - 0.0065
      var y = bd_lat - 0.006
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
      var gg_lng = z * Math.cos(theta)
      var gg_lat = z * Math.sin(theta)
      return [gg_lng, gg_lat]
    }
    // 国测局坐标转百度经纬度坐标
    function gcj02tobd09(lng, lat) {
      var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
      var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
      var bd_lng = z * Math.cos(theta) + 0.0065
      var bd_lat = z * Math.sin(theta) + 0.006
      return [bd_lng, bd_lat]
    }

    // WGS84转国测局坐标
    function wgs84togcj02(lng, lat) {
      if (out_of_china(lng, lat)) {
        return [lng, lat]
      } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0)
        var dlng = transformlng(lng - 105.0, lat - 35.0)
        var radlat = (lat / 180.0) * PI
        var magic = Math.sin(radlat)
        magic = 1 - ee * magic * magic
        var sqrtmagic = Math.sqrt(magic)
        dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
        var mglat = lat + dlat
        var mglng = lng + dlng
        return [mglng, mglat]
      }
    }
    // 国测局坐标转换为WGS84
    function gcj02towgs84(lng, lat) {
      if (out_of_china(lng, lat)) {
        return [lng, lat]
      } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0)
        var dlng = transformlng(lng - 105.0, lat - 35.0)
        var radlat = (lat / 180.0) * PI
        var magic = Math.sin(radlat)
        magic = 1 - ee * magic * magic
        var sqrtmagic = Math.sqrt(magic)
        dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
        dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
        var mglat = lat + dlat
        var mglng = lng + dlng
        return [lng * 2 - mglng, lat * 2 - mglat]
      }
    }

    function transformlat(lng, lat) {
      var ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng))
      ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
      ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0
      ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0
      return ret
    }

    function transformlng(lng, lat) {
      var ret =
        300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
      ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
      ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0
      ret +=
        ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0
      return ret
    }

    function out_of_china(lng, lat) {
      // 判断是否在国内, 不在国内则不做偏移
      return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
    }

    // 方法总结
    let longitude = Number(point[0])
    let latitude = Number(point[1])
    if (from === 'gcj02' && to === 'bd09') {
      return gcj02tobd09(longitude, latitude)
    }
    if (from === 'bd09' && to === 'gcj02') {
      return bd09togcj02(longitude, latitude)
    }
    if (from === 'wgs84' && to === 'gcj02') {
      return wgs84togcj02(longitude, latitude)
    }
    if (from === 'gcj02' && to === 'wgs84') {
      return gcj02towgs84(longitude, latitude)
    }
    console.log('GeoUtil coordtransform: form或者to参数不正确, 返回原坐标')
    return point
  }
  /**
   * 坐标转换
   * @param {Array<Point>} points [[lng, lat]]
   * @param {String} from 原始坐标类型 'wgs84 | gcj02 | bd09'
   * @param {String} to 转换坐标类型 'wgs84 | gcj02 | bd09'
   * @return {Point} 错误返回null
   */
  GeoUtil.coordstransform = function (points, from = 'gcj02', to = 'bd09') {
    if (!points || !points.length) {
      console.log('GeoUtil coordstransform: points参数为空')
      return points
    }
    if (!points[0] || points[0].length !== 2) {
      console.log('GeoUtil coordstransform: points参数不正确, 应当传入[[lng, lat], [lng, lat]]')
      return points
    }
    if (from === to) return points
    if (!from) return points
    if (!to) return points
    return points.map((point) => {
      return GeoUtil.coordtransform(point, from, to)
    })
  }
})()

export default GeoUtil
