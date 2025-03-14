import locale from 'library/utils/locale'
import { Loading, Toast } from 'seedsui-react'
import ApiAxios from 'library/deprecated/ApiAxios'
import { getData as getCurrentUser } from 'library/utils/useCurrentUser'
import library_request from 'library_request'

// 默认请求参数
export const DEFAULT_QUERY = {
  ...library_request.ImageUploader.ocrCapability
}

const enums = {
  1001: locale('名片识别', 'library.4e5fe16384d51ba087fecf9261bca793'),
  1002: locale('营业执照', 'library.e0b8cc863d5ce01c5f6e820a5bfb6f45'),
  1003: locale('身份证识别', 'library.0a2de82e76c1b1be0cb7a4ca35350d01'),
  1010: locale('通用文字识别\n(含位置)', 'library.f47ed6e54d0bead9f82fd0c179cf7826'),
  '7464324257162176395': locale('通用文字识别', 'library.78f0a53a554a1d33523a20137f8f02fc')
}

// 新的OCR识别：单个照片识别
function recognizeItem(item, ocrParams) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 识别完成
    if (!item) {
      resolve(item)
      return
    }

    // 没有必要数据直接报错
    if (!item.src) {
      item.ocrErrMsg = locale(
        `缺少url参数, 无法进行ocr识别！`,
        'library.c77b7919511a5e215cf6df4ea9436823'
      )

      Toast.show({ content: item.ocrErrMsg })
      resolve(item)
      return
    }

    // 获取用户id
    if (!window?.loginUser) {
      window.loginUser = await getCurrentUser()
    }

    // Use bizId log ocr
    let bizId = Object.generateGUID()
    item.bizId = bizId

    ApiAxios.post(DEFAULT_QUERY.url, {
      data: {
        imageUrl: item.src,
        bizId: bizId,
        submitorId: window?.loginUser?.id || '',
        ...ocrParams
      },
      head: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        item.ocrResult = result || null

        Loading.hide()
        if (result?.code === '1') {
          resolve(item)
        } else {
          item.ocrErrMsg =
            result?.message || locale('名片识别失败！', 'library.3821e33cfaae10e36775841ba0efc1f0')
          Toast.show({ content: item.ocrErrMsg })
          Loading.hide()
          resolve(item)
        }
      })
      .catch(() => {
        Loading.hide()
        item.ocrErrMsg = locale('名片识别失败！', 'library.3821e33cfaae10e36775841ba0efc1f0')
        resolve(item)
      })
  })
}

export default { recognizeItem, enums }
