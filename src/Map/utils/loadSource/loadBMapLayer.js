// 测试使用
// import { GeoUtil } from 'seedsui-react'
// 内库使用
import GeoUtil from './../../../GeoUtil'

// 百度地图瓦片图层插件
function loadBMapLayer() {
  return new Promise((resolve) => {
    initPlugin()
    resolve(window.L.tileLayer.baiduTileLayer)
  })
}

// 坐标转换
function coordTransform(point, from, to) {
  return GeoUtil.coordtransform(point, from, to)
}

// 初始化插件
function initPlugin() {
  window.L.Projection.BaiduMercator = window.L.Util.extend({}, window.L.Projection.Mercator, {
    R: 6378206, //百度椭球赤道半径 a=6378206，相当于在 WGS84 椭球赤道半径上加了 69 米
    R_MINOR: 6356584.314245179, //百度椭球极半径 b=6356584.314245179，相当于在 WGS84 椭球极半径上减了 168 米
    bounds: new window.L.Bounds(
      [-20037725.11268234, -19994619.55417086],
      [20037725.11268234, 19994619.55417086]
    ) //数据覆盖范围在经度[-180°,180°]，纬度[-85.051129°, 85.051129°]之间
  })

  window.L.CRS.Baidu = window.L.Util.extend({}, window.L.CRS.Earth, {
    code: 'EPSG:Baidu',
    projection: window.L.Projection.BaiduMercator,
    transformation: new window.L.transformation(1, 0.5, -1, 0.5),
    scale: function (zoom) {
      return 1 / Math.pow(2, 18 - zoom)
    },
    zoom: function (scale) {
      return 18 - Math.log(1 / scale) / Math.LN2
    },
    wrapLng: undefined
  })

  window.L.TileLayer.BaiduTileLayer = window.L.TileLayer.extend({
    initialize: function (param, options) {
      let templateImgUrl =
        '//maponline{s}.bdimg.com/starpic/u=x={x};y={y};z={z};v=009;type=sate&qt=satepc&fm=46&app=webearth2&v=009'
      let templateUrl = '//maponline{s}.bdimg.com/tile/?x={x}&y={y}&z={z}&{p}'
      let myUrl = param === 'img' ? templateImgUrl : templateUrl
      // eslint-disable-next-line
      options = window.L.extend(
        {
          getUrlArgs: (o) => {
            return { x: o.x, y: -1 - o.y, z: o.z }
          },
          p: param,
          subdomains: '0123',
          minZoom: 0,
          maxZoom: 23,
          minNativeZoom: 1,
          maxNativeZoom: 18
        },
        options
      )
      window.L.TileLayer.prototype.initialize.call(this, myUrl, options)
    },
    getTileUrl: function (coords) {
      if (this.options.getUrlArgs) {
        return window.L.Util.template(
          this._url,
          window.L.extend(
            { s: this._getSubdomain(coords), r: window.L.Browser.retina ? '@2x' : '' },
            this.options.getUrlArgs(coords),
            this.options
          )
        )
      } else {
        return window.L.TileLayer.prototype.getTileUrl.call(this, coords)
      }
    },
    _setZoomTransform: function (level, center, zoom) {
      // eslint-disable-next-line
      center = window.L.latLng(coordTransform([center.lng, center.lat], 'wgs84', 'bd09').reverse()) // 采用 gcoord 库进行纠偏
      window.L.TileLayer.prototype._setZoomTransform.call(this, level, center, zoom)
    },
    _getTiledPixelBounds: function (center) {
      // eslint-disable-next-line
      center = window.L.latLng(coordTransform([center.lng, center.lat], 'wgs84', 'bd09').reverse()) // 采用 gcoord 库进行纠偏
      return window.L.TileLayer.prototype._getTiledPixelBounds.call(this, center)
    }
  })

  // 出口样式
  window.L.tileLayer.baiduTileLayer = function (param, options) {
    return new window.L.TileLayer.BaiduTileLayer(param, options)
  }

  // 渲染类型: 新
  // var img_Layer = window.L.tileLayer.baiduTileLayer('img'), // 影像底图
  //   vsl01_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=sl&showtext=0&scaler=1&v=083') // 影像标注，路网
  // vsl11_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=sl&showtext=1&scaler=1&v=083') // 影像标注，路网 + 注记
  // vsl12_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=sl&showtext=1&scaler=2&v=083') // 影像标注，路网 + 高清注记
  // vpl01_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=0&scaler=1&v=083') // 电子地图，图形
  // vpl11_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=1&scaler=1&v=083') // 电子地图，图形 + 注记
  // vpl12_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=1&scaler=2&v=083') // 电子地图，图形 + 高清注记
  // vph01_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=ph&showtext=0&scaler=1&v=083') // 大字体电子地图，图形
  // vph11_Layer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=ph&showtext=1&scaler=1&v=083') // 大字体电子地图，图形 + 注记

  // 渲染类型: 旧
  // _sl11_Layer = window.L.tileLayer.baiduTileLayer('qt=tile&styles=sl&showtext=1&scaler=1&v=083') // 旧影像标注，路网 + 注记
  // _sl12_Layer = window.L.tileLayer.baiduTileLayer('qt=tile&styles=sl&showtext=1&scaler=2&v=083') // 旧影像标注，路网 + 高清注记
  // _pl11_Layer = window.L.tileLayer.baiduTileLayer('qt=tile&styles=pl&showtext=1&scaler=1&v=083') // 旧电子地图，图形 + 注记
  // _pl12_Layer = window.L.tileLayer.baiduTileLayer('qt=tile&styles=pl&showtext=1&scaler=2&v=083') // 旧电子地图，图形 + 高清注记
  // _ph11_Layer = window.L.tileLayer.baiduTileLayer('qt=tile&styles=ph&showtext=1&scaler=1&v=083') // 旧大字体电子地图，图形 + 注记
}
export default loadBMapLayer
