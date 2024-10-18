import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import dimensionalArray from './utils/dimensionalArray'
import formatValue from './utils/formatValue'
import getIndex from './utils/getIndex'
import Slots from './Slots'

let Main = forwardRef(
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
      allowClear,
      onBeforeChange,
      onChange,

      // Main: Picker Control properties
      defaultPickerValue,

      ...props
    },
    ref
  ) => {
    // 一维数组强制改成二维数组
    let lists = list
    let listCount = dimensionalArray(list)
    if (listCount === 1) {
      lists = [list]
    }

    // 节点
    let mainRef = useRef(null)
    let slotsRef = useRef(null)
    let valueRef = useRef(null)
    valueRef.current = formatValue(value, { lists, listCount })

    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        update: update
      }
    })

    // 列表从无到有,并且没有值,需要初始值
    useEffect(() => {
      let timeout = null
      if (!visible || !Array.isArray(list) || !list.length) return
      if (!Array.isArray(value) || !value.length) {
        // 延迟解决Modal的useEffect visible 后执行的问题
        if (timeout) window.clearTimeout(timeout)
        timeout = setTimeout(() => {
          onChange && onChange(valueRef.current)
        }, 10)
      }
      // eslint-disable-next-line
    }, [visible, JSON.stringify(list)])

    useEffect(() => {
      if (visible && Array.isArray(value) && value.length) {
        update()
      }
      // eslint-disable-next-line
    }, [value])

    // 更新视图
    function update() {
      let slots = slotsRef.current.querySelectorAll('.picker-slot')
      for (let i = 0; i < slots.length; i++) {
        let slot = slots[i]
        let y = -getIndex(valueRef.current[i], lists[i]) * 44
        slot.style.transform = `translateY(${y}px)`
      }
    }

    return (
      <div
        {...props}
        className={`picker-main${props.className ? ' ' + props.className : ''}`}
        ref={mainRef}
      >
        <div className="picker-layer">
          <div className="picker-layer-frame"></div>
        </div>
        <Slots
          ref={slotsRef}
          lists={lists}
          onDragEnd={({ rowIndex, slotIndex }) => {
            valueRef.current[slotIndex] = lists[slotIndex][rowIndex]
            onChange && onChange(valueRef.current)
          }}
        />
      </div>
    )
  }
)

export default Main
