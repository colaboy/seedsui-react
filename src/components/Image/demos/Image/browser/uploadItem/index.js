import { Image, LocaleUtil } from 'seedsui-react'
import uploadFile from './uploadFile'
const locale = LocaleUtil.locale
// 上传
function uploadItem(item) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let fileData = item.fileData

    // 用临时方案尝试
    let serverItem = await uploadFile({
      fileData,
      watermark: item?.watermark?.list || []
    })

    // 上传失败
    if (typeof serverItem === 'string') {
      resolve(serverItem)
      return
    }

    // 校验其是否真的是否法图片
    let isValid = await Image.validateImageSrc(serverItem.src)
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
