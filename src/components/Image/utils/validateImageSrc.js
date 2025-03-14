// 校验照片是否存在
function validateImageSrc(src) {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = src
    img.onload = function () {
      resolve(true)
    }
    img.onerror = function () {
      resolve(false)
    }
  })
}

export default validateImageSrc
