import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react'
import defaultRanges from './../RangeMain/defaultRanges'
import validateRange from './validateRange'
import matchRangeId from './matchRangeId'
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
    const modalRef = useRef(null)
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

    props.MainProps.portal = modalRef?.current?.rootDOM
    props.MainProps.rangeId = currentRangeId
    props.MainProps.onChange = (newValue, { rangeId: newRangeId, ranges } = {}) => {
      setCurrentRangeId(newRangeId)
    }

    useImperativeHandle(ref, () => {
      return modalRef.current
    })

    return (
      <ModalPicker
        ref={modalRef}
        {...props}
        onChange={(newValue, { rangeId: newRangeId } = {}) => {
          // 隐藏时校验rangeId和日期不匹配, 则清空rangeId
          currentRangeId = matchRangeId(newValue, {
            type,
            rangeId: newRangeId,
            ranges
          })
          onRangeIdChange && onRangeIdChange(currentRangeId)
          onChange && onChange(newValue, { rangeId: currentRangeId })
        }}
        onBeforeChange={async (newValue, { rangeId: newRangeId } = {}) => {
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
            let goOn = await onBeforeChange(currentValue, { rangeId: newRangeId, ranges })
            // 只有合法值才需要处理, 其它值概不处理
            if (goOn === false || typeof goOn === 'object') {
              return goOn
            }
          }

          return currentValue
        }}
        onVisibleChange={(visible, { currentArgumentsRef } = {}) => {
          // 显示时校验rangeId和日期不匹配, 则清空rangeId
          if (visible) {
            currentRangeId = matchRangeId(value, {
              type,
              rangeId: currentRangeId,
              ranges
            })
            if (!currentArgumentsRef.current) currentArgumentsRef.current = {}
            currentArgumentsRef.current = {
              rangeId: currentRangeId
            }

            setCurrentRangeId(currentRangeId)
          }
          onVisibleChange && onVisibleChange(visible)
        }}
        value={value || defaultPickerValue}
        className={`picker-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={RangeMain}
      />
    )
  }
)

export default Modal
