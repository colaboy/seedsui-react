import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Head from './../../Picker/Modal/Head'

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
      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    list = list.filter((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    // 显示时初始化选中项
    useEffect(() => {
      if (visible) {
        updateActive()
      }
      // 显示时触发onVisibleChange
      if (visible) {
        if (onVisibleChange) onVisibleChange(visible)
      }
      // eslint-disable-next-line
    }, [visible])

    // 初始化选中项
    function updateActive() {
      let optionsDOM = getOptionsDOM()
      optionsDOM.forEach((option, index) => {
        let isActive = getIsActive(list[index])
        if (isActive) {
          option.classList.add('active')
        } else {
          option.classList.remove('active')
        }
      })
    }

    // 根据value判断此项是否为选中状态
    function getIsActive(item) {
      if (!Array.isArray(value) || !value.length) {
        return false
      }
      let isActive = value.some((activeItem) => {
        if (item.id && activeItem.id) {
          return item.id === activeItem.id
        } else if (item.name && activeItem.name) {
          return item.name === activeItem.name
        } else {
          return false
        }
      })

      return isActive
    }

    // 获取选中项DOM
    function getActiveOptionsDOM() {
      return [].slice.call(
        rootRef.current.querySelector('.select-modal-wrapper').querySelectorAll('.active')
      )
    }
    // 获取所有选项DOM
    function getOptionsDOM() {
      return [].slice.call(rootRef.current.querySelectorAll('.select-modal-option'))
    }
    // 修改回调
    async function handleChange() {
      let newValue = getActiveOptionsDOM()
      newValue = newValue.map((option) => {
        const index = option.getAttribute('data-index')
        return list[index]
      })
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (!goOn) return
      }
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }

    // 点击确定
    async function handleSubmitClick(e) {
      handleChange()
      e.stopPropagation()
    }

    // 点击取消
    function handleCancelClick(e) {
      if (onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 点击项
    function handleOptionClick(e) {
      if (optionProps.onClick) optionProps.onClick(e)
      if (!multiple) {
        let options = getActiveOptionsDOM()
        options.forEach((option) => {
          return option.classList.remove('active')
        })
      }
      e.target.classList.toggle('active')
      if (!multiple) {
        handleChange()
      }
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
          {...props}
          className={`select-modal${props.className ? ' ' + props.className : ''}${
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
          <div className="select-modal-wrapper">
            {list.map((item, index) => {
              return (
                <div
                  key={index}
                  {...optionProps}
                  className={`select-modal-option${
                    optionProps.className ? ' ' + optionProps.className : ''
                  }`}
                  data-index={index}
                  onClick={handleOptionClick}
                >
                  <p className="select-modal-option-caption">{item.name}</p>
                  <i className="select-modal-option-icon"></i>
                </div>
              )
            })}
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
