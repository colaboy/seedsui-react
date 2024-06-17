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
  window.L.Projection.BaiduMercator = L.Util.extend({}, L.Projection.Mercator, {
    R: 6378206, //百度椭球赤道半径 a=6378206，相当于在 WGS84 椭球赤道半径上加了 69 米
    R_MINOR: 6356584.314245179, //百度椭球极半径 b=6356584.314245179，相当于在 WGS84 椭球极半径上减了 168 米
    bounds: new L.Bounds(
      [-20037725.11268234, -19994619.55417086],
      [20037725.11268234, 19994619.55417086]
    ) //数据覆盖范围在经度[-180°,180°]，纬度[-85.051129°, 85.051129°]之间
  })

  window.L.CRS.Baidu = L.Util.extend({}, L.CRS.Earth, {
    code: 'EPSG:Baidu',
    projection: L.Projection.BaiduMercator,
    transformation: new L.transformation(1, 0.5, -1, 0.5),
    scale: function (zoom) {
      return 1 / Math.pow(2, 18 - zoom)
    },
    zoom: function (scale) {
      return 18 - Math.log(1 / scale) / Math.LN2
    },
    wrapLng: undefined
  })

  window.L.TileLayer.BaiduTileLayer = L.TileLayer.extend({
    initialize: function (param, options) {
      var templateImgUrl =
        '//maponline{s}.bdimg.com/starpic/u=x={x};y={y};z={z};v=009;type=sate&qt=satepc&fm=46&app=webearth2&v=009'
      var templateUrl = '//maponline{s}.bdimg.com/tile/?x={x}&y={y}&z={z}&{p}'
      var myUrl = param === 'img' ? templateImgUrl : templateUrl
      options = L.extend(
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
      L.TileLayer.prototype.initialize.call(this, myUrl, options)
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
    _setZoomTransform: function (level, center, zoom) {
      center = L.latLng(coordTransform([center.lng, center.lat], 'wgs84', 'bd09').reverse()) // 采用 gcoord 库进行纠偏
      L.TileLayer.prototype._setZoomTransform.call(this, level, center, zoom)
    },
    _getTiledPixelBounds: function (center) {
      center = L.latLng(coordTransform([center.lng, center.lat], 'wgs84', 'bd09').reverse()) // 采用 gcoord 库进行纠偏
      return L.TileLayer.prototype._getTiledPixelBounds.call(this, center)
    }
  })

  // 出口样式
  window.L.tileLayer.baiduTileLayer = function (param, options) {
    return new L.TileLayer.BaiduTileLayer(param, options)
  }

  // 渲染类型: 新
  // var img_Layer = L.tileLayer.baiduTileLayer('img'), // 影像底图
  //   vsl01_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=sl&showtext=0&scaler=1&v=083') // 影像标注，路网
  // vsl11_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=sl&showtext=1&scaler=1&v=083') // 影像标注，路网 + 注记
  // vsl12_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=sl&showtext=1&scaler=2&v=083') // 影像标注，路网 + 高清注记
  // vpl01_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=0&scaler=1&v=083') // 电子地图，图形
  // vpl11_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=1&scaler=1&v=083') // 电子地图，图形 + 注记
  // vpl12_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=1&scaler=2&v=083') // 电子地图，图形 + 高清注记
  // vph01_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=ph&showtext=0&scaler=1&v=083') // 大字体电子地图，图形
  // vph11_Layer = L.tileLayer.baiduTileLayer('qt=vtile&styles=ph&showtext=1&scaler=1&v=083') // 大字体电子地图，图形 + 注记

  // 渲染类型: 旧
  // _sl11_Layer = L.tileLayer.baiduTileLayer('qt=tile&styles=sl&showtext=1&scaler=1&v=083') // 旧影像标注，路网 + 注记
  // _sl12_Layer = L.tileLayer.baiduTileLayer('qt=tile&styles=sl&showtext=1&scaler=2&v=083') // 旧影像标注，路网 + 高清注记
  // _pl11_Layer = L.tileLayer.baiduTileLayer('qt=tile&styles=pl&showtext=1&scaler=1&v=083') // 旧电子地图，图形 + 注记
  // _pl12_Layer = L.tileLayer.baiduTileLayer('qt=tile&styles=pl&showtext=1&scaler=2&v=083') // 旧电子地图，图形 + 高清注记
  // _ph11_Layer = L.tileLayer.baiduTileLayer('qt=tile&styles=ph&showtext=1&scaler=1&v=083') // 旧大字体电子地图，图形 + 注记
}
export default loadBMapLayer
