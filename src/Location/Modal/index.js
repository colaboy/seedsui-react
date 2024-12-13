import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import Main from './../Main'

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
      config,
      getLocation,
      getAddress,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef(null)

    useImperativeHandle(ref, () => {
      return modalRef.current
    })

    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (config) props.MainProps.config = config
    if (getLocation) props.MainProps.getLocation = getLocation
    if (getAddress) props.MainProps.getAddress = getAddress

    return (
      <ModalPicker
        ref={modalRef}
        captionProps={{
          caption:
            visible === 'choose'
              ? locale('选择地址', 'SeedsUI_choose_address')
              : locale('查看地址', 'SeedsUI_view_address')
        }}
        {...props}
        MainComponent={props?.MainComponent || Main}
        submitProps={{
          visible: visible === 'choose' ? true : false,
          ...submitProps
        }}
        visible={visible}
        value={value}
        className={`map-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default LocationModal
