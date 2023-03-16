import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'

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
      captionProps = {},
      submitProps = {},
      cancelProps = {},
      optionProps = {},

      checkStrictly,
      onlyLeafCheck,
      checkable,
      selectable,
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
    let [tempValue, setTempValue] = useState(null)

    useEffect(() => {
      setTempValue(value)
    }, [value])

    // 显示时触发onVisibleChange
    useEffect(() => {
      if (visible) {
        if (onVisibleChange) onVisibleChange(visible)
      }
      // eslint-disable-next-line
    }, [visible])

    // 点击确定
    async function handleSubmitClick(e) {
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(tempValue)
        if (!goOn) return
      }
      if (onChange) onChange(tempValue)
      if (onVisibleChange) onVisibleChange(false)
      e?.stopPropagation()
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
        {...maskProps}
        className={`mask picker-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
        ref={rootRef}
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
            captionProps={captionProps}
            cancelProps={cancelProps}
            submitProps={{
              // 必选单选不显示确定按钮
              visible: multiple !== undefined,
              // 多选确定带选中数量
              caption:
                locale('确定', 'ok') +
                // 多选带选中数量
                (multiple && Array.isArray(tempValue) && tempValue.length
                  ? `(${tempValue.length})`
                  : ''),
              ...submitProps
            }}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
          <div className="treepicker-modal-wrapper">
            <Tree
              multiple={multiple}
              list={list}
              value={tempValue}
              onChange={(newTempValue) => {
                tempValue = newTempValue
                setTempValue(tempValue)
                // multiple未传则为必选单选
                if (multiple === undefined) {
                  handleSubmitClick()
                }
              }}
              checkStrictly={checkStrictly}
              onlyLeafCheck={onlyLeafCheck}
              checkable={checkable}
              selectable={selectable}
              {...TreeProps}
            />
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
