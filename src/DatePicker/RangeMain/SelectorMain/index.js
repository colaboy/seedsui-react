import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import _ from 'lodash'
import getCustomRangeId from './getCustomRangeId'
import getDefaultRangeId from './getDefaultRangeId'

import CustomModal from './CustomModal'
import Buttons from './Buttons'

// 日期快捷选择
function RangeMain(
  {
    // Main properties
    value,
    type,
    min,
    max,
    disabledStart,
    disabledEnd,
    allowClear,
    onChange,

    rangeId,
    ranges,
    titles,
    customModal = 'dates', // dates | picker
    portal,
    SelectorProps,
    DatePickerModalProps,
    ...props
  },
  ref
) {
  // 自定义项id
  let customRangeId = getCustomRangeId(ranges)

  // 当前选中项id
  let defaultRangeId = getDefaultRangeId(value, ranges, type)
  let currentRangeId = rangeId || defaultRangeId

  // 自定义选项弹窗
  let [customModalVisible, setCustomModalVisible] = useState(false)

  const mainRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: mainRef.current,
      getRootDOM: () => mainRef.current
    }
  })

  console.log('当前选择项:', currentRangeId)
  return (
    <div
      {...props}
      className={`datepicker-selector${props.className ? ' ' + props.className : ''}`}
      ref={mainRef}
    >
      {/* 快捷选择 */}
      <Buttons
        value={value}
        type={type}
        onChange={onChange}
        rangeId={currentRangeId}
        ranges={ranges}
        titles={titles}
        SelectorProps={SelectorProps}
        allowClear={allowClear}
      />

      {/* 自定义区间: 文本框选择 */}
      {customRangeId && currentRangeId === customRangeId && (
        <CustomModal
          // customModal为picker时，需要控制显隐
          visible={customModalVisible}
          onVisibleChange={(datePickerVisible, options) => {
            setCustomModalVisible(datePickerVisible)
          }}
          customModal={customModal}
          DatePickerModalProps={DatePickerModalProps}
          portal={portal}
          type={type}
          allowClear={allowClear}
          value={value}
          min={min}
          max={max}
          disabledStart={disabledStart}
          disabledEnd={disabledEnd}
          onChange={(newValue) => {
            onChange &&
              onChange(newValue, {
                ranges: ranges,
                rangeId: customRangeId
              })
          }}
        />
      )}
    </div>
  )
}

export default forwardRef(RangeMain)
