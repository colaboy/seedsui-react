import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import dimensionalArray from './utils/dimensionalArray'
import formatValue from './utils/formatValue'
import getIndex from './utils/getIndex'
import Slots from './Slots'

let Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main
      // MainComponent,
      // MainProps,

      // Main: common
      value,
      list,
      allowClear,
      onBeforeChange,
      onChange,

      ...props
    },
    ref
  ) => {
    // 一维数组强制改成二维数组
    let lists = list
    let listCount = 1

    let dimensional = dimensionalArray(list)
    if (dimensional === 2) {
      listCount = list.length
    } else {
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
        // 延迟解决Modal的useEffect visible 后执行的问题
        getValue: () => {
          return valueRef.current
        },
        update: update
      }
    })

    useEffect(() => {
      if (visible) {
        update()
      }
      // eslint-disable-next-line
    }, [visible, JSON.stringify(value)])

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
