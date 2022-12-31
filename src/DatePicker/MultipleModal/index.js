// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'
import Head from './../../Picker/Modal/Head'
import DatePickerModal from './../Modal'

const MultipleModal = forwardRef(
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
      submitProps = {},
      cancelProps = {},

      // 定制属性
      type = 'date', // year | quarter | month | date | time | datetime
      min,
      max,

      onError,
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {}, []) // eslint-disable-line

    // console.log(visible)
    return createPortal(
      <div
        ref={rootRef}
        {...maskProps}
        className={`mask picker-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
      >
        <div
          {...props}
          className={`picker${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {/* 头 */}
          <Head
            // 为了启用确定按钮
            multiple={true}
            // caption
            cancelProps={cancelProps}
            submitProps={submitProps}
            // onSubmitClick={handleSubmitClick}
            // onCancelClick={handleCancelClick}
          />
          {rootRef.current && (
            <DatePickerModal visible={visible} portal={{ content: true }} {...props} />
          )}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(MultipleModal, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
