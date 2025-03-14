import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Loading from './../../Loading'
import Toast from './../../Toast'
// 内库使用-end

/* 测试使用-start
import { Loading, Toast, , LocaleUtil } from 'seedsui-react'
测试使用-end */
import fileChoose from './fileChoose'
import choose from './choose'
import Image from './../Base'

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
    sizeType = ['compressed'], // ['original', 'compressed']
    maxWidth,
    list = [], // [{thumb: '全路径', src: '全路径', path: '目录/年月/照片名.jpg', status: 'choose|uploading|fail|success', children: node}]

    // Events
    onBeforeChoose,
    onChoose,
    onFileChoose,
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
    // 上传成功
    else {
      item.status = 'success'
    }

    // 更新状态
    return { ...item, ...result }
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
      onFileChange={
        onFileChoose && chooseVisible
          ? (e, params) =>
              fileChoose(e, params, {
                async,
                sizeType,
                maxWidth,
                count,
                list,
                uploadPosition,
                uploadList,
                onFileChoose,
                onChange: onChangeRef.current
              })
          : null
      }
      onChoose={
        onChoose && chooseVisible
          ? (e, params) =>
              choose(e, params, {
                async,
                sizeType,
                maxWidth,
                count,
                list,
                uploadPosition,
                uploadList,
                onFileChoose,
                onChange: onChangeRef.current
              })
          : null
      }
      onDelete={allowClear ? handleDelete : null}
      onReUpload={handleReUpload}
      onBeforeChoose={onBeforeChoose}
      onPreview={onPreview}
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
