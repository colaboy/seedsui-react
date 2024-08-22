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
      `https://api.map.baidu.com/api?v=3.0&ak=${key}&services=&t=20200415105918`,
      {
        attrs: {
          id: 'bmap-map-js'
        }
      },
      (result) => {
        if (!result) {
          resolve(`百度地图加载失败`)
        } else {
          resolve(window.BMap)
        }
      }
    )
  })
}

export default loadBMap
