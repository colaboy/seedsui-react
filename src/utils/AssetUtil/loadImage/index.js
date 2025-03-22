// 动态加载script的方法
function loadImage(src, { fail, success } = {}) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src

    const handleLoad = () => {
      resolve(true)
      if (typeof success === 'function') success(img)

      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
    const handleError = () => {
      resolve(false)
      if (typeof fail === 'function') fail()

      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)
  })
}

export default loadImage
