import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import dimensionalArray from './utils/dimensionalArray'
import DragList from './utils/DragList'
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
    // 一维数组强制改成二维数组
    let lists = list
    let listCount = dimensionalArray(list)
    if (listCount === 1) {
      lists = [list]
    }

    // 节点
    let mainRef = useRef(null)
    let slotsRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        update: update
      }
    })

    useEffect(() => {
      let dragList = DragList({
        container: mainRef.current,
        lists: lists,
        cellSize: 44,
        onDragEnd: ({ index, slotIndex }) => {
          onChange && onChange([lists[slotIndex][index]])
        }
      })
      dragList.events('removeEventListener')
      dragList.events('addEventListener')
      // eslint-disable-next-line
    }, [])

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
        let y = -getIndex(value[i], lists[i]) * 44
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
        <Slots ref={slotsRef} lists={lists} />
      </div>
    )
  }
)

export default Main
