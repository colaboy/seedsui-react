import startCoord from './startCoord'

// 绘制图片
function drawImg(fillStyle, { ctx, width, height }) {
  if (!fillStyle?.src) {
    console.log('SeedsUI Error:手写签名drawImg缺少imgSrc')
    return
  }
  let imgW = fillStyle.width
  let imgH = fillStyle.height
  let position = fillStyle.position || 'bottom right'

  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = fillStyle?.src
  img.onload = function (e) {
    let sx = 0 // 剪切的 x 坐标
    let sy = 0 // 剪切的 y 坐标
    let targetWidth = imgW || img.width // 使用的图像宽度
    let targetHeight = imgH || img.height // 使用的图像高度
    let swidth = img.width // 剪切图像的宽度
    let sheight = img.height // 剪切图像的高度
    let coord = startCoord(targetWidth, targetHeight, position) // 画布上放置xy坐标
    ctx.drawImage(img, sx, sy, swidth, sheight, coord.x, coord.y, width, height)
    // 成功回调
    if (fillStyle.onSuccess) fillStyle.onSuccess()
  }
  img.onerror = function (err) {
    if (fillStyle.onError) fillStyle.onError(err, { errMsg: '非法的图片格式' })
  }
}

export default drawImg
