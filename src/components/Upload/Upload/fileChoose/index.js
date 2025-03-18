import _ from 'lodash'
import getRemainCount from './../../utils/getRemainCount'
import validateMaxSize from './../../utils/validateMaxSize'
import supportTypes from './../../utils/supportTypes'
import convertBytes from './../../utils/convertBytes'

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
  extension,
  list,
  uploadPosition,
  uploadList,
  onFileChange,
  onChange
}) {
  if (file?.type !== 'file') return false

  if (!file || !file.files?.[0]) {
    Toast.show({
      content: LocaleUtil.locale('没有选择文件，无法上传！', 'SeedsUI_no_upload_file'),
      maskClickable: true
    })
    return false
  }

  // 大于总数禁止选择
  if (getRemainCount(count, list?.length || 0) <= 0) {
    Toast.show({
      content: LocaleUtil.locale(`总数不能大于${count}`, 'SeedsUI_count_cannot_greater_than', [
        count
      ]),
      maskClickable: true
    })
    return false
  }

  if (maxSize && !validateMaxSize(file, maxSize)) {
    Toast.show({
      content: LocaleUtil.locale(
        `文件大小不能超过${Math.abs(convertBytes(maxSize))}M`,
        'SeedsUI_fileSize_cannot_greater_than',
        [Math.abs(convertBytes(maxSize))]
      )
    })
    return false
  }

  // 数据
  let fileData = file.files?.[0]
  let fileName = fileData?.name || file.value
  let fileURL = URL.createObjectURL(fileData)
  let fileSize = fileData?.size

  // 未获取到文件名
  if (!fileName) {
    Toast.show({
      content: LocaleUtil.locale(`未获取到文件名, 无法上传`, 'SeedsUI_no_fileName'),
      maskClickable: true
    })
    return false
  }

  // 判断文件选中的类型
  if (!supportTypes(fileName, extension)) {
    Toast.show({
      content: LocaleUtil.locale(
        `只支持选择${extension.join(',')}格式的文件`,
        'SeedsUI_choose_type_error',
        [extension.join(',')]
      ),
      maskClickable: true
    })
    return false
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
