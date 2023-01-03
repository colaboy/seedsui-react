import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'
import Utils from './Utils'

// 日期选择
export default forwardRef(
  (
    {
      // 定制属性
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      value,
      format,
      onError,
      ModalProps,
      // 其它标准属性
      ...props
    },
    ref
  ) => {
    // 显示文本
    let displayValue = Utils.getDisplayValue({
      type: type,
      format: format,
      value: value
    })

    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        modalDOM: rootRef?.current?.modalDOM,
        instance: instance.current,
        getRootDOM: rootRef?.current?.getRootDOM,
        getModalDOM: rootRef?.current?.getModalDOM,
        getInstance: () => instance.current,
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return Utils.getDisplayValue({
            type: type,
            format: format,
            value: newValue || value
          })
        }
      }
    })

    return (
      <Combo
        ref={rootRef}
        value={displayValue}
        ModalComponent={Modal}
        ModalProps={{
          value: value,
          min: min,
          max: max,
          type: type,
          onError: onError,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)
