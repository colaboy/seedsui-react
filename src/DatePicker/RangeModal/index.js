// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useRef, useEffect } from 'react'

import Modal from './../../Modal'
import Quick from './Quick'
// 用于计算弹窗位置
import TooltipUtils from '../../Tooltip/Utils'

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
    // ranges分成两部分: quickRanges(快捷选择)和customRange(自定义选择)
    let quickRanges = {}
    let customRange = {}
    for (let rangeKey in ranges) {
      let rangeValue = ranges[rangeKey]
      if (
        Array.isArray(rangeValue) &&
        rangeValue.length === 2 &&
        rangeValue[0] instanceof Date &&
        rangeValue[1] instanceof Date
      ) {
        quickRanges[rangeKey] = rangeValue
      } else {
        customRange[rangeKey] = rangeValue
      }
    }

    // 受控显隐时, 需要更新容器位置
    useEffect(() => {
      let modalDOM = modalRef.current.rootDOM
      let comboDOM = null
      if (typeof getComboDOM === 'function') {
        comboDOM = getComboDOM()
        if (typeof comboDOM?.getRootDOM === 'function') {
          comboDOM = comboDOM.getRootDOM()
        }
      }
      if (visible && comboDOM && modalDOM) {
        TooltipUtils.updateContainerPosition({
          source: comboDOM,
          target: modalDOM,
          animation: 'slideDown'
        })
      }
    }, [visible]) // eslint-disable-line

    // 如果没有快捷选择, 直接渲染自定义选择
    if (Object.isEmptyObject(quickRanges)) {
      return null
    }

    // 返回快捷选择
    return (
      <Modal
        ref={modalRef}
        visible={visible}
        animation="slideDown"
        className="datepicker-rangemodal-modal"
        onVisibleChange={onVisibleChange}
        {...props}
      >
        <Quick ranges={quickRanges} onChange={onChange} />
      </Modal>
    )
  }
)

export default RangeModal
