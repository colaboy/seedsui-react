import React from 'react'
import Modal from './../../Modal'
import RangeMain from './../RangeMain'

// 快捷选择
const SelectorModal = function ({
  // Modal properties
  getComboDOM,
  maskClosable,
  visible,
  onVisibleChange,

  // RangeMain properties
  portal,
  ranges,
  value,
  onChange,

  ...props
}) {
  return (
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
        ranges={ranges}
        value={value}
        onChange={(newValue) => {
          onChange && onChange(newValue)
          onVisibleChange && onVisibleChange(false)
        }}
      />
    </Modal>
  )
}

export default SelectorModal
