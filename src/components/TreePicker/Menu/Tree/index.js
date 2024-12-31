// require PrototypeArray.js
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import List from './List'

// 树菜单选择
const Tree = forwardRef(
  (
    {
      itemRender,
      keyword,
      value = [], // 选中项: [{id: '', name: ''}]
      list = [], // 数据: [{id: '', name: '', parentid: ''}]
      onChange, // func(value)
      onExpand, // func(value)
      onCollapse, // func(value)

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
        {...props}
        className={`treepicker-menu${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        <List
          rootRef={rootRef}
          itemRender={itemRender}
          keyword={keyword}
          value={value}
          list={list}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onChange={onChange}
        />
      </ul>
    )
  }
)

export default Tree
