// 内库使用-start
import AssetUtil from '../../../../../utils/AssetUtil'
// 内库使用-end

/* 测试使用-start
import { AssetUtil } from 'seedsui-react'
测试使用-end */

// 加载google地图资源
function loadGoogle(key) {
  return new Promise((resolve) => {
    if (window.google) {
      resolve(window.google)
      return
    }

    // Delete old script
    const scriptTag = document.getElementById('google-map-js')
    if (scriptTag) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    // Load js
    AssetUtil.loadJs(`https://maps.googleapis.com/maps/api/js?key=${key}`, {
      id: 'google-map-js',
      success: () => {
        resolve(window.google)
      },
      fail: () => {
        resolve(`google地图加载失败`)
      }
    })
  })
}

export default loadGoogle
