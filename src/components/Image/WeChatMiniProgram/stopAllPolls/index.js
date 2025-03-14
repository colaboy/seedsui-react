import library_request from 'library_request'

// 默认请求参数
export const DEFAULT_QUERY = {
  ...library_request.ImageUploader.getPhotos
}

// Get photos by polling interval
function stopAllPolls(currentId) {
  if (!window.wechatMiniprogramPolls) window.wechatMiniprogramPolls = {}
  window.wechatMiniprogramPolls[currentId] = true

  for (let id in window.wechatMiniprogramPolls) {
    window.clearTimeout(window[id])
  }
}

export default stopAllPolls
