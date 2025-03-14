import axios from 'axios'
import { LocaleUtil } from 'seedsui-react'
const locale = LocaleUtil.locale

export default function uploadFile({ fileData, watermark, watermarkConfig }) {
  const formData = new FormData()

  formData.append('uploadPath', '2025/04')
  // isFullPath=1接口不补年月
  formData.append('isFullPath', '1')
  formData.append('file', fileData)
  if (watermark || watermarkConfig) {
    formData.append(
      'exts',
      JSON.stringify({
        watermarks: watermark || '',
        watermarkConfig: watermarkConfig || ''
      })
    )
  }

  return new Promise((resolve) => {
    axios
      .post('/platform/fileupload/v1/doUploadImageForMinProgram.do', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        const data = response?.data?.[0]
        if (!data) {
          resolve(
            response?.message || locale('上传照片失败', 'library.219e3f2feab8ec47ef362c25ce0f7162')
          )
          return
        }
        let tenantId = data.withTenantIdFilePath.replace('/' + data.filePath, '')
        if (isNaN(tenantId)) {
          console.log('未取到tenantId', data)
          tenantId = window.loginUser.tenantId
        }

        resolve({
          thumb: data.previewUrl,
          uploadDir: '2025/04',
          src: data.previewUrl,
          tenantId: tenantId,
          path: data.filePath
        })
      })
      .catch((error) => {
        resolve(locale('上传照片异常', 'library.42e53527c5f62f22dd31e8ace2d4c4f9'))
      })
  })
}
