import _ from 'lodash'
import getRemainCount from './../../utils/getRemainCount'
import validateMaxSize from './../../utils/validateMaxSize'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast} from 'seedsui-react'
测试使用-end */

// 选择文件
async function fileChoose({
  file,
  async,
  maxSize,
  count,
  list,
  uploadPosition,
  uploadList,
  onFileChange,
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
      content: LocaleUtil.locale(`总数不能大于${count}`),
      maskClickable: true
    })
    return
  }

  if (maxSize && !validateMaxSize(file, maxSize)) {
    Toast.show({
      content: LocaleUtil.locale(`文件大小不能超过${Math.abs(maxSize / 1024)}M`)
    })
    return
  }

  // 数据
  let fileData = file.files?.[0]
  let fileName = fileData?.name || file.value
  let fileURL = URL.createObjectURL(fileData)
  let fileSize = fileData?.size

  // 未获取到文件名
  if (!fileName) {
    Toast.show({
      content: LocaleUtil.locale(`未获取到文件名, 无法上传`),
      maskClickable: true
    })
    return
  }

  let currentList = null
  if (typeof onFileChange === 'function') {
    currentList = await onFileChange({
      fileName: fileName,
      fileData: fileData,
      fileURL: fileURL,
      fileSize: fileSize
    })
  }

  if (!Array.isArray(currentList) || _.isEmpty(currentList)) {
    return null
  }

  // 构建新的列表
  let newList = []
  // 新放前面
  if (uploadPosition === 'start') {
    newList = [...currentList, ...(list || [])]
  }
  // 新放后面
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
