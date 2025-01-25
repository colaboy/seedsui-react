import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import Main from './../Main'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import ModalPicker from './../../Modal/Modal'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Modal } from 'seedsui-react'
const ModalPicker = Modal.Modal
测试使用-end */

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
              ? LocaleUtil.locale('选择地址', 'SeedsUI_choose_address')
              : LocaleUtil.locale('查看地址', 'SeedsUI_view_address')
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
