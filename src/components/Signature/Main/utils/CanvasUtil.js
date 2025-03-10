const CanvasUtil = {
  toBase64: function (canvas, { suffix = 'image/png', quality = 0.92 }) {
    return canvas.toDataURL(suffix, quality)
  },
  isBlank: function (canvas) {
    let blank = document.createElement('canvas')
    blank.width = canvas.width
    blank.height = canvas.height
    if (canvas.toDataURL() === blank.toDataURL()) return true
    return false
  },
  clear: function (canvas) {
    let width = canvas.width
    let height = canvas.height
    let ctx = canvas?.ctx ? canvas.ctx : canvas.getContext('2d')

    ctx.clearRect(0, 0, width, height)
  },
  // 旋转base64图片-90度
  rotateBase64: function (base64, { backgroundColor }) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        // 创建画布并调整尺寸
        const canvas = document.createElement('canvas')
        canvas.width = img.height // 交换宽高
        canvas.height = img.width

        // 获取绘图上下文
        const ctx = canvas.getContext('2d')

        // 应用变换：移动到画布底部 + 逆时针旋转90度
        ctx.translate(0, canvas.height)
        ctx.rotate(-Math.PI / 2)

        // 绘制背景
        if (
          backgroundColor &&
          typeof backgroundColor === 'string' &&
          backgroundColor !== 'transparent'
        ) {
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, ctx.canvas.height, ctx.canvas.width)
        }

        // 绘制原始图像
        ctx.drawImage(img, 0, 0)

        // 导出为Base64
        resolve(canvas.toDataURL())
      }
      img.onerror = () => {
        console.error('CanvasUtil.rotateBase64 failed')
        resolve('')
      }
      img.src = base64
    })
  }
}

export default CanvasUtil
