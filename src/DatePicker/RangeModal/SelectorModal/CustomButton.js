import React, { useState } from 'react'
import _ from 'lodash'
import Selector from './../../../Selector'

import getCustomKey from './../../RangeMain/getCustomKey'
import getActiveOption from './../../RangeMain/getActiveOption'
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
  onBeforeChange,
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
        value={
          getActiveOption(value, ranges)?.name === customKey
            ? [{ id: customKey, name: customKey }]
            : null
        }
        list={[{ id: customKey, name: customKey }]}
        onChange={(newValue) => {
          // 清空
          if (_.isEmpty(newValue)) {
            onChange && onChange(null)
            onVisibleChange && onVisibleChange(false)
          }
          // 弹出选择
          else {
            onVisibleChange && onVisibleChange(false)
            setPickerVisible(true)
          }
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
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        visible={pickerVisible}
        onVisibleChange={setPickerVisible}
        {...props}
      />
    </>
  )
}

export default CustomButton
