import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import DragList from './utils/DragList'
import getIndex from './utils/getIndex'

// 内库使用
import { formatList } from './../../Select/utils'

// 测试使用
// import { formatList } from 'seedsui-react/lib/Select/utils'

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
    // 过滤非法数据
    // eslint-disable-next-line
    list = formatList(list)

    // 节点
    let mainRef = useRef(null)
    let slotRef = useRef(null)
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
        cellSize: 44,
        slotHeight: (list.length - 1) * 44,
        slot: slotRef.current,
        onDragEnd: ({ index }) => {
          onChange && onChange([list[index]])
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
      let y = -getIndex(value, list) * 44
      slotRef.current.style.transform = `translateY(${y}px)`
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
        <div className="picker-slotbox">
          <ul ref={slotRef} className="picker-slot text-center">
            {(list || []).map((item, index) => {
              return <li key={item.id || index}>{item.name}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
)

export default Main
