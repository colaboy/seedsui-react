import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'

import Head from './../../Select/Modal/Head'
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

      // 自定义渲染
      itemRender,

      onBeforeChange,
      onChange,
      onSelect,
      onVisibleChange,

      // 定制属性
      maskProps = {},
      captionProps = {},
      submitProps = {},
      cancelProps = {},
      optionProps = {},

      // 树控件: 是否启用半选功能
      checkStrictly,
      // 树控件: 是否启用半选功能
      enableHalfChecked,
      // 树控件: 保留不在树结构中的value
      preserveValue,
      // 树控件: 仅允许点击末级节点
      onlyLeafCheck,
      // 树控件: 是否显示checkbox
      checkable,
      // 树控件: 过滤selectable, 根据checkable判断是否启用selectable, 没有checkbox时则启用
      selectable,
      // 树控件: 默认展开
      defaultExpandAll,

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
              itemRender={itemRender}
              value={tempValue}
              onChange={(newTempValue) => {
                tempValue = newTempValue
                setTempValue(tempValue)
                // multiple未传则为必选单选
                if (multiple === undefined) {
                  handleSubmitClick()
                }
              }}
              onSelect={onSelect}
              checkStrictly={checkStrictly}
              // 是否启用半选功能
              enableHalfChecked={enableHalfChecked}
              // 保留不在树结构中的value
              preserveValue={preserveValue}
              onlyLeafCheck={onlyLeafCheck}
              checkable={checkable}
              selectable={selectable}
              defaultExpandAll={defaultExpandAll}
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
