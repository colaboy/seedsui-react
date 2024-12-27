import startCoord from './startCoord'

// 绘制文字
function drawText(fillStyle = {}, { ctx, width, height }) {
  if (!fillStyle?.text) {
    console.log('SeedsUI Error:手写签名drawFont缺少文字')
    return
  }
  let fontSize = fillStyle.fontSize || 15
  let fontFamily = fillStyle.fontFamily || 'microsoft yahei'
  let fontPosition = fillStyle.position || 'bottom center'
  let fontStyle = fillStyle.color || 'rgba(0, 0, 0, 1)'
  if (isNaN(fontSize)) {
    console.log('SeedsUI Error:文字大小请输入数字类型')
    return
  }
  let targetHeight = fontSize
  let targetWidth = fillStyle.text.length * targetHeight

  // 起始绘制的xy坐标
  let coord = startCoord(targetWidth, targetHeight, fontPosition, { ctx, width, height })

  // 计算的位置中文字的中线所以需要往下移动一些绘制
  let calcY =
    coord.y === 0
      ? Number(coord.y) + Number(targetHeight)
      : Number(coord.y) + Number(targetHeight) - 5 // 文字垂直位置有整个高度的偏差

  // 写字
  ctx.font = fontSize + 'px ' + fontFamily
  ctx.fillStyle = fontStyle
  ctx.fillText(fillStyle.text, coord.x, calcY)
}

export default drawText
