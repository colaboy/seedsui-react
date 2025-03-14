import DB from 'library/deprecated/DB'
import locale from 'library/utils/locale'
import { formatUploadDir, validateImageSrc } from './../../utils'
import uploadLocalId from './uploadLocalId'
import uploadServerIds from './uploadServerIds'

// 单张照片上传
function uploadItem(item, { watermarkConfig, uploadDir, width, isAI }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let localId = item?.localId
    let errMsg = ''
    if (!localId || typeof localId !== 'string') {
      errMsg = locale('没有localId，无法上传！', 'library.0b5a059d51b08eb356049ae82c36aab6')
      resolve(errMsg)
      return
    }

    const corpId = DB.getStore('_app_corpid_') || ''
    if (!corpId) {
      resolve(locale('没有corpId，无法上传！', 'library.eac14a312a867add7096c32467c27a28'))
      return
    }

    const tenantId = window.loginUser?.tenantId || ''
    if (!tenantId) {
      errMsg = locale('没有企业id，无法上传！', 'library.0c0f8a96ae642679d041504200fc5ee5')
      resolve(errMsg)
      return
    }

    // 上传到微信
    let res = await uploadLocalId(localId)
    if (typeof res === 'string') {
      resolve(res)
      return
    }

    // 上传到oss
    let success = await uploadServerIds({
      serverIds: [res.serverId],
      uploadDir: formatUploadDir(uploadDir),
      watermarkConfig: watermarkConfig,
      watermark: item?.watermark?.list || [],
      width,
      corpId,
      tenantId
    })

    if (typeof success === 'string') {
      // resolve(success)
      // 产品要求统一错误提示语
      resolve(locale('照片上传失败，请重新上传', 'library.9f7d4b1e701779860b6aa663ce44d68c'))
      return
    }

    // 上传成功图片
    let serverItem = success[0]

    // 校验其是否真的是否法图片
    let isValid = await validateImageSrc(serverItem.src)
    if (!isValid) {
      resolve(locale('图片加载失败，请重试', 'library.419ade42d1243fe183355b7930c4f830'))
      return
    }

    resolve({
      ...item,
      ...serverItem,
      // 增加场景校验结果
      isAI: isAI,
      // 状态
      status: 'success'
    })
  })
}

export default uploadItem
