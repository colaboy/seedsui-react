// 校验文件框上传文件大小
function validateMaxSize(target, maxSize) {
  if (maxSize && target.value && target.files[0] && target.files[0].size) {
    // 体积控制
    if (target.files[0].size / 1024 > maxSize) {
      return false
    }
  }
  return true
}

export default validateMaxSize
