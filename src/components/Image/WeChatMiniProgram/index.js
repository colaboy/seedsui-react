import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Loading, Toast, Image } from 'seedsui-react'
import Actionsheet from 'library/deprecated/Actionsheet'

import locale from 'library/utils/locale'
import {
  formatUploadDir,
  getUploadDOM,
  getUploadingDOM,
  getWatermark,
  getRemainCount
} from './../utils'
import getPhotos from './getPhotos'
import clearPhotos from './clearPhotos'
import stopAllPolls from './stopAllPolls'

// 微信小程序拍照上传, 通过前端id，通过接口与小程序通信，轮询接口获取小程序上传的照片
function WechatMiniprogram(
  {
    // 是否异步上传(目前只有app支持)
    async = false,
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
  // Auto generate id, used to get photos form server
  const idRef = useRef(Object.generateGUID())

  // Photo and Album select actionsheet visible
  const [visible, setVisible] = useState(false)

  const photosRef = useRef(null)

  // Newest List
  const listRef = useRef(list)

  // Change event
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
      uploadList: () => {
        Toast.show({
          content: locale('小程序不支持异步上传', 'library.34b5161adb0dd53091258a0558e9c2f1')
        })
      }
    }
  })

  // Get photos by polling interval
  async function updatePhotos() {
    let photos = await getPhotos(idRef.current, {
      uploadDir: formatUploadDir(uploadDir),
      ocrParams: ocrParams
    })
    // Get photos failed, stop interval
    if (typeof photos === 'string') {
      stopAllPolls()
      Toast.show({ content: photos })
      return
    }
    // Get photos success
    if (Array.isArray(photos) && photos.length > 0) {
      stopAllPolls()
      listRef.current = listRef.current.concat(photos)
      onChangeRef.current && onChangeRef.current(listRef.current)
      console.log('照片拍完, 清空redis')
      await clearPhotos(idRef.current)
      return
    }
    // Null Get photos by polling interval 3s
    window[idRef.current] = setTimeout(() => {
      updatePhotos()
    }, 3000)
  }
  // Get photos
  useEffect(() => {
    return () => {
      stopAllPolls()
    }
    // eslint-disable-next-line
  }, [])

  // 外部强行修改list, 需要同步到服务器
  useEffect(() => {
    let currentList = (listRef.current || []).filter((item) => !item.children)
    let externalList = (list || []).filter((item) => !item.children)
    if (JSON.stringify(currentList) === JSON.stringify(externalList)) return
    listRef.current = list
    // eslint-disable-next-line
  }, [list])

  // Jump to WeChat mini program to photo
  async function goCamera(sourceType) {
    // Stop others polling
    stopAllPolls(idRef.current)

    // Draw watermark in photo
    let wm = null
    if (watermark) {
      Loading.show({ content: locale('获取水印...', 'library.beb3fc68663636452289e815d8932cf7') })
      wm = await getWatermark(watermark, onWatermark)
      Loading.hide()
      // onWatermark允许阻止选中，onWatermark
      if (wm === false) {
        return
      }
    }

    // Protect click
    Loading.show({ content: locale('打开小程序拍照', 'library.e55618c26ebea1724e7f5d8a0489995c') })
    setTimeout(() => {
      Loading.hide()
    }, 1000)

    try {
      // isFullPath=1接口不补年月
      // eslint-disable-next-line
      top.wx.miniProgram.navigateTo({
        url: `/pages/Components/ImageUploader/index?id=${idRef.current}&sourceType=${JSON.stringify(
          sourceType
        )}&uploadDir=${formatUploadDir(uploadDir)}&count=${count}&remainCount=${getRemainCount(
          count,
          list?.length || 0
        )}&watermark=${encodeURIComponent(
          encodeURIComponent(JSON.stringify(wm || ''))
        )}&watermarkConfig=${JSON.stringify(
          watermarkConfig || ''
        )}&uploadPosition=${uploadPosition}&isFullPath=1`,
        success: () => {},
        fail: () => {
          Toast.show({ content: '呼起小程序拍照失败,请点击重试' })
        }
      })

      // Invoke camera start interval list
      updatePhotos()
    } catch (err) {
      Toast.show({ content: '呼起小程序拍照异常,请点击重试' })
      // If this fails, stop polling
      stopAllPolls()
    }
  }

  // 选择文件
  async function handleChoose() {
    // Camera and Album actionsheet select
    if (sourceType.includes('album') && sourceType.includes('camera')) {
      setVisible(true)
      return true
    }

    // goCamera
    goCamera(sourceType)

    return true
  }

  // 删除
  async function handleDelete(item, index) {
    let successList = list.filter((photo, photoIndex) => {
      return photoIndex !== index
    })
    if (onDelete) onDelete(successList)
  }

  return (
    <>
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
        }}
        {...props}
      />

      <Actionsheet.Modal
        visible={visible}
        list={[
          {
            id: 'camera',
            name: locale('拍照', 'library.bed9ec1e84486baa0422c80414edd31a')
          },
          {
            id: 'album',
            name: locale('从相册选择', 'library.83c39abd16cd6a770fc1c3c326aabbdd')
          }
        ]}
        onChange={(selected) => {
          goCamera([selected[0].id])
          setVisible(false)
        }}
        onVisibleChange={(newVisible) => {
          setVisible(newVisible)
        }}
      />
    </>
  )
}

export default forwardRef(WechatMiniprogram)
