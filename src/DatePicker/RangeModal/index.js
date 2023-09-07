// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useRef } from 'react'
import locale from './../../locale'

import Head from './../../Select/Modal/Head'
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
      // 显示文本格式化和value格式化
      valueFormatter,

      // Combo
      getComboDOM,

      // Modal fixed properties
      visible,
      onVisibleChange,

      // Modal
      ModalComponent,
      ModalProps,

      // Modal: display properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable,

      // Main
      MainComponent,
      MainProps,

      // Main: common
      value,
      list, // [{id: '', name: ''}]
      multiple,
      onSelect,
      onBeforeChange,
      onChange,

      // Main: render
      checkedType,
      checkedPosition,
      checkable,
      headerRender,
      footerRender,
      listRender,
      listHeaderRender,
      listFooterRender,
      listExtraHeaderRender,
      listExtraFooterRender,
      itemRender,
      itemContentRender,
      itemProps,
      checkboxProps,

      // Main: Picker Control properties
      defaultPickerValue,

      // Combo|Main: DatePicker Control properties
      titleFormatter,
      min,
      max,
      type = 'date', // year | quarter | month | date | time | datetime
      onError,
      ranges,
      rangesModal = 'dropdown', // 弹出方式dropdown
      separator,

      // 纯渲染时不渲染Main
      children,
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
        sourceDOM={
          rangesModal === 'dropdown'
            ? () => {
                let comboDOM = null
                if (typeof getComboDOM === 'function') {
                  comboDOM = getComboDOM()
                  if (typeof comboDOM?.getRootDOM === 'function') {
                    comboDOM = comboDOM.getRootDOM()
                  }
                }
                return comboDOM
              }
            : undefined
        }
        maskClosable={maskClosable}
        maskProps={maskProps}
        visible={visible}
        animation={rangesModal === 'dropdown' ? 'slideDown' : 'slideUp'}
        className="datepicker-rangemodal-modal"
        onVisibleChange={onVisibleChange}
        {...props}
      >
        {/* picker模态框时显示头 */}
        {rangesModal === 'dropdown' ? null : (
          <Head
            // 标题
            captionProps={{ caption: locale('选择时间段', 'picker_date_range_title') }}
            onCancelClick={() => onVisibleChange(false)}
          />
        )}
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
