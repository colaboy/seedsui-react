// 判断文件类型, 共用方法, 请勿随意修改
function supportTypes(src, types) {
  if (!Array.isArray(types) || !types.length) {
    return true
  }
  if (!src) {
    return false
  }

  // 提取文件扩展名
  let fileExtension = src.split('?')[0].split('.')
  fileExtension = fileExtension[fileExtension.length - 1].toLowerCase()
  if (!fileExtension) return false
  for (let type of types) {
    if (type === 'image') {
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'webp', 'svg'].includes(fileExtension)
      )
        return true
    } else if (type === 'video') {
      if (
        ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'mpeg', 'mpg', 'webm', '3gp', 'ogv'].includes(
          fileExtension
        )
      )
        return true
    } else if (type === 'audio') {
      if (
        ['mp3', 'wav', 'aac', 'flac', 'm4a', 'alac', 'ogg', 'wma', 'aiff', 'ape', 'opus'].includes(
          fileExtension
        )
      )
        return true
    } else if (type === 'word') {
      if (['docx', 'doc'].includes(fileExtension)) return true
    } else if (type === 'excel') {
      if (['xlsx', 'xls'].includes(fileExtension)) return true
    } else if (type === 'ppt') {
      if (['pptx', 'ppt'].includes(fileExtension)) return true
    } else if (type === 'text') {
      if (['txt'].includes(fileExtension)) return true
    } else {
      if (fileExtension === type) return true
    }
  }

  return false
}

export default supportTypes
