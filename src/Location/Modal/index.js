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
      value,
      defaultPickerValue,
      onError,

      // Main
      config,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (config) props.MainProps.config = config
    if (visible) props.MainProps.type = visible

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

    console.log('visible:', visible)
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
        visible={visible}
        value={value}
        className={`map-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={Main}
      />
    )
  }
)

export default LocationModal
