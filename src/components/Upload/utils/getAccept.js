// 获取文件类型
function getAccept(types) {
  if (!Array.isArray(types) || !types.length) return ''
  let accepts = types.map((type) => {
    if (type === 'image') {
      return 'image/*'
    } else if (type === 'video') {
      return 'video/*'
    } else if (type === 'audio') {
      return 'audio/*'
    } else if (type === 'txt') {
      return 'text/plain'
    } else if (type === 'html' || type === 'htm') {
      return 'text/html'
    } else if (type === 'css') {
      return 'text/css'
    } else if (type === 'js' || type === 'mjs') {
      return 'text/javascript'
    } else if (type === 'json') {
      return 'application/json'
    } else if (type === 'xml') {
      return 'application/xml'
    } else if (type === 'jpeg' || type === 'jpg') {
      return ' image/jpeg'
    } else if (type === 'png' || type === 'gif' || type === 'bmp' || type === 'webp') {
      return `image/${type}`
    } else if (type === 'svg') {
      return 'image/svg+xml'
    } else if (type === 'mp3') {
      return 'audio/mpeg'
    } else if (type === 'wav' || type === 'wav') {
      return `audio/${type}`
    } else if (type === 'ogv') {
      return 'video/ogg'
    } else if (type === 'mp4' || type === 'webm') {
      return `video/${type}`
    } else if (type === 'pdf' || type === 'zip') {
      return `application/${type}`
    } else if (type === 'doc') {
      return 'application/msword'
    } else if (type === 'docx') {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    } else if (type === 'xls') {
      return 'application/vnd.ms-excel'
    } else if (type === 'xlsx') {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } else if (type === 'ppt') {
      return 'application/vnd.ms-powerpoint'
    } else if (type === 'pptx') {
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    } else if (type === 'rar') {
      return 'application/x-rar-compressed'
    } else if (type === '7z') {
      return 'application/x-7z-compressed'
    } else if (type === 'tar') {
      return 'application/x-tar'
    }
    return ''
  })
  return accepts.join(',')
}

export default getAccept
