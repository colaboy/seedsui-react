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

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }

    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskProps = filterProps(maskProps)
    const otherSubmitProps = filterProps(submitProps)
    const otherCancelProps = filterProps(cancelProps)

    // console.log(visible)
    return createPortal(
      <div
        ref={rootRef}
        {...otherMaskProps}
        className={`mask picker-mask${
          otherMaskProps.className ? ' ' + otherMaskProps.className : ''
        }${visible ? ' active' : ''}`}
      >
        <div {...props} className={`picker${props.className ? ' ' + props.className : ''}`}>
          {/* 头 */}
          <Head
            // 为了启用确定按钮
            multiple={true}
            // caption
            cancelProps={otherCancelProps}
            submitProps={otherSubmitProps}
          />
          {rootRef.current && (
            <DatePickerModal visible={visible} portal={{ mask: rootRef.current }} {...props} />
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
