import React, { forwardRef, useState } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import validateRange from './validateRange'
import matchRangeId from './matchRangeId'
import formatValue from './../MultipleMain/formatValue'
import RangeMain from './../RangeMain'

// 内库使用
import ModalPicker from './../../Modal/MainPicker'

// 测试使用
// import { Modal } from 'seedsui-react'
// const ModalPicker = Modal.MainPicker

// Modal
const Modal = forwardRef(
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
      ranges = defaultRanges,
      titles,
      ...props
    },
    ref
  ) => {
    // 当前选中项
    let [currentRangeId, setCurrentRangeId] = useState(rangeId)

    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (type) props.MainProps.type = type
    if (min) props.MainProps.min = min
    if (max) props.MainProps.max = max
    if (hourStep) props.MainProps.hourStep = hourStep
    if (minuteStep) props.MainProps.minuteStep = minuteStep
    if (disabledStart) props.MainProps.disabledStart = disabledStart
    if (disabledEnd) props.MainProps.disabledEnd = disabledEnd
    if (ranges) props.MainProps.ranges = ranges
    if (titles) props.MainProps.titles = titles
    props.MainProps.rangeId = currentRangeId || rangeId
    props.MainProps.onChange = (newValue, { rangeId: newRangeId, ranges } = {}) => {
      setCurrentRangeId(newRangeId)
    }

    return (
      <ModalPicker
        ref={ref}
        {...props}
        onChange={(newValue, { rangeId: newRangeId, ranges } = {}) => {
          onRangeIdChange && onRangeIdChange(newRangeId)
          onChange && onChange(newValue, { rangeId: newRangeId, ranges })
        }}
        onBeforeChange={async (newValue, { rangeId: newRangeId, ranges } = {}) => {
          // 校验
          let currentValue = validateRange(newValue, {
            type: type,
            min: min,
            max: max,
            diff: diff,
            onError: onError
          })

          if (currentValue === false) return

          // 修改提示
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(currentValue, { rangeId: newRangeId, ranges })
            if (goOn !== false) {
              return goOn || currentValue
            }
            return goOn
          }

          return currentValue
        }}
        onVisibleChange={(visible, { currentArgumentsRef } = {}) => {
          if (visible) {
            // 若rangeId和日期不匹配则清空rangeId
            currentRangeId = matchRangeId(value, {
              type,
              rangeId: rangeId || currentRangeId,
              ranges
            })
            currentArgumentsRef.current = currentRangeId
            setCurrentRangeId(currentRangeId)
          }
          onVisibleChange && onVisibleChange(visible)
        }}
        value={formatValue(value || defaultPickerValue)}
        className={`picker-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={RangeMain}
      />
    )
  }
)

export default Modal
