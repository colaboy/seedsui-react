import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import Main from './../Main'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import SelectModal from './../../Modal/SelectModal'
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Modal, SafeArea } from 'seedsui-react'
const SelectModal = Modal.SelectModal
测试使用-end */

// Modal
const LocationModal = forwardRef(
  (
    {
      safeArea,

      // Modal
      visible,
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
      <SelectModal
        ref={modalRef}
        title={
          visible === 'choose'
            ? LocaleUtil.locale('选择地址', 'SeedsUI_choose_address')
            : LocaleUtil.locale('查看地址', 'SeedsUI_view_address')
        }
        {...props}
        main={props?.main || Main}
        ok={visible === 'choose' ? '' : null}
        visible={visible}
        value={value}
        className={`map-modal${SafeArea.getSafeAreaClassName(safeArea)}${
          props.className ? ' ' + props.className : ''
        }`}
      />
    )
  }
)

export default LocationModal
