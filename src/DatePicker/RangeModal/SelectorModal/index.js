import React, { useState } from 'react'
import Modal from './../../../Modal'
import RangeMain from './../../RangeMain'
import Picker from './Picker'

// 快捷选择
const SelectorModal = function ({
  // Modal properties
  getComboDOM,
  maskClosable,
  visible,
  onVisibleChange,

  // RangeMain properties
  titles,
  portal,
  type,
  ranges,
  value,
  defaultPickerValue,
  onChange,

  ...props
}) {
  // Picker选择控件
  let [pickerVisible, setPickerVisible] = useState(false)
  return (
    <>
      {/* 快捷选择 */}
      <Modal
        sourceDOM={() => {
          let comboDOM = null
          if (typeof getComboDOM === 'function') {
            comboDOM = getComboDOM()
            if (typeof comboDOM?.getRootDOM === 'function') {
              comboDOM = comboDOM.getRootDOM()
            }
          }
          return comboDOM
        }}
        maskClosable={maskClosable}
        visible={visible}
        animation="slideDown"
        className="datepicker-rangemodal-modal"
        onVisibleChange={onVisibleChange}
        {...props}
      >
        <RangeMain
          portal={portal}
          titles={titles}
          ranges={ranges}
          value={value}
          onChange={(newValue) => {
            onChange && onChange(newValue)
            onVisibleChange && onVisibleChange(false)
          }}
          onSelect={(value, { activeKey, ranges }) => {
            // 点击自定义
            if (ranges && Array.isArray(ranges[activeKey]) === false) {
              onVisibleChange && onVisibleChange(false)
              setPickerVisible(true)
            }
          }}
        />
      </Modal>

      {/* 选择区间 */}
      <Picker
        value={value}
        defaultPickerValue={defaultPickerValue}
        type={type}
        onChange={onChange}
        visible={pickerVisible}
        onVisibleChange={setPickerVisible}
      />
    </>
  )
}

export default SelectorModal