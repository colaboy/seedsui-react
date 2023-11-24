// 绘制背景色
function drawBgColor(fillStyle, { ctx }) {
  ctx.fillStyle = fillStyle
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export default drawBgColor
