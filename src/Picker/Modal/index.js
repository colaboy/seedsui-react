import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Instance from './instance.js'
import Head from './Head'

const Modal = forwardRef(
  (
    {
      // 通用属性
      portal,
      getComboDOM,
      maskClosable,
      visible = false,
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
      slotProps = {},
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
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      initInstance()
    }, []) // eslint-disable-line

    useEffect(() => {
      if (instance.current) {
        if (visible && list.length) {
          setDefault()
          instance.current.show()
        } else {
          instance.current.hide()
        }
      } else if (list && list.length > 0) {
        initInstance()
      }
    }, [visible]) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClickSubmit = handleSubmitClick
      instance.current.params.onClickCancel = handleCancelClick
      instance.current.params.onClickMask = handleMaskClick
    }

    // 事件
    async function handleSubmitClick(e) {
      const newValue = e.activeOptions
      if (submitProps.onClick) submitProps.onClick(e)
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (!goOn) return
      }
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleCancelClick(e) {
      if (cancelProps.onClick) cancelProps.onClick(e)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleMaskClick(e) {
      if (maskProps.onClick) maskProps.onClick(e)
      if (maskClosable && onVisibleChange) onVisibleChange(false)
    }

    // 设置默认选中项
    function setDefault() {
      const defaultOpt = getDefaultOption()
      if (!defaultOpt) return
      instance.current.clearSlots()
      instance.current.addSlot(list, defaultOpt.id || '', slotProps.className || 'text-center') // 添加列,参数:数据,默认id,样式(lock样式为锁定列)
    }

    function getDefaultOption() {
      if (Array.isArray(value) && value.length) {
        return value[0]
      }
      if (list && list.length) {
        return list[0]
      }
      return null
    }

    // 实例化
    function initInstance() {
      if (!list || !list.length || instance.current) {
        console.log('SeedsUI Picker: 参数list为空')
        return
      }
      // render数据
      instance.current = new Instance({
        mask: rootRef.current,
        onClickMask: handleMaskClick,
        onClickCancel: handleCancelClick,
        onClickSubmit: handleSubmitClick,
        onHid: (e) => {}
      })
      // 默认项
      const defaultOpt = getDefaultOption()
      let id = ''
      if (defaultOpt && defaultOpt.id) id = defaultOpt.id
      instance.current.addSlot(list, id, slotProps.className || 'text-center')
      if (visible && instance.current) {
        instance.current.show()
      }
      rootRef.current.instance = instance
    }

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
    return createPortal(
      <div
        ref={rootRef}
        {...otherMaskProps}
        className={`mask picker-mask${
          otherMaskProps.className ? ' ' + otherMaskProps.className : ''
        }`}
      >
        <div {...props} className={`picker${props.className ? ' ' + props.className : ''}`}>
          {/* 头 */}
          <Head
            // 为了启用确定按钮
            multiple={true}
            captionProps={captionProps}
            cancelProps={otherCancelProps}
            submitProps={otherSubmitProps}
          />
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
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
