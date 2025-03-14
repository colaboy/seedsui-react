import ApiAxios from 'library/deprecated/ApiAxios'
import library_request from 'library_request'
import locale from 'library/utils/locale'
import { Ocr, formatThumb } from './../../utils'

// 默认请求参数
export const DEFAULT_QUERY = {
  ...library_request.ImageUploader.getPhotos
}

// Get photos by polling interval
function getPhotos(id, { uploadDir, ocrParams }) {
  return new Promise((resolve) => {
    ApiAxios.get(`${DEFAULT_QUERY.url}?fileCheckKey=${id}`)
      .then(async (result) => {
        if (result.code === '1' || result.code === '3012004') {
          // 新列表
          let list = (result.data || []).map((item) => {
            let others = {}
            try {
              others = item.extString ? JSON.parse(item.extString) : {}
            } catch (error) {
              others = {}
            }

            let newItem = {
              ...others,
              thumb: formatThumb(item?.previewUrl || ''),
              src: item?.previewUrl || '',
              uploadDir: uploadDir,
              status: 'success'
            }

            if (item?.filePath) {
              newItem.path = item.filePath
            }
            return newItem
          })

          // ocr识别
          if (ocrParams) {
            for (let item of list) {
              // To add ocr info when no ocr info
              if (!item.bizId || !item.ocrResult) {
                // eslint-disable-next-line
                item = await Ocr.recognizeItem(item, ocrParams)
              }
            }
          }

          // 返回列表
          resolve(list)
        } else {
          resolve(result.message)
        }
      })
      .catch((error) => {
        resolve(locale('获取照片异常', 'library.a189fb8a40ac4d851d6888b886c0022f'))
      })
  })
}

export default getPhotos
