import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Combo from './../../Picker/Combo'
import MultipleModal from './../MultipleModal'

// 日期多选
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
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        modalDOM: rootRef?.current?.modalDOM,
        getRootDOM: rootRef?.current?.getRootDOM,
        getModalDOM: rootRef?.current?.getModalDOM
      }
    })

    return (
      <Combo
        ref={rootRef}
        value={value}
        ModalComponent={MultipleModal}
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
