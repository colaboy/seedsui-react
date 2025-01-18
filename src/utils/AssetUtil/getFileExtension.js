// 获取文件扩展名
function getFileExtension(src) {
  let fileExtension = src.split('?')[0].split('.')
  return fileExtension[fileExtension.length - 1].toLowerCase()
}

export default getFileExtension
