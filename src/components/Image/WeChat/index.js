import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from 'library/utils/locale'
import { Loading, Toast, Image } from 'seedsui-react'
import Bridge from 'library/utils/Bridge'
import {
  Ocr,
  getUploadDOM,
  getUploadingDOM,
  getWatermark,
  getRemainCount,
  formatUploadDir
} from './../utils'
import base64LocalIds from './base64LocalIds'
import uploadImage from './uploadItem'

// 照片上传
function ImageUploader(
  {
    // 是否异步上传(目前只有app支持)
    async = false,
    // 支持重新上传
    reUpload = true,
    // 全屏遮罩
    isShowProgressTips = 1,
    // 勤策拍照设置
    isAI, // 是否调用AI上传
    validate, // 0.不校验 1.货架 2.冰箱 3.端架 4.地堆 5.堆箱 6.收银台 7.挂架 8.侧柜 9.挂网 10.暖柜 90.AI服务器识别 101.门头
    scene, // 同validate, 用于普通拍照场景校验
    direction, // 1.水平  2.垂直  0.不校验
    verticalValidate, // 0 不开启  1开启
    isFake, // 是否启用虚假照片识别
    ocrParams, // {ocrTypeId(类型): 1.名片识别 6.营业执照识别 7.身份证识别
    focusArea, // 传width和height
    ext,
    // {
    //   funId: '业务表单id', // 为了记录日志
    //   component_id: '组件id', // 为了记录日志
    //   realTimeRecognition: '默认1', // 1.实时识别; 0.非实时识别服务
    //   cmId: '客户Id', appId: '应用Id', menuId: 菜单Id(必填, 默认读取地址栏menuId)
    // }
    count = 5,
    sourceType = ['album', 'camera'],
    sizeType = ['compressed'], // ['original', 'compressed']
    isSaveToAlbum = 0, // 是否保存到本地
    // 新水印
    watermarkConfig,
    watermark,
    onWatermark,
    width,
    imageMerge, // 是否合并照片, 1合并 0不合并(默认)

    // 上传位置
    uploadPosition,

    // 基础设置
    uploadDir = 'imageuploader', // 上传目录, '目录', 不需要传'目录/年月', 此组件会自动补充'/年月'
    list = [], // [{thumb: '全路径', src: '全路径', path: '目录/年月/照片名.jpg', status: 'choose|uploading|fail|success', children: node}]

    // 回调
    onBeforeChoose,
    onChange,
    onDelete,
    onPreview,
    onClick,
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
      chooseImage: async () => {
        if (!chooseVisible) {
          Toast.show({
            content: locale(
              '此照片控件无拍照功能, 请勿调用拍照',
              'library.35a3ca0b2cebe63e346eb2ef97193284'
            )
          })
          return false
        }
        let uploadDOM = photosRef.current?.rootDOM?.querySelector?.('.image-item.image-upload')
        if (!uploadDOM) {
          Toast.show({
            content: locale(
              '未找到拍照按钮, 调用拍照失败',
              'library.76637d130a70149d956bf9acc14e2108'
            )
          })
          return false
        }

        let chooseOk = await handleChoose({
          nativeEvent: {
            target: uploadDOM
          }
        })
        return chooseOk
      },
      uploadList: uploadList
    }
  })

  // 上传文件
  async function uploadItem(item) {
    // 开始上传
    let result = await uploadImage(item, {
      watermarkConfig: watermarkConfig,
      uploadDir,
      ext,
      isAI
    })

    // 上传失败
    if (typeof result === 'string') {
      Toast.show({
        content: result
      })
      item.status = 'fail'
    }
    // 上传成功
    else {
      // eslint-disable-next-line
      item = result
      // ocr识别
      if (ocrParams) {
        // eslint-disable-next-line
        item = await Ocr.recognizeItem(item, ocrParams)
      }
    }

    // 更新状态
    return item
  }

  // 上传
  async function uploadList(newList) {
    // 开始上传
    for (let [index, item] of newList.entries()) {
      // 只上传未上传的视频
      if (item.status === 'choose') {
        newList[index] = await uploadItem(item, index)
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
            content: `${locale(
              '网络异常，上传失败',
              'library.18904cde640c2efd37bc6ed3e9dedc77'
            )}${failCount}${locale('张', 'library.6499fc7409049355527ef6a2ba5706b8')})`
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
    Loading.show({ content: locale('上传中', 'library.fc09a73e52b76f697cff129b4dddecd1') })
    otherOptions.itemDOM.classList.remove('fail')
    otherOptions.itemDOM.classList.add('uploading')
    newList[index] = await uploadItem(item, index)
    Loading.hide()
    otherOptions.itemDOM.classList.remove('uploading')
    if (newList[index].status === 'fail') {
      otherOptions.itemDOM.classList.add('fail')
    }

    onChangeRef.current && onChangeRef.current(newList)
  }

  // 选择文件
  async function handleChoose(event) {
    let e = event.nativeEvent
    let uploadDOM = e.target
    Loading.show({ className: 'hide' })
    uploadDOM.classList.add('uploading')

    // 添加水印
    let wm = null
    if (watermark) {
      wm = await getWatermark(watermark, onWatermark)
      // onWatermark允许阻止选中，onWatermark
      if (wm === false) {
        uploadDOM.classList.remove('uploading')
        Loading.hide()
        return false
      }
    }

    let chooseImageParams = {
      count: getRemainCount(count, list?.length || 0),
      sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
      isSaveToAlbum: isSaveToAlbum || 0, // 不保存到本地
      success: async (res) => {
        const localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        if (!Array.isArray(localIds) || !localIds.length) return

        Loading.show()

        // 异步上传，需要将localId转成base64后显示
        let base64List = []
        if (async) {
          base64List = await base64LocalIds(localIds)
        }

        // 当前列表
        let currentList = localIds.map((localId, index) => {
          return {
            status: 'choose',
            localId: localId,
            watermark: wm ? wm : null,
            // 缩略图：需要转base64方能展现图片
            thumb: base64List[index],
            src: localId,
            path: `${formatUploadDir(uploadDir)}/${localId}`,
            uploadDir: formatUploadDir(uploadDir),
            // 以下字段用于异步上传时，调用上传接口传给后台
            isAI: isAI ? '1' : '0',
            ext: ext
          }
        })

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
          onChangeRef.current && onChangeRef.current(newList)
          uploadDOM.classList.remove('uploading')
          Loading.hide()
          return
        }

        // 同步上传
        Loading.show({ content: locale('上传中', 'library.fc09a73e52b76f697cff129b4dddecd1') })
        // 同步上传: list发生变化即开始上传
        newList = await uploadList(newList)
        onChangeRef.current && onChangeRef.current(newList)
        uploadDOM.classList.remove('uploading')
        Loading.hide()
      },
      fail: function (err) {
        if (err && err.errMsg) Toast.show({ content: err.errMsg })
        uploadDOM.classList.remove('uploading')
        Loading.hide()
      },
      cancel: function () {
        uploadDOM.classList.remove('uploading')
        Loading.hide()
      }
    }

    Bridge.chooseImage(chooseImageParams)

    return true
  }

  // 删除
  function handleDelete(item, index) {
    let successList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    if (onDelete) onDelete(successList)
  }

  return (
    <Image
      ref={photosRef}
      uploadPosition={uploadPosition}
      // 显示ai上传图
      uploadNode={getUploadDOM({ isAI, isFake, ocrType: ocrParams?.ocrTypeId, ext })}
      // 上传中图片
      statusRender={({ itemType }) => {
        if (itemType !== 'upload') return
        return getUploadingDOM(ocrParams?.ocrTypeId)
      }}
      list={list}
      // 照片数量未超时可以选择
      onChoose={chooseVisible ? handleChoose : null}
      onDelete={onDelete ? handleDelete : null}
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
        return true

        // 走默认预览
        // Bridge.previewImage({
        //   urls: list.map((item) => item.src),
        //   current: list[index].src,
        //   index: index
        // })
        // return false
      }}
      {...props}
    />
  )
}

export default forwardRef(ImageUploader)
