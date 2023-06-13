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

      // 自定义渲染
      itemRender,

      onBeforeChange,
      onChange,
      onVisibleChange,

      // 定制属性
      maskProps = {},
      wrapperProps = {},
      captionProps = {},
      submitProps = {},
      cancelProps = {},
      slotProps = {},
      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    // eslint-disable-next-line
    list = list.filter((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    // 节点
    const rootRef = useRef(null)
    const wrapperRef = useRef(null)
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
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (instance.current) {
        if (visible && list.length) {
          setDefault()
        }
      } else if (list && list.length > 0) {
        initInstance()
      }
      // eslint-disable-next-line
    }, [visible])

    // 事件
    async function handleSubmitClick() {
      let s = instance.current
      const newValue = s.activeOptions
      if (submitProps?.onClick) submitProps.onClick(s)
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (!goOn) return
      }
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleCancelClick(e) {
      if (cancelProps?.onClick) cancelProps.onClick(e)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleMaskClick(e) {
      if (!e.target.classList.contains('mask')) return
      let s = instance.current
      if (maskProps.onClick) maskProps.onClick(s)
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
        wrapper: wrapperRef.current
      })
      // 默认项
      const defaultOpt = getDefaultOption()
      let id = ''
      if (defaultOpt && defaultOpt.id) id = defaultOpt.id
      instance.current.addSlot(list, id, slotProps.className || 'text-center')
      rootRef.current.instance = instance
    }

    if (!Array.isArray(list) || !list.length) {
      console.error('Picker.Modal: Wrong parameter with "list"! You need pass a Array')
      return null
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
          className={`picker${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {/* 头 */}
          <Head
            captionProps={captionProps}
            cancelProps={cancelProps}
            submitProps={submitProps}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
          <div
            {...wrapperProps}
            className={`picker-wrapper${
              wrapperProps.className ? ' ' + wrapperProps.className : ''
            }`}
            ref={wrapperRef}
          >
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
  if (nextProps.visible !== prevProps.visible) return false
  if (nextProps.submitProps?.visible !== prevProps.submitProps?.visible) return false
  return true
})
