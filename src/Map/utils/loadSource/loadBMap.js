// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 加载BMap地图资源
function loadBMap(key) {
  return new Promise((resolve) => {
    if (window.BMap) {
      resolve(window.BMap)
      return
    }

    // Delete old script
    const scriptTag = document.getElementById('bmap-map-js')
    if (scriptTag) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    // Load js
    Object.loadScript(
      `https://api.map.baidu.com/api?v=3.0&ak=${key}&callback=&callback=onBMapLoad`,
      {
        attrs: {
          id: 'bmap-map-js'
        }
      },
      (result) => {
        window.onBMapLoad = function () {
          if (window.BMap) {
            resolve(window.BMap)
          } else {
            resolve(locale(`地图库加载失败, 请稍后再试`, 'SeedsUI_map_js_load_failed'))
          }
        }
      }
    )
  })
}

export default loadBMap
