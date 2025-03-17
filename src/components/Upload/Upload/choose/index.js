import _ from 'lodash'
import getRemainCount from './../../utils/getRemainCount'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Toast from './../../../Toast'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast} from 'seedsui-react'
测试使用-end */

// 选择文件
async function choose({ async, count, list, uploadPosition, uploadList, onChoose, onChange }) {
  // 大于总数禁止选择
  if (getRemainCount(count, list?.length || 0) <= 0) {
    Toast.show({
      content: LocaleUtil.locale(`总数不能大于${count}`),
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
