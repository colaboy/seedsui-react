import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import Main from './../Main'

// 内库使用
import LocaleUtil from './../../../utils/LocaleUtil'
import ModalPicker from './../../Modal/Modal'

// 测试使用
// import { locale, Modal } from 'seedsui-react'
// const ModalPicker = Modal.Modal

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
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (config) props.mainProps.config = config
    if (getLocation) props.mainProps.getLocation = getLocation
    if (getAddress) props.mainProps.getAddress = getAddress

    return (
      <ModalPicker
        ref={modalRef}
        captionProps={{
          caption:
            visible === 'choose'
              ? LocaleUtil.text('选择地址', 'SeedsUI_choose_address')
              : LocaleUtil.text('查看地址', 'SeedsUI_view_address')
        }}
        {...props}
        main={props?.main || Main}
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
