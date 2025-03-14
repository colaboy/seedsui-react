import { Toast } from 'seedsui-react'
import ApiAxios from 'library/deprecated/ApiAxios'
import library_request from 'library_request'
import locale from 'library/utils/locale'

// 默认请求参数
export const DEFAULT_QUERY = {
  ...library_request.ImageUploader.savePhotos
}

// Save photos at delete
function clearPhotos(id) {
  return new Promise((resolve) => {
    ApiAxios.post(DEFAULT_QUERY.url, {
      data: {
        fileCheckKey: id,
        imageParamList: []
      }
    })
      .then((result) => {
        if (result.code === '1') {
          resolve(true)
        } else {
          Toast.show({ content: result.message })
          resolve(false)
        }
      })
      .catch((error) => {
        Toast.show({ content: locale('照片删除异常', 'library.c6def5fa7c7e41ced1921c9e09ce97bb') })
        resolve(false)
      })
  })
}

export default clearPhotos
