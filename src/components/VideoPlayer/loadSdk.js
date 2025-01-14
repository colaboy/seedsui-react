// 加载SDK
function loadSdk() {
  const idSdkCss = '_seedsui_videoplayer_css_'
  const idSdkScript = '_seedsui_videoplayer_script_'
  return new Promise((resolve) => {
    var css = document.getElementById(idSdkCss)
    if (!css) {
      var head = document.getElementsByTagName('head')[0]
      var link = document.createElement('link')
      link.id = idSdkCss
      link.href = '//g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css'
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('type', 'text/css')
      head.appendChild(link)
    }
    var script = document.getElementById(idSdkScript)
    if (!script) {
      script = document.createElement('script')
      script.id = idSdkScript
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.src = '//g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js'
      document.body.appendChild(script)
      script.onload = function () {
        resolve(true)
      }
      script.onerror = function () {
        resolve(false)
      }
    } else {
      resolve(true)
    }
  })
}

export default loadSdk
