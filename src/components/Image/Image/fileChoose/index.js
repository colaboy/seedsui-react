import _ from 'lodash'
import { getRemainCount } from './../../utils'
import compressImage from './compressImage'

// 选择文件
async function fileChoose(event, params, { count, list, onFileChoose, onChange }) {
  let file = event.nativeEvent.target
  let uploadDOM = file.parentNode

  if (file?.type !== 'file') return

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

  Loading.show({ className: 'hide' })
  uploadDOM.classList.add('uploading')

  const localId = URL.createObjectURL(fileData)
  let currentList = [
    {
      status: 'choose',
      localId: localId,
      fileData: fileData,
      thumb: localId,
      src: localId,
      path: ``
    }
  ]

  if (typeof onFileChoose === 'function') {
    currentList = await onFileChoose({
      localId: localId,
      fileData: fileData,
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

export default fileChoose
