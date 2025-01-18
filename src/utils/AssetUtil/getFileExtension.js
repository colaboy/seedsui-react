// 获取文件扩展名
function getFileExtension(src) {
  if (typeof src !== 'string') {
    return ''
  }
  // 使用正则表达式提取文件扩展名
  const match = src.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/)
  return match ? match[1] : null
}

export default getFileExtension
