import React, { forwardRef, useEffect, useState } from 'react'
import locale from './../../locale'
import Toast from './../../Toast'
import Loading from './../../Loading'
import MapUtil from './../../MapUtil'
import Modal from './../../Modal'
import Preview from './Map/Preview'
import Choose from './Map/Choose'

// 地图标注
const LocationModal = forwardRef(
  (
    {
      ak,
      // 值: {latitude: '纬度', longitude: '经度', address:'地址', value: ''}
      value,
      onChange,

      visible, // preview、choose
      onVisibleChange,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if (!visible) return

      // 无法使用地图
      if (!window.BMap && !ak) {
        Toast.show({ content: locale('请传入百度地图ak', 'hint_map_ak') })
        return
      }

      // 正确
      if (window.BMap) {
        setIsLoading(true)
        return
      }

      let loadErrMsg = locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load')
      if (ak) {
        Loading.show()
        MapUtil.load({
          ak: ak,
          success: () => {
            Loading.hide()
            setIsLoading(true)
          },
          fail: () => {
            Loading.hide()
            Toast.show({ content: loadErrMsg })
          }
        })
        return
      }
      Toast.show({ content: loadErrMsg })
    }, [visible])
    function handleChange(newValue) {
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }

    if (!isLoading) return null

    return (
      <Modal
        ref={ref}
        visible={visible}
        onVisibleChange={onVisibleChange}
        {...props}
        animation="slideUp"
        className="location-modal"
      >
        {visible === 'preview' && <Preview ak={ak} value={value} />}
        {visible === 'choose' && <Choose ak={ak} value={value} onChange={handleChange} />}
      </Modal>
    )
  }
)

export default LocationModal
