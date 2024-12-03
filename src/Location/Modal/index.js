import React, { forwardRef } from 'react'
import Main from './../Main'
import Footer from './Footer'

// 内库使用
import locale from './../../locale'
import ModalPicker from './../../Modal/MainPicker'

// 测试使用
// import { locale, Modal } from 'seedsui-react'
// const ModalPicker = Modal.MainPicker

// Modal
const LocationModal = forwardRef(
  (
    {
      // Modal
      visible,
      submitProps,
      value,

      // Main
      type,
      config,
      getLocation,
      getAddress,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (type) props.MainProps.type = type
    if (config) props.MainProps.config = config
    if (getLocation) props.MainProps.getLocation = getLocation
    if (getAddress) props.MainProps.getAddress = getAddress

    // 底部
    props.MainProps.footerRender = () => {
      return visible === 'choose' ? (
        <Footer
          onOk={() => {
            ref.current?.submit?.()
          }}
          onClear={() => {
            ref.current?.submit?.(null)
          }}
        />
      ) : null
    }

    return (
      <ModalPicker
        ref={ref}
        captionProps={{
          caption:
            visible === 'choose'
              ? locale('选择地址', 'SeedsUI_choose_address')
              : locale('查看地址', 'SeedsUI_view_address')
        }}
        {...props}
        submitProps={{
          visible: visible === 'choose' ? true : false,
          ...submitProps
        }}
        visible={visible}
        value={value}
        className={`map-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={Main}
      />
    )
  }
)

export default LocationModal
