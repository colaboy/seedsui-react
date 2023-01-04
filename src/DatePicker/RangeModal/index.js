// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useRef, useEffect } from 'react'

import Modal from './../../Modal'
// 快捷选择
import Quick from './Quick'
import Custom from './Custom'
// 非快捷选择
import CustomModal from './Modal'

// 用于计算弹窗位置
import TooltipUtils from '../../Tooltip/Utils'
import Utils from './Utils'

const RangeModal = forwardRef(
  (
    {
      // 通用属性
      portal, // 支持{mask: MaskNode}
      getComboDOM,
      maskClosable = true,
      value,
      list, // {year: [], quarter: [], month: [], day: [], hour: [], minute: []}

      onBeforeChange,
      onChange,

      visible = false,
      onVisibleChange,

      maskProps = {},
      wrapperProps = {},
      submitProps = {},
      cancelProps = {},

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
    const { quickRanges, customRanges } = Utils.getRanges(ranges)

    // 受控显隐时, 需要更新容器位置
    useEffect(() => {
      let modalDOM = modalRef?.current?.rootDOM
      let comboDOM = null
      if (typeof getComboDOM === 'function') {
        comboDOM = getComboDOM()
        if (typeof comboDOM?.getRootDOM === 'function') {
          comboDOM = comboDOM.getRootDOM()
        }
      }
      if (visible && comboDOM && modalDOM && !maskProps?.style?.top && !maskProps?.style?.bottom) {
        TooltipUtils.updateContainerPosition({
          source: comboDOM,
          target: modalDOM,
          animation: 'slideDown'
        })
      }
    }, [visible]) // eslint-disable-line

    // 如果没有快捷选择, 直接渲染自定义选择
    if (Object.isEmptyObject(quickRanges)) {
      return (
        <CustomModal
          maskClosable={maskClosable}
          value={value}
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
        maskClosable={maskClosable}
        visible={visible}
        animation="slideDown"
        className="datepicker-rangemodal-modal"
        onVisibleChange={onVisibleChange}
        {...props}
      >
        {/* 快捷选择 */}
        <Quick
          ranges={quickRanges}
          onBeforeChange={onBeforeChange}
          onChange={onChange}
          onVisibleChange={onVisibleChange}
        />
        {/* 自定义选择 */}
        <Custom
          maskClosable={maskClosable}
          value={value}
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
