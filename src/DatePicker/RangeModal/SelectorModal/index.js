import React, { useState } from 'react'
import Modal from './../../../Modal'
// 测试使用
// import Modal from 'seedsui-react/lib/Modal'
import RangeMain from './../../RangeMain'
import PickerModal from './../PickerModal'

// 快捷选择
const SelectorModal = function ({
  portal,
  // Combo
  getComboDOM,
  // Modal: display properties
  captionProps,
  submitProps,
  cancelProps,
  maskClosable,
  visible,
  onVisibleChange,

  // Main: common
  value,
  onBeforeChange,
  onChange,

  // Main: Picker Control properties
  defaultPickerValue,

  // Combo|Main: DatePicker Control properties
  titles,
  titleFormatter,
  min,
  max,
  type,
  onError,
  ranges,
  ...props
}) {
  // Picker选择控件
  let [pickerVisible, setPickerVisible] = useState(false)
  return (
    <>
      {/* 快捷选择 */}
      <Modal
        portal={portal}
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
          allowClear={false}
          type={type}
          min={min}
          max={max}
          onError={onError}
          onBeforeChange={onBeforeChange}
          onChange={(newValue) => {
            // eslint-disable-next-line
            return new Promise(async (resolve) => {
              if (onChange) {
                let goOn = await onChange(newValue)
                resolve(goOn)
                if (goOn === false) return
              }
              onVisibleChange && onVisibleChange(false)
            })
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
      <PickerModal
        captionProps={captionProps}
        submitProps={submitProps}
        cancelProps={cancelProps}
        portal={portal}
        value={value}
        defaultPickerValue={defaultPickerValue}
        type={type}
        onChange={onChange}
        visible={pickerVisible}
        onVisibleChange={setPickerVisible}
        {...props}
      />
    </>
  )
}

export default SelectorModal
