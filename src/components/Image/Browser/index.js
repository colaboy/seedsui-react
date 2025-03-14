import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 内库使用-start
import Loading from './../../Loading'
import Toast from './../../Toast'
// 内库使用-end

/* 测试使用-start
import { Loading, Toast, , LocaleUtil } from 'seedsui-react'
测试使用-end */

import Image from './../Image'
import { getRemainCount } from './../utils'
import compressImage from './compressImage'

// 照片上传
function Browser(
  {
    // Style
    allowClear = true,
    uploadPosition,
    uploadNode,
    uploading,

    // Config
    async = false,
    reUpload = true,
    count = 5,
    sourceType = ['album', 'camera'],
    list = [], // [{thumb: '全路径', src: '全路径', path: '目录/年月/照片名.jpg', status: 'choose|uploading|fail|success', children: node}]

    // Events
    onBeforeChoose,
    onChoose,
    onUpload,
    onChange,
    onPreview,
    ...props
  },
  ref
) {
  const photosRef = useRef(null)

  const onChangeRef = useRef()
  onChangeRef.current = onChange

  // Judge wether to display choose button
  const chooseVisible = onChange && (list || []).length < count ? true : false

  useImperativeHandle(ref, () => {
    return {
      ...photosRef.current,
      chooseImage: () => {
        Toast.show({
          content: LocaleUtil.locale('浏览器上传, 不支持编程式调用拍照')
        })
        return false
      },
      uploadList: uploadList
    }
  })

  // 上传文件
  async function uploadItem(item) {
    if (typeof onUpload !== 'function') {
      Toast.show({
        content: `没有onUpload入参, 无法上传`
      })
    }
    // 开始上传
    let result = await onUpload(item)

    // 上传失败
    if (typeof result === 'string') {
      Toast.show({
        content: result
      })
      item.status = 'fail'
    }

    // 更新状态
    return item
  }

  // 上传
  async function uploadList(newList) {
    // eslint-disable-next-line
    if (!newList) newList = list
    if (!newList) return

    // 开始上传
    for (let [index, item] of newList.entries()) {
      // 只上传未上传的视频
      if (item.status === 'choose') {
        newList[index] = await uploadItem(item)
      }
    }

    // 不支持重新上传，则过滤上传失败的照片
    if (!reUpload) {
      if (Array.isArray(newList) && newList.length) {
        let failCount = 0
        // eslint-disable-next-line
        newList = newList.filter((photo) => {
          if (
            photo.status === 'fail' ||
            photo.status === 'choose' ||
            photo.status === 'uploading'
          ) {
            failCount++
            return false
          }
          return true
        })
        // 上传失败
        if (failCount) {
          Toast.show({
            content: `${LocaleUtil.locale('网络异常，上传失败')}${failCount}${LocaleUtil.locale(
              '张'
            )})`
          })
        }
      }
    }
    return newList
  }

  // 选择文件
  async function handleChoose(event) {
    let file = event.nativeEvent.target
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
        fileData = await compressImage(fileData, 'file', { maxWidth: width })
        let endCompressLog = Date.now()
        console.log('图片压缩完成, 用时: ' + (endCompressLog - startCompressLog) / 1000 + '秒')
      } catch (error) {
        console.error('图片压缩失败, 使用原图上传:', error)
      }
    }

    let uploadDOM = file.parentNode
    Loading.show({ className: 'hide' })
    uploadDOM.classList.add('uploading')

    let imgURL = URL.createObjectURL(fileData)
    // 待传文件
    let currentList = [
      {
        status: 'choose',
        localId: imgURL,
        fileData: fileData,
        thumb: imgURL,
        src: imgURL,
        path: ``
      }
    ]

    if (typeof onChoose === 'function') {
      currentList = await onChoose(currentList, { result: null })
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
      onChangeRef.current && onChangeRef.current(newList, { action: 'choose' })
      uploadDOM.classList.remove('uploading')
      Loading.hide()
      return
    }

    // 同步上传
    Loading.show({ content: LocaleUtil.locale('上传中') })
    // 同步上传: list发生变化即开始上传
    newList = await uploadList(newList)
    onChangeRef.current && onChangeRef.current(newList, { action: 'upload' })
    uploadDOM.classList.remove('uploading')
    Loading.hide()
  }

  // 重新上传
  async function handleReUpload(item, index, otherOptions) {
    let newList = otherOptions.list
    // 开始上传
    Loading.show({ content: LocaleUtil.locale('上传中') })
    otherOptions.itemDOM.classList.remove('fail')
    otherOptions.itemDOM.classList.add('uploading')
    newList[index] = await uploadItem(item, index)
    Loading.hide()
    otherOptions.itemDOM.classList.remove('uploading')
    if (newList[index].status === 'fail') {
      otherOptions.itemDOM.classList.add('fail')
    }

    onChangeRef.current && onChangeRef.current(newList, { action: 'reUpload' })
  }

  // 删除
  function handleDelete(item, index) {
    let newList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    onChangeRef.current && onChangeRef.current(newList, { action: 'delete' })
  }

  // 判断是否仅相册或者仅拍照
  let capture = ''
  if (sourceType.length === 1 && sourceType[0] === 'camera') {
    capture = 'camera'
  }
  // file框不支持仅相册
  // else if (sourceType.length === 1 && sourceType[0] === 'album') {
  //   capture = 'album'
  // }

  return (
    <Image
      ref={photosRef}
      uploadPosition={uploadPosition}
      // 自定义上传按钮与上传中的样式
      uploadNode={uploadNode}
      uploading={uploading}
      list={list}
      // 照片数量未超时可以选择
      onFileChange={chooseVisible ? handleChoose : null}
      onDelete={allowClear ? handleDelete : null}
      onReUpload={handleReUpload}
      onBeforeChoose={onBeforeChoose}
      onPreview={async (item, index, { event, rootDOM, itemDOM, list }) => {
        if (typeof onClick === 'function') {
          onClick(event, item, index)
          return false
        }
        // 自定义预览
        if (typeof onPreview === 'function') {
          let goOn = await onPreview(item, index, { rootDOM, itemDOM, list })
          if (goOn === false || goOn) return goOn
        }

        // 异步上传使用h5预览
        if (!item?.src?.startsWith?.('http')) {
          return 'browser'
        }

        return true
      }}
      fileProps={
        capture
          ? {
              capture: capture
            }
          : undefined
      }
      {...props}
    />
  )
}

export default forwardRef(Browser)
