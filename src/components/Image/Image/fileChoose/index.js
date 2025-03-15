import _ from 'lodash'
import { LocaleUtil } from 'seedsui-react'
import { getRemainCount } from './../../utils'
import compressImage from './compressImage'

// 选择文件
async function fileChoose({
  file,
  async,
  sizeType,
  maxWidth,
  count,
  list,
  uploadPosition,
  uploadList,
  onFileChoose,
  onChange
}) {
  if (file?.type !== 'file') return false

  if (!file || !file.files?.[0]) {
    Toast.show({
      content: LocaleUtil.locale('没有选择文件，无法上传！'),
      maskClickable: true
    })
    return
  }

  // 大于总数禁止选择
  if (getRemainCount(count, list?.length || 0) <= 0) {
    Toast.show({
      content: LocaleUtil.locale(`照片总数不能大于${count}张`),
      maskClickable: true
    })
    return
  }

  // 数据
  let fileData = file.files?.[0]

  // 压缩图片
  if (JSON.stringify(sizeType || []) !== JSON.stringify(['original'])) {
    try {
      let startCompressLog = Date.now()
      fileData = await compressImage(fileData, 'file', { maxWidth: maxWidth })
      let endCompressLog = Date.now()
      console.log('图片压缩完成, 用时: ' + (endCompressLog - startCompressLog) / 1000 + '秒')
    } catch (error) {
      console.error('图片压缩失败, 使用原图上传:', error)
    }
  }

  let currentList = null
  if (typeof onFileChoose === 'function') {
    const fileURL = URL.createObjectURL(fileData)
    currentList = await onFileChoose({
      fileURL: fileURL,
      fileData: fileData
    })
  }

  if (!Array.isArray(currentList) || _.isEmpty(currentList)) {
    return null
  }

  // 构建新的照片列表
  let newList = []
  // 新照片放前面
  if (uploadPosition === 'start') {
    newList = [...currentList, ...(list || [])]
  }
  // 新照片放后面
  else {
    newList = [...(list || []), ...currentList]
  }

  // 异步上传
  if (async) {
    onChange && onChange(newList, { action: 'choose' })
    return newList
  }

  // 同步上传: list发生变化即开始上传
  newList = await uploadList(newList, { action: 'upload' })
  return newList
}

export default fileChoose
