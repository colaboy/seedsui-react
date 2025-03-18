import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import fileChoose from './fileChoose'
import choose from './choose'
import ImageBase from './../Base'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Loading from './../../Loading'
import Toast from './../../Toast'
// 内库使用-end

/* 测试使用-start
import { Loading, Toast, , LocaleUtil } from 'seedsui-react'
测试使用-end */

// 照片上传
function Image(
  {
    // Style
    allowChoose = false,
    allowClear = false,
    uploadPosition,
    upload,
    uploading,

    // Config
    async = false,
    reUpload = true,
    count = 5,
    visibleCount,
    sourceType = ['album', 'camera'],
    sizeType = ['compressed'], // ['original', 'compressed']
    maxWidth,
    list = [], // [{thumb: '全路径', src: '全路径', path: '目录/年月/照片名.jpg', status: 'choose|uploading|fail|success', children: node}]

    // Events
    onBeforeChoose,
    onChoose,
    onFileChange,
    onUpload,
    onChange,
    onPreview,
    ...props
  },
  ref
) {
  const imageRef = useRef(null)

  const onChangeRef = useRef()
  onChangeRef.current = onChange

  // Judge wether to display choose button
  const chooseVisible = allowChoose && (list || []).length < count ? true : false

  useImperativeHandle(ref, () => {
    return {
      ...imageRef.current,
      chooseFile: _choose,
      choose: _choose,
      uploadList: uploadList,
      showLoading: showLoading,
      hideLoading: hideLoading
    }
  })

  // Expose manual choose
  async function _choose(e) {
    if (!chooseVisible) {
      Toast.show({
        content: LocaleUtil.locale('此照片控件无拍照功能, 请勿调用拍照')
      })
      return false
    }
    let chooseDOM = imageRef.current?.rootDOM?.querySelector?.('.image-item.image-choose')
    if (!chooseDOM) {
      Toast.show({
        content: LocaleUtil.locale('未找到拍照按钮, 调用拍照失败')
      })
      return false
    }

    let chooseCallBack = e?.nativeEvent?.target ? handleFileChange : handleChoose
    let chooseOk = await chooseCallBack(e)
    return chooseOk
  }

  // 显隐Loading
  function showLoading({ content, index } = {}) {
    let rootDOM = imageRef.current?.rootDOM || null
    if (!rootDOM) return
    // 根节点遮罩
    rootDOM.classList.add('uploading')
    // 新增按钮遮罩
    let chooseDOM = rootDOM.querySelector('.image-choose')
    if (chooseDOM) chooseDOM.classList.add('uploading')
    // 当前项遮罩
    let itemDOM =
      typeof index === 'number' ? rootDOM.querySelector(`[data-index="${index}"]`) : null
    if (itemDOM) {
      itemDOM.classList.remove('fail')
      itemDOM.classList.add('uploading')
    }

    Loading.show(content ? { content } : { className: 'hide' })
  }

  function hideLoading({ failIndexes } = {}) {
    let rootDOM = imageRef.current?.rootDOM || null
    if (!rootDOM) return
    // 根节点遮罩
    rootDOM.classList.remove('uploading')
    // 新增按钮遮罩
    let chooseDOM = rootDOM.querySelector('.image-choose')
    if (chooseDOM) chooseDOM.classList.remove('uploading')
    // 当前项遮罩
    let itemsDOM = rootDOM.querySelectorAll(`[data-index]`)
    if (itemsDOM) {
      for (let itemDOM of itemsDOM) {
        let itemIndex = Number(itemDOM.getAttribute('data-index'))
        itemDOM.classList.remove('uploading')
        // 更新失败状态
        if (Array.isArray(failIndexes) && failIndexes.includes(itemIndex)) {
          itemDOM.classList.add('fail')
        }
      }
    }

    Loading.hide()
  }

  // 上传文件
  async function uploadItem(item) {
    if (typeof onUpload !== 'function') {
      Toast.show({
        content: `没有onUpload入参, 无法上传`
      })
    }

    // 已经上传成功, 无需要再次上传
    if (item?.src?.startsWith?.('http')) {
      item.status = 'success'
      return item
    }

    // 开始上传
    let result = await onUpload(item)

    // 上传失败
    if (typeof result === 'string') {
      Toast.show({
        content: result
      })
      item.status = 'fail'
      return item
    }

    // 更新状态
    return { ...item, status: 'success', ...result }
  }

  // 上传
  async function uploadList(newList, { action } = {}) {
    // eslint-disable-next-line
    if (!newList) newList = [...list]
    if (!newList) return

    let hasUploaded = false
    // 开始上传
    showLoading({ content: LocaleUtil.locale('上传中') })
    for (let [index, item] of newList.entries()) {
      // 只上传未上传的视频
      if (item.status === 'choose') {
        newList[index] = await uploadItem(item)
        hasUploaded = true
      }
    }
    hideLoading()

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

    if (hasUploaded) {
      onChangeRef.current && onChangeRef.current(newList, { action })
    }

    return newList
  }

  // 选择照片
  async function handleFileChange(e) {
    showLoading()
    let chooseResult = await fileChoose({
      file: e.nativeEvent.target,
      async,
      sizeType,
      maxWidth,
      count,
      list,
      uploadPosition,
      uploadList,
      onFileChange,
      onChange: onChangeRef.current
    })
    hideLoading()
    return chooseResult
  }

  // 选择照片
  async function handleChoose(e) {
    showLoading()
    let chooseResult = await choose({
      async,
      sizeType,
      maxWidth,
      count,
      list,
      uploadPosition,
      uploadList,
      onChoose,
      onChange: onChangeRef.current
    })
    hideLoading()
    return chooseResult
  }

  // 重新上传
  async function handleReUpload(item, index) {
    let newList = [...list]
    // 开始上传
    showLoading({ content: LocaleUtil.locale('上传中'), index: index })
    newList[index] = await uploadItem(item, index)
    hideLoading(newList[index].status === 'fail' ? { failIndexes: [index] } : undefined)

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
    <ImageBase
      ref={imageRef}
      uploadPosition={uploadPosition}
      // 自定义上传按钮与上传中的样式
      upload={upload}
      uploading={uploading}
      visibleCount={visibleCount}
      list={list}
      // 照片数量未超时可以选择
      onFileChange={onFileChange && chooseVisible ? handleFileChange : null}
      onChoose={onChoose && chooseVisible ? handleChoose : null}
      onDelete={allowClear ? handleDelete : null}
      onReUpload={handleReUpload}
      onBeforeChoose={
        typeof onBeforeChoose === 'function'
          ? async (e) => {
              showLoading()
              let isOk = await onBeforeChoose(e)
              hideLoading()
              return isOk
            }
          : null
      }
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

export default forwardRef(Image)
