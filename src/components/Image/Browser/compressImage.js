import Compressor from 'compressorjs'

/**
 * 图片压缩
 * @param {File} image 图片
 * @param {String} backType 需要返回的类型blob、file、base64
 * @param {Number} quality 图片压缩比，数字越小，图片压缩越小
 * @return
 */
export default function compressImage(image, backType, { quality, maxWidth }) {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      maxWidth: maxWidth || '1279',
      quality: quality || 0.6,
      success(result) {
        if (!backType || backType === 'blob') {
          resolve(result)
        } else if (backType === 'file') {
          const file = new File([result], image.name, { type: image.type })
          resolve(file)
        } else if (backType === 'base64') {
          const reader = new FileReader()
          reader.readAsDataURL(result)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        }
      },
      error(err) {
        reject(err)
      }
    })
  })
}
