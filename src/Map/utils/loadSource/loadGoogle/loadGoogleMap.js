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
    Object.loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`,
      {
        attrs: {
          id: 'google-map-js'
        }
      },
      (result) => {
        if (!result) {
          resolve(`google地图加载失败`)
        } else {
          resolve(window.google)
        }
      }
    )
  })
}

export default loadGoogle
