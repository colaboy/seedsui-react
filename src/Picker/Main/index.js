import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { formatList } from './../../Select/utils'
import Instance from './instance.js'

const Main = forwardRef(
  (
    {
      // Modal
      visible,

      // Main
      // MainComponent,
      // MainProps,

      // Main: common
      value,
      list,
      multiple,
      onSelect,
      onBeforeChange,
      onChange,

      // Main: Picker Control properties
      defaultPickerValue,
      slotProps,

      ...props
    },
    ref
  ) => {
    // 过滤非法数据
    // eslint-disable-next-line
    list = formatList(list)

    // 节点
    const mainRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        instance: instance.current,
        getInstance: () => instance.current,
        update: update
      }
    })

    useEffect(() => {
      initInstance()
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (visible) {
        update()
      }
      // eslint-disable-next-line
    }, [visible])

    // 更新视图
    function update() {
      if (instance.current) {
        if (list.length) {
          setDefault()
        }
      } else if (list && list.length > 0) {
        initInstance()
      }
    }

    // 设置默认选中项
    function setDefault() {
      const defaultOpt = getDefaultOption()
      if (!defaultOpt) return
      instance.current.clearSlots()
      instance.current.addSlot(list, defaultOpt.id || '', slotProps?.className || 'text-center') // 添加列,参数:数据,默认id,样式(lock样式为锁定列)
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
        wrapper: mainRef.current,
        onScrollEnd: handleScrollEnd
      })
      // 默认项
      const defaultOpt = getDefaultOption()
      let id = ''
      if (defaultOpt && defaultOpt.id) id = defaultOpt.id
      instance.current.addSlot(list, id, slotProps?.className || 'text-center')
      mainRef.current.instance = instance
    }

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onScrollEnd = handleScrollEnd
    }

    // 滚动结束
    function handleScrollEnd(s) {
      const newValue = s.activeOptions
      if (onChange) onChange(newValue)
    }

    if (!Array.isArray(list) || !list.length) {
      return null
    }

    return (
      <div
        {...props}
        className={`picker-wrapper${props.className ? ' ' + props.className : ''}`}
        ref={mainRef}
      >
        <div className="picker-layer">
          <div className="picker-layer-frame"></div>
        </div>
        <div className="picker-slotbox"></div>
      </div>
    )
  }
)

export default Main
