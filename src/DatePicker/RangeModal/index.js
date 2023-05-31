// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useRef } from 'react'

import Modal from './../../Modal'
// 快捷选择
import Quick from './Quick'
import Custom from './Custom'
// 非快捷选择
import DateRangeModal from './DateRangeModal'

// 区间库
import { getRanges } from './../utils'

const RangeModal = forwardRef(
  (
    {
      // 通用属性
      portal, // 支持{mask: MaskNode}
      getComboDOM,
      maskClosable = true,
      value,
      defaultPickerValue,
      list, // {year: [], quarter: [], month: [], day: [], hour: [], minute: []}

      onBeforeChange,
      onChange,

      visible = false,
      onVisibleChange,

      maskProps = {},
      wrapperProps = {},

      captionProps,
      submitProps,
      cancelProps,

      // 定制属性
      ranges,
      type = 'date', // year | quarter | month | date | time | datetime
      min,
      max,

      onError,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef(null)
    // ranges分成两部分: quickRanges(快捷选择)和customRanges(自定义选择)
    const { quickRanges, customRanges } = getRanges(ranges)

    // 如果没有快捷选择, 直接渲染日期区间选择
    if (Object.isEmptyObject(quickRanges)) {
      return (
        <DateRangeModal
          captionProps={captionProps}
          submitProps={submitProps}
          cancelProps={cancelProps}
          maskClosable={maskClosable}
          maskProps={maskProps}
          value={value}
          defaultPickerValue={defaultPickerValue}
          ranges={customRanges}
          type={type}
          min={min}
          max={max}
          onError={onError}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          visible={visible}
          onVisibleChange={onVisibleChange}
        />
      )
    }

    // 返回快捷选择
    return (
      <Modal
        ref={modalRef}
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
        maskProps={maskProps}
        visible={visible}
        animation="slideDown"
        className="datepicker-rangemodal-modal"
        onVisibleChange={onVisibleChange}
        {...props}
      >
        {/* 快捷选择 */}
        <Quick
          value={value}
          ranges={quickRanges}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onVisibleChange={onVisibleChange}
        />
        {/* 自定义选择 */}
        <Custom
          captionProps={captionProps}
          submitProps={submitProps}
          cancelProps={cancelProps}
          maskClosable={maskClosable}
          value={value}
          defaultPickerValue={defaultPickerValue}
          ranges={customRanges}
          type={type}
          min={min}
          max={max}
          onError={onError}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onVisibleChange={onVisibleChange}
        />
      </Modal>
    )
  }
)

export default RangeModal
