import drawBgColor from './drawBgColor'

const rotateBase64 = (data, { backgroundColor }) => {
  //传入需要旋转的base64图片
  // 生成图片，将图片旋转指定角度后绘制到canvas上
  return new Promise((resolve, reject) => {
    let img = document.createElement('img')

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 } // 裁剪坐标
    img.onload = () => {
      const imgWidth = img.width
      const imgHeight = img.height
      const size = imgHeight
      canvas.width = size * 2
      canvas.height = size * 2
      cutCoor.sx = size
      cutCoor.sy = size - imgWidth
      cutCoor.ex = size + imgHeight
      cutCoor.ey = size + imgWidth
      ctx.translate(size, size)
      ctx.rotate(-Math.PI / 2) // 旋转-90度

      // 绘制背景
      if (
        backgroundColor &&
        typeof backgroundColor === 'string' &&
        backgroundColor !== 'transparent'
      ) {
        drawBgColor(backgroundColor, { ctx })
      }

      // 绘制图片
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey)
      canvas.width = imgHeight
      canvas.height = imgWidth
      ctx.putImageData(imgData, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.setAttribute('src', data)
  })
}

export default rotateBase64
