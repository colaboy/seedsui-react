import _ from 'lodash'
import { getRemainCount } from './../../utils'

// 选择文件
async function choose(event, params, { count, list, onChoose, onChange }) {
  let uploadDOM = event.nativeEvent.target.parentNode

  // 大于总数禁止选择
  if (getRemainCount(count, list?.length || 0) <= 0) {
    Toast.show({
      content: LocaleUtil.locale(`照片总数不能大于${count}张`),
      maskClickable: true
    })
    return
  }

  Loading.show({ className: 'hide' })
  uploadDOM.classList.add('uploading')

  let currentList = null
  if (typeof onChoose === 'function') {
    currentList = await onChoose({
      ...params
    })
  }
  if (_.isEmpty(currentList)) {
    uploadDOM.classList.remove('uploading')
    Loading.hide()
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
    uploadDOM.classList.remove('uploading')
    Loading.hide()
    return
  }

  // 同步上传
  Loading.show({ content: LocaleUtil.locale('上传中') })
  // 同步上传: list发生变化即开始上传
  newList = await uploadList(newList)
  onChange && onChange(newList, { action: 'upload' })
  uploadDOM.classList.remove('uploading')
  Loading.hide()
}

export default choose
