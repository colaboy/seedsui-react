import React, { useState } from 'react'
import Selector from './../../../Selector'

// 测试使用
import getCustomKey from './../../RangeMain/getCustomKey'
import PickerModal from './../PickerModal'

// 快捷选择
const CustomButton = function ({
  portal,
  // Combo
  // Modal: display properties
  captionProps,
  submitProps,
  cancelProps,
  onVisibleChange,

  // Main: common
  value,
  allowClear,
  onChange,

  // Main: Picker Control properties
  defaultPickerValue,

  // Combo|Main: DatePicker Control properties
  titles,
  type,
  ranges,
  ...props
}) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customKey = getCustomKey(ranges)

  // Picker选择控件
  let [pickerVisible, setPickerVisible] = useState(false)

  if (!customKey) return null
  return (
    <>
      {/* 自定义选择独立一行显示 */}
      {/* 标题 */}
      {typeof titles.custom === 'string' ? (
        <p className="datepicker-selector-caption">{titles.custom}</p>
      ) : null}
      {/* 按钮 */}
      <Selector
        columns={1}
        allowClear={allowClear}
        value={null}
        list={[{ id: customKey, name: customKey }]}
        onChange={() => {
          onVisibleChange && onVisibleChange(false)
          setPickerVisible(true)
        }}
      />

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

export default CustomButton
