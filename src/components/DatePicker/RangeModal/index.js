import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react'
import getDefaultRanges from './../RangeMain/getDefaultRanges'
import formatValue from './formatValue'
import validateRange from './validateRange'
import matchRangeId from './matchRangeId'
import RangeMain from './../RangeMain'

// 内库使用-start
import SelectModal from './../../Modal/SelectModal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const SelectModal = Modal.SelectModal
测试使用-end */

// RangeModal
const RangeModal = forwardRef(
  (
    {
      // Modal
      value,
      defaultPickerValue,
      onError,
      onChange,
      onBeforeChange,
      onRangeIdChange,
      onVisibleChange,

      // Main
      type,
      diff,
      min,
      max,
      hourStep,
      minuteStep,
      disabledStart,
      disabledEnd,
      rangeId,
      ranges,
      titles,
      ...props
    },
    ref
  ) => {
    if (ranges === undefined) {
      // eslint-disable-next-line
      ranges = getDefaultRanges()
    }

    const modalRef = useRef(null)
    // 当前选中项
    let [currentRangeId, setCurrentRangeId] = useState(rangeId)

    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (type) props.mainProps.type = type
    if (min) props.mainProps.min = min
    if (max) props.mainProps.max = max
    if (hourStep) props.mainProps.hourStep = hourStep
    if (minuteStep) props.mainProps.minuteStep = minuteStep
    if (disabledStart) props.mainProps.disabledStart = disabledStart
    if (disabledEnd) props.mainProps.disabledEnd = disabledEnd
    if (titles) props.mainProps.titles = titles

    props.mainProps.ranges = ranges
    props.mainProps.portal = modalRef?.current?.rootDOM
    props.mainProps.rangeId = currentRangeId
    props.mainProps.onChange = (newValue, { rangeId: newRangeId } = {}) => {
      setCurrentRangeId(newRangeId)
    }

    useImperativeHandle(ref, () => {
      return modalRef.current
    })

    return (
      <SelectModal
        ref={modalRef}
        {...props}
        main={props?.main || RangeMain}
        onChange={(newValue) => {
          // 隐藏时校验rangeId和日期不匹配, 则清空rangeId
          currentRangeId = matchRangeId(newValue, {
            type,
            rangeId: currentRangeId,
            ranges
          })
          setCurrentRangeId(currentRangeId)
          onRangeIdChange && onRangeIdChange(currentRangeId)

          onChange && onChange(newValue, { rangeId: currentRangeId, ranges: ranges })
        }}
        onBeforeChange={async (newValue) => {
          // 校验
          let currentValue = validateRange(newValue, {
            type: type,
            min: min,
            max: max,
            diff: diff,
            onError: onError
          })

          if (currentValue === false) return false

          // 修改提示
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(currentValue, {
              rangeId: currentRangeId,
              ranges: ranges
            })
            // 只有合法值才需要处理, 其它值概不处理
            if (goOn === false || typeof goOn === 'object') {
              return goOn
            }
          }

          return currentValue
        }}
        onVisibleChange={(visible) => {
          // 显示时校验rangeId和日期不匹配, 则清空rangeId
          if (visible) {
            currentRangeId = matchRangeId(value, {
              type,
              rangeId: currentRangeId,
              ranges
            })
            setCurrentRangeId(currentRangeId)
          }
          onVisibleChange && onVisibleChange(visible)
        }}
        value={formatValue(value || defaultPickerValue)}
        className={`picker-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default RangeModal
