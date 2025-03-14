import ApiAxios from 'library/deprecated/ApiAxios'
import library_request from 'library_request'
import locale from 'library/utils/locale'

// 默认请求参数
export const DEFAULT_QUERY = {
  ...library_request.ImageUploader.uploadWechatImage
}

function uploadServerIds({
  serverIds,
  uploadDir,
  watermarkConfig,
  watermark,
  width,
  corpId,
  tenantId
}) {
  return new Promise((resolve) => {
    // 构建参数
    let uploadParams = DEFAULT_QUERY.onParams({
      serverIds,
      uploadDir,
      watermarkConfig,
      watermark,
      width,
      corpId,
      tenantId
    })

    ApiAxios.post(DEFAULT_QUERY.url, {
      data: uploadParams,
      head: DEFAULT_QUERY.head
    })
      .then((result) => {
        if (result.code === '1') {
          let list = DEFAULT_QUERY.onLoadSuccess(result, { tenantId })
          resolve(list)
          console.log('微信传勤策照片上传成功:' + JSON.stringify(result))
        } else {
          resolve(locale('上传失败', 'library.54e5de428ca9d59119d4624706215a4d'))
          console.error('微信传勤策照片上传失败:' + JSON.stringify(result))
        }
      })
      .catch((err) => {
        resolve(locale('上传异常', 'library.fca68477eea513705b6832eead2f87eb'))
        console.error('微信传勤策照片上传异常:' + JSON.stringify(err) + JSON.stringify(serverIds))
      })
  })
}

export default uploadServerIds
