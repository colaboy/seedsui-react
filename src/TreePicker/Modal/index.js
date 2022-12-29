import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Head from './../../Picker/Modal/Head'
import Tree from './../Tree'

const Modal = forwardRef(
  (
    {
      // 通用属性
      portal,
      getComboDOM,
      maskClosable,
      visible = false,
      multiple,
      value,
      list,
      onBeforeChange,
      onChange,
      onVisibleChange,

      // 定制属性
      maskProps = {},
      submitProps = {},
      cancelProps = {},
      optionProps = {},
      TreeProps = {},
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

    // 选中项
    const [tempValue, setTempValue] = useState(null)

    useEffect(() => {
      setTempValue(value)
    }, [JSON.stringify(value || '')])

    // 修改回调
    async function handleChange(newTempValue) {
      setTempValue(newTempValue)
    }

    // 点击确定
    async function handleSubmitClick(e) {
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(tempValue)
        if (!goOn) return
      }
      if (onChange) onChange(tempValue)
      if (onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 点击取消
    function handleCancelClick(e) {
      if (onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 点击遮罩
    function handleMaskClick(e) {
      if (maskProps.onClick) maskProps.onClick(e)
      if (maskClosable && onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    return createPortal(
      <div
        ref={rootRef}
        {...maskProps}
        className={`mask picker-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          {...props}
          className={`treepicker-modal${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {/* 头 */}
          <Head
            multiple={multiple}
            // caption
            cancelProps={cancelProps}
            submitProps={submitProps}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
          <div className="treepicker-modal-wrapper">
            <Tree list={list} value={tempValue} onChange={handleChange} {...TreeProps} />
          </div>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(Modal, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
