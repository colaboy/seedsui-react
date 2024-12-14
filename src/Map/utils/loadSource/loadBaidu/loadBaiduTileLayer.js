import coordsToFit from './../../coordsToFit'

// CRS
const mapUrl =
  'https://maponline{s}.bdimg.com/onlinelabel/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt='

// 加载百度插件
function loadBMapLayer() {
  if (window.L.tileLayer.currentTileLayer) {
    return
  }

  const projection = window.L.Util.extend({}, window.L.Projection.Mercator, {
    // 百度椭球赤道半径 a=6378206，相当于在 WGS84 椭球赤道半径上加了 69 米
    R: 6378206,
    // 百度椭球极半径 b=6356584.314245179，相当于在 WGS84 椭球极半径上减了 168 米
    R_MINOR: 6356584.314245179,
    // 数据覆盖范围在经度[-180°,180°]，纬度[-85.051129°, 85.051129°]之间
    bounds: new window.L.Bounds(
      [-20037725.11268234, -19994619.55417086],
      [20037725.11268234, 19994619.55417086]
    )
  })

  window.L.CRS.Baidu = window.L.Util.extend({}, window.L.CRS.Earth, {
    code: 'EPSG:Baidu',
    projection: projection,
    transformation: new window.L.transformation(1, 0.5, -1, 0.5),
    scale: function (zoom) {
      return 1 / Math.pow(2, 18 - zoom)
    },
    zoom: function (scale) {
      return 18 - Math.log(1 / scale) / Math.LN2
    },
    wrapLng: undefined
  })

  const BaiduTileLayer = window.L.TileLayer.extend({
    initialize: function (options) {
      // eslint-disable-next-line
      options = window.L.extend(
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
      window.L.TileLayer.prototype.initialize.call(this, mapUrl, options)
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
    // 国外不纠，国内wgs84转bd09
    _setZoomTransform: function (level, _center, zoom) {
      let center = coordsToFit({
        longitude: _center.lng,
        latitude: _center.lat,
        type: 'wgs84',
        inChinaTo: 'bd09'
      })
      center = window.L.latLng([center.latitude, center.longitude])
      window.L.TileLayer.prototype._setZoomTransform.call(this, level, center, zoom)
    },
    _getTiledPixelBounds: function (_center) {
      let center = coordsToFit({
        longitude: _center.lng,
        latitude: _center.lat,
        type: 'wgs84',
        inChinaTo: 'bd09'
      })
      center = window.L.latLng([center.latitude, center.longitude])
      return window.L.TileLayer.prototype._getTiledPixelBounds.call(this, center)
    }
  })

  // 出口样式
  window.L.tileLayer.currentTileLayer = function () {
    return new BaiduTileLayer()
  }
}
export default loadBMapLayer
