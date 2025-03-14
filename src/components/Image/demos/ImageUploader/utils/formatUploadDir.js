import URLUtil from 'library/utils/URLUtil'

// 格式化目录地址
function formatUploadDir(uploadDir, month = true) {
  // eslint-disable-next-line
  if (!uploadDir) uploadDir = 'imageuploader'
  // return uploadDir
  return URLUtil.uploadDir(uploadDir, { month: month })
}

export default formatUploadDir
