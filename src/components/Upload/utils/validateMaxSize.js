// 校验文件框上传文件大小
function validateMaxSize(target, maxSize) {
  if (isNaN(target) === false && maxSize) {
    if (Number(target) > maxSize) {
      return false
    }
  }
  if (maxSize && target.value && target.files[0] && target.files[0].size) {
    if (target.files[0].size > maxSize) {
      return false
    }
  }
  return true
}

export default validateMaxSize
