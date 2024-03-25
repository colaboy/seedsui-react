import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import Modal from './../../../Modal'

// 测试使用
// import Modal from 'seedsui-react/lib/Modal'
import RangeMain from './../../RangeMain'

// 快捷选择
const SelectorModal = function (
  {
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
    allowClear,
    onBeforeChange,
    onChange,

    // Main: Picker Control properties
    defaultPickerValue,

    // Combo|Main: DatePicker Control properties
    titles,
    titleFormatter,
    min,
    max,
    rangeLimit,
    type,
    onError,
    ranges,
    modal,
    ...props
  },
  ref
) {
  // 选中的key
  const activeKeyRef = useRef(null)

  // 弹窗显示
  let ModaNode = Modal
  let modalProps = {
    sourceDOM: () => {
      let comboDOM = null
      if (typeof getComboDOM === 'function') {
        comboDOM = getComboDOM()
        if (typeof comboDOM?.getRootDOM === 'function') {
          comboDOM = comboDOM.getRootDOM()
        }
      }
      return comboDOM
    },
    animation: 'slideDown',
    className: 'datepicker-rangemodal-modal datepicker-rangemodal-modal-dropdown'
  }
  if (modal === 'picker') {
    ModaNode = Modal.Picker
    modalProps = {
      className: 'datepicker-rangemodal-modal datepicker-rangemodal-modal-picker'
    }
  }

  useImperativeHandle(ref, () => {
    return {
      // 获取选中项
      getActiveKey: () => {
        return activeKeyRef.current
      }
    }
  })

  return (
    <>
      {/* 快捷选择 */}
      <ModaNode
        portal={portal}
        maskClosable={maskClosable}
        visible={visible}
        onVisibleChange={onVisibleChange}
        {...modalProps}
        {...props}
      >
        <div className="datepicker-rangemodal-main">
          <RangeMain
            customModal="picker"
            portal={portal}
            titles={titles}
            ranges={ranges}
            value={value}
            allowClear={allowClear}
            type={type}
            min={min}
            max={max}
            rangeLimit={rangeLimit}
            onError={onError}
            onBeforeChange={onBeforeChange}
            onChange={(newValue, { activeKey }) => {
              activeKeyRef.current = activeKey
              onChange && onChange(newValue)
              onVisibleChange && onVisibleChange(false)
            }}
            customDatePickerProps={{
              onVisibleChange: (pickerVisible, options) => {
                // 主页面自定义弹窗显示
                if (options?.modal === 'picker' && pickerVisible) {
                  onVisibleChange && onVisibleChange(false)
                }
              },
              ...props
            }}
          />
        </div>
      </ModaNode>
    </>
  )
}

export default forwardRef(SelectorModal)
