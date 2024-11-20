import React, { forwardRef } from 'react'
import validateMaxMin from '../utils/validateMaxMin'
import formatValue from './formatValue'
import Main from './../Main'

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
      onBeforeChange,

      // Main
      type,
      min,
      max,
      hourStep,
      minuteStep,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (type) props.MainProps.type = type
    if (min) props.MainProps.min = min
    if (max) props.MainProps.max = max
    if (hourStep) props.MainProps.hourStep = hourStep
    if (minuteStep) props.MainProps.minuteStep = minuteStep

    return (
      <ModalPicker
        ref={ref}
        {...props}
        onBeforeChange={async (currentValue) => {
          // 校验
          if ((min || max) && currentValue) {
            let newValue = validateMaxMin(currentValue, {
              type: type,
              min: min,
              max: max,
              onError: onError
            })

            if (!newValue) return false

            // eslint-disable-next-line
            currentValue = newValue
          }

          // 修改提示
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(currentValue)
            if (goOn !== false) {
              return goOn || currentValue
            }
            return goOn
          }

          return currentValue
        }}
        value={formatValue(value || defaultPickerValue)}
        className={`picker-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={Main}
      />
    )
  }
)

export default Modal
