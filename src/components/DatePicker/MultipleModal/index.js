import React, { forwardRef } from 'react'
import validateMaxMin from '../utils/validateMaxMin'
import formatValue from './../MultipleMain/formatValue'
import MultipleMain from './../MultipleMain'

// 内库使用-start
import ModalPicker from './../../Modal/Modal'
// 内库使用-end

/* 测试使用-start
import { Modal as BaseModal } from 'seedsui-react'
const ModalPicker = BaseModal.Picker
测试使用-end */

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
        MainComponent={props?.MainComponent || MultipleMain}
        onBeforeChange={async (currentValue) => {
          // 校验
          if (min || max) {
            // 校验值是否合法
            for (let tab of currentValue) {
              let newValue = validateMaxMin(tab.value, {
                type: type,
                min: min,
                max: max,
                onError: onError
              })

              if (newValue === false) return
              tab.value = newValue
            }
          }

          // 修改提示
          if (typeof onBeforeChange === 'function') {
            let goOn = await onBeforeChange(currentValue)
            // 只有合法值才需要处理, 其它值概不处理
            if (goOn === false || typeof goOn === 'object') {
              return goOn
            }
          }

          return currentValue
        }}
        value={formatValue(value || defaultPickerValue)}
        className={`picker-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default Modal
