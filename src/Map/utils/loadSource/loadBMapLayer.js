// 内库使用
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// 百度地图瓦片图层插件
function loadBMapLayer() {
  return new Promise((resolve) => {
    initPlugin()
    resolve(window.L.tileLayer.baiduTileLayer)
  })
}
const mapUrl =
  'https://maponline{s}.bdimg.com/onlinelabel/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt='

// 初始化插件
function initPlugin() {
  const projection = L.Util.extend({}, window.L.Projection.Mercator, {
    R: 6378206, //百度椭球赤道半径 a=6378206，相当于在 WGS84 椭球赤道半径上加了 69 米
    R_MINOR: 6356584.314245179, //百度椭球极半径 b=6356584.314245179，相当于在 WGS84 椭球极半径上减了 168 米
    bounds: new L.Bounds(
      [-20037725.11268234, -19994619.55417086],
      [20037725.11268234, 19994619.55417086]
    ) //数据覆盖范围在经度[-180°,180°]，纬度[-85.051129°, 85.051129°]之间
  })

  window.L.CRS.Baidu = window.L.Util.extend({}, window.L.CRS.Earth, {
    code: 'EPSG:Baidu',
    projection: projection,
    transformation: new L.transformation(1, 0.5, -1, 0.5),
    scale: function (zoom) {
      return 1 / Math.pow(2, 18 - zoom)
    },
    zoom: function (scale) {
      return 18 - Math.log(1 / scale) / Math.LN2
    },
    wrapLng: undefined
  })

  window.L.TileLayer.BaiduTileLayer = window.L.TileLayer.extend({
    initialize: function (options) {
      // eslint-disable-next-line
      options = L.extend(
        {
          getUrlArgs: (o) => {
            return { x: o.x, y: -1 - o.y, z: o.z }
          },
          subdomains: ['0', '1', '2', '3'],
          minZoom: 0,
          maxZoom: 23,
          minNativeZoom: 1,
          maxNativeZoom: 18
        },
        options
      )
      L.TileLayer.prototype.initialize.call(this, mapUrl, options)
    },
    getTileUrl: function (coords) {
      if (this.options.getUrlArgs) {
        return L.Util.template(
          this._url,
          L.extend(
            { s: this._getSubdomain(coords), r: L.Browser.retina ? '@2x' : '' },
            this.options.getUrlArgs(coords),
            this.options
          )
        )
      } else {
        return L.TileLayer.prototype.getTileUrl.call(this, coords)
      }
    },
    // wgs84转bd09
    _setZoomTransform: function (level, center, zoom) {
      // eslint-disable-next-line
      center = window.L.latLng(
        GeoUtil.coordtransform([center.lng, center.lat], 'wgs84', 'bd09').reverse()
      ) // 采用 gcoord 库进行纠偏
      window.L.TileLayer.prototype._setZoomTransform.call(this, level, center, zoom)
    },
    _getTiledPixelBounds: function (center) {
      // eslint-disable-next-line
      center = window.L.latLng(
        GeoUtil.coordtransform([center.lng, center.lat], 'wgs84', 'bd09').reverse()
      ) // 采用 gcoord 库进行纠偏
      return window.L.TileLayer.prototype._getTiledPixelBounds.call(this, center)
    }
  })

  // 出口样式
  window.L.tileLayer.baiduTileLayer = function () {
    return new window.L.TileLayer.BaiduTileLayer()
  }
}
export default loadBMapLayer
