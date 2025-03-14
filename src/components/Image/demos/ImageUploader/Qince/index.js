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
    timeout,
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
    onClick
    // ...props
  },
  ref
) {
  const watermarkRef = useRef(null)
  const photosRef = useRef(null)

  const onChangeRef = useRef()
  onChangeRef.current = onChange

  useImperativeHandle(ref, () => {
    return {
      ...photosRef.current
    }
  })

  // 上传文件
  async function uploadItem(item) {
    // 开始上传
    let result = await uploadImage(item, {
      timeout,
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

  // 选择文件
  function handleChoose(currentList, { result: res }) {
    // 所有场景值
    let sceneCheckMap = {}
    if (Array.isArray(res?.recognitionResults) && res.recognitionResults.length) {
      for (let item of res.recognitionResults) {
        sceneCheckMap[item.localId] = {
          imageUrl: `${formatUploadDir(uploadDir)}/${item.localId}`,
          ...item
        }
      }
    }
    return currentList.map((item) => {
      return {
        ...item,
        uploadDir: uploadDir,
        // 以下字段用于异步上传时，调用上传接口传给后台
        isAI: isAI ? '1' : '0',
        ext: ext,
        // 增加场景校验结果http://172.31.3.252:8090/pages/viewpage.action?pageId=5668894
        sceneCheck: sceneCheckMap[item.localId] || null
      }
    })
  }

  return (
    <Image
      ref={photosRef}
      async={async}
      reUpload={reUpload}
      uploadPosition={uploadPosition}
      // 显示ai上传图
      uploadNode={getUploadDOM({ isAI, isFake, ocrType: ocrParams?.ocrTypeId, ext })}
      // 上传中图片
      uploading={getUploadingDOM(ocrParams?.ocrTypeId)}
      list={(list || []).map((item) => {
        return {
          ...item,
          thumb: item.offlineThumb || item.thumb,
          src: item.offlineSrc || item.src
        }
      })}
      onChoose={handleChoose}
      count={count}
      allowClear={onDelete ? true : false}
      onChange={(newList, { action }) => {
        if (action === 'delete') {
          if (onDelete) onDelete(newList)
        } else {
          if (onChange) onChange(newList)
        }
      }}
      onUpload={uploadItem}
      onBeforeChoose={async (e, { setUploading, setChooseParams }) => {
        if (typeof onBeforeChoose === 'function') {
          let isOk = await onBeforeChoose(e, { setUploading })
          if (isOk === false) return false
        }

        // 添加水印
        if (watermark) {
          Loading.show()
          setUploading(true)
          watermarkRef.current = await getWatermark(watermark, onWatermark)
          // onWatermark允许阻止选中，onWatermark
          if (watermarkRef.current === false) {
            setUploading(false)
            Loading.hide()
            return false
          }
        }

        // 合并照片支持使用最后一张照片localId做拼接
        let lastLocalId = ''
        if (Array.isArray(list) && list.length) {
          lastLocalId = list[list.length - 1].localId
        }
        // 设置chooseImage的参数
        let chooseImageParams = {
          maxCompressWidth: Number(width || 0),
          isAI: isAI ? '1' : '0',
          validate: validate || 0,
          sceneValidate: scene || 0,
          ext: ext,
          realTimeRecognition:
            typeof ext?.realTimeRecognition === 'number' ? ext.realTimeRecognition : '1',
          // verticalValidate: verticalValidate || 0, // 1.垂直校验   0. 不校验
          direction: direction || (verticalValidate === '1' ? '2' : '0'), // 1.水平  2.垂直  0.不校验
          sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
          sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
          watermark: wm?.list || null,
          watermarkConfig: watermarkConfig,
          isSaveToAlbum: isSaveToAlbum || 0, // 不保存到本地
          lastLocalId: lastLocalId,
          imageMerge: imageMerge || 0 // 是否合并照片, 1合并 0不合并(默认)
        }
        // ocr识别区域控制
        if (ocrParams && focusArea) {
          chooseImageParams.focusArea = focusArea
        }

        setChooseParams(chooseImageParams)
      }}
      onPreview={async (item, index, { event, rootDOM, itemDOM, list }) => {
        if (typeof onClick === 'function') {
          onClick(event, item, index)
          return false
        }
        // 自定义预览
        if (typeof onPreview === 'function') {
          let goOn = await onPreview(item, index, { rootDOM, itemDOM, list })
          if (goOn === false) return false
        }

        // 走默认预览
        Bridge.previewImage({
          // 兼容老客户端不支持localresource预览
          // urls: list.map((item) => item.src.replace(/localresource:\/\//i, '')),
          urls: list.map((item) => item.localId || item.src),
          current: list[index].localId || list[index].src,
          item: list[index],
          index: index
        })
        return false
      }}
      {...props}
    />
  )
}

export default forwardRef(ImageUploader)
