import locale from 'library/utils/locale'
import { validateImageSrc, formatUploadDir, formatThumb } from './../utils'
import base64LocalIds from './base64LocalIds'
import uploadImage from './uploadImage'

// 单张照片上传
function uploadItem(item, { timeout, uploadDir, ext, isAI }) {
  return new Promise((resolve) => {
    let localBase64 = item?.thumb
    let localId = item?.localId
    let errMsg = ''
    if (!localId || typeof localId !== 'string') {
      errMsg = locale('没有localId，无法上传！', 'library.0b5a059d51b08eb356049ae82c36aab6')
      resolve(errMsg)
      return
    }

    const tenantId = window.loginUser?.tenantId || ''
    if (!tenantId) {
      errMsg = locale('没有企业id，无法上传！', 'library.0c0f8a96ae642679d041504200fc5ee5')
      resolve(errMsg)
      return
    }
    let imageUrl = window.loginUser?.imageUrl || ''
    if (!imageUrl) {
      errMsg = locale('没有图片服务器，无法上传！', 'library.8fb784b29c5f7f5afeb4c985eb003e59')
      resolve(errMsg)
      return
    }
    if (imageUrl.substring(imageUrl.length - 1) !== '/') imageUrl = imageUrl + '/' // 结尾带/

    let uploadParams = {
      // 离线超时时长
      timeout: timeout,
      uploadDir: formatUploadDir(uploadDir),
      localId: localId,
      tenantId: tenantId,
      // 全屏遮罩被Loading.show接管
      isShowProgressTips: 0,
      success: async function (res) {
        let src = `${imageUrl}${tenantId}/${res.path}`
        let thumb = formatThumb(src)

        // 勤策客户端离线上传将会返回localId
        let offlineSrc = ''
        let offlineThumb = ''

        // 离线照片
        if (res.localId) {
          // 如果没传入离线图片，则生成离线图片
          if (!localBase64) {
            localBase64 = await base64LocalIds([localId])
            localBase64 = localBase64[0]
          }

          offlineSrc = localBase64
          offlineThumb = localBase64
        }
        // 非离线照片，校验其是否真的是否法图片
        else {
          let isValid = await validateImageSrc(src)
          if (!isValid) {
            console.log('客户端返回的图片地址访问失败:', src)
            resolve(locale('图片加载失败，请重试', 'library.419ade42d1243fe183355b7930c4f830'))
            return
          }
        }

        resolve({
          ...item,
          thumb: thumb,
          src: src,
          offlineThumb: offlineThumb,
          offlineSrc: offlineSrc,
          tenantId: res.tenantId,
          localId: localId,
          path: res.path,
          // 增加场景校验结果
          isAI: isAI,
          // 状态
          status: 'success'
        })
      },
      fail: function (err) {
        // errMsg = err.errMsg
        // resolve(errMsg)
        console.error('勤策客户端上传照片失败:', err)
        // 产品要求统一错误提示语
        resolve(locale('照片上传失败，请重新上传', 'library.9f7d4b1e701779860b6aa663ce44d68c'))
      }
    }

    // 其它参数
    if (ext && ext.component_id && ext.component_id.indexOf(',') !== -1) {
      ext.component_id = ext.component_id.substring(ext.component_id.lastIndexOf(',') + 1)
    }
    if (isAI === '1') {
      // eslint-disable-next-line
      if (!ext) ext = {}
      if (!ext.hasOwnProperty('isAutoCheck')) {
        ext.isAutoCheck = '1'
      }
    }
    uploadParams.ext = {
      ...(ext || {})
    }

    // 过滤无用项
    if (uploadParams.ext) {
      for (let extName in uploadParams.ext) {
        if (uploadParams.ext[extName] === null) {
          delete uploadParams.ext[extName]
        }
      }
    }

    uploadImage(uploadParams)
  })
}

export default uploadItem
