// 内库使用
// import GeoUtil from './../../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// function correctCoord(point) {
//   if (!point?.lng || !point?.lat) {
//     console.error('correctCoord invalid parameter:', point)
//     return null
//   }

//   let isChina = GeoUtil.isInChina([point.lng, point.lat])
//   if (isChina === true) {
//     let newPoint = GeoUtil.coordtransform([point.lng, point.lat], 'wgs84', 'gcj02')
//     return {
//       ...point,
//       lng: newPoint[0],
//       lat: newPoint[1]
//     }
//   }

//   return point
// }

// 加载google地图leaflet插件
function loadGoogleMutant() {
  return new Promise((resolve) => {
    if (window.L.tileLayer.currentTileLayer) {
      resolve(true)
      return
    }

    // Delete old script
    const scriptTag = document.getElementById('google-map-mutant-js')
    if (scriptTag) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    // Load js
    // 'https://unpkg.com/leaflet.gridlayer.googlemutant@latest/dist/Leaflet.GoogleMutant.js'
    Object.loadScript(
      '//res.waiqin365.com/d/seedsui/leaflet/js/Leaflet.GoogleMutant.js',
      {
        attrs: {
          id: 'google-map-mutant-js'
        }
      },
      (result) => {
        if (!result) {
          resolve(`googleMutant地图加载失败`)
        } else {
          // L.GridLayer.include({
          //   _setZoomTransform: function (level, _center, zoom) {
          //     let center = _center
          //     if (center !== undefined) {
          //       center = correctCoord(_center)
          //       console.log('1:', center, _center)
          //     }
          //     let scale = this._map.getZoomScale(zoom, level.zoom),
          //       translate = level.origin
          //         .multiplyBy(scale)
          //         .subtract(this._map._getNewPixelOrigin(center, zoom))
          //         .round()

          //     if (L.Browser.any3d) {
          //       L.DomUtil.setTransform(level.el, translate, scale)
          //     } else {
          //       L.DomUtil.setPosition(level.el, translate)
          //     }
          //   },
          //   _getTiledPixelBounds: function (_center) {
          //     let center = _center
          //     if (center !== undefined) {
          //       center = correctCoord(_center)
          //       console.log('2:', center, _center)
          //     }
          //     let map = this._map,
          //       mapZoom = map._animatingZoom
          //         ? Math.max(map._animateToZoom, map.getZoom())
          //         : map.getZoom(),
          //       scale = map.getZoomScale(mapZoom, this._tileZoom),
          //       pixelCenter = map.project(center, this._tileZoom).floor(),
          //       halfSize = map.getSize().divideBy(scale * 2)

          //     return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize))
          //   }
          // })
          window.L.tileLayer.currentTileLayer = function () {
            return window.L.gridLayer.googleMutant({ type: 'roadmap' })
          }
          resolve(true)
        }
      }
    )
  })
}

export default loadGoogleMutant
