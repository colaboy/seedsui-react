// require PrototypeArray.js
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import List from './List'

// 树菜单选择
const Menu = forwardRef(
  (
    {
      value = [], // 选中项: [{id: '', name: ''}]
      list = [], // 数据: [{id: '', name: '', parentid: ''}]

      onChange, // func(value)

      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    return (
      <ul
        ref={rootRef}
        {...props}
        className={`treepicker-menu${props.className ? ' ' + props.className : ''}`}
      >
        <List value={value} list={list} onChange={onChange} />
      </ul>
    )
  }
)

export default Menu
