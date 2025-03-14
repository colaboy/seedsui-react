import locale from 'library/utils/locale'
import { validateImageSrc } from './../../utils'
import uploadFile from './uploadFile'

// 上传
function uploadItem(item, { watermarkConfig, uploadDir }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let fileData = item.fileData

    // 用临时方案尝试
    let serverItem = await uploadFile({
      fileData,
      uploadDir: uploadDir,
      watermark: item?.watermark?.list || [],
      watermarkConfig
    })

    // 上传失败
    if (typeof serverItem === 'string') {
      resolve(serverItem)
      return
    }

    // 校验其是否真的是否法图片
    let isValid = await validateImageSrc(serverItem.src)
    if (!isValid) {
      resolve(locale('图片加载失败，请重试', 'library.419ade42d1243fe183355b7930c4f830'))
      return
    }

    resolve({
      ...item,
      ...serverItem,
      // 状态
      status: 'success'
    })
  })
}

export default uploadItem
