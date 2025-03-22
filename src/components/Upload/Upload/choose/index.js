import _ from 'lodash'
import convertBytes from './../../utils/convertBytes'
import validateMaxSize from './../../utils/validateMaxSize'
import getRemainCount from './../../utils/getRemainCount'
import supportTypes from './../../utils/supportTypes'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast} from 'seedsui-react'
测试使用-end */

// 选择文件
async function choose({
  async,
  maxSize,
  count,
  extension,
  list,
  uploadPosition,
  uploadList,
  onChoose,
  onChange
}) {
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

  let currentList = null
  if (typeof onChoose === 'function') {
    currentList = await onChoose()
  }

  if (!Array.isArray(currentList) || _.isEmpty(currentList)) {
    return null
  }

  // 判断文件选中的类型
  for (let item of currentList) {
    if (!(item.fileName || item.name)) {
      Toast.show({
        content: LocaleUtil.locale(`未返回fileName, 无法上传`, 'SeedsUI_return_no_fileName'),
        maskClickable: true
      })
      return
    }
    if (!(item.fileSize || item.size)) {
      Toast.show({
        content: LocaleUtil.locale(`未返回fileSize, 无法上传`, 'SeedsUI_return_no_fileSize'),
        maskClickable: true
      })
      return false
    }
    if (!supportTypes(item.fileName || item.name, extension)) {
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

    if (maxSize && !validateMaxSize(item.fileSize || item.size, maxSize)) {
      Toast.show({
        content: LocaleUtil.locale(
          `文件大小不能超过${Math.abs(convertBytes(maxSize))}M`,
          'SeedsUI_fileSize_cannot_greater_than',
          [Math.abs(convertBytes(maxSize))]
        )
      })
      return false
    }
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

export default choose
