import React, { forwardRef } from 'react'
import validateMaxMin from './../utils/validateMaxMin'
import formatValue from './formatValue'
import WeekMain from './../WeekMain'

// 内库使用-start
import ModalPicker from './../../Modal/ModalPicker'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.ModalPicker
测试使用-end */

// WeekModal
const WeekModal = forwardRef(
  (
    {
      // Modal
      value,
      defaultPickerValue,
      onError,
      onBeforeChange,

      // Main
      min,
      max,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (min) props.mainProps.min = min
    if (max) props.mainProps.max = max

    return (
      <ModalPicker
        ref={ref}
        {...props}
        main={props?.main || WeekMain}
        onBeforeChange={async (currentValue) => {
          // 校验
          if ((min || max) && currentValue) {
            let newValue = validateMaxMin(currentValue, {
              type: 'week',
              min: min,
              max: max,
              onError: onError
            })

            if (newValue === false) return false

            // eslint-disable-next-line
            currentValue = newValue
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

export default WeekModal
