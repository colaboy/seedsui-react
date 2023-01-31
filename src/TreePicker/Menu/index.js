// require PrototypeArray.js
import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import Search from './../components/Search'
import Tree from './Tree'

// 树菜单选择
const Menu = forwardRef(
  (
    {
      value = [], // 选中项: [{id: '', name: ''}]
      list = [], // 数据: [{id: '', name: '', parentid: ''}]

      onChange, // func(value)
      onExpand, // func(value)
      onCollapse, // func(value)

      // 搜索
      searchProps,

      // 节流时长
      throttle = 500,

      // 自定义渲染
      searchRender,
      itemRender,

      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.current,
        getRootDOM: () => rootRef?.current?.current
      }
    })

    // 搜索项属性
    let [keyword, setKeyword] = useState(searchProps?.value || '')

    return (
      <>
        {/* 搜索 */}
        <Search
          value={keyword}
          onChange={setKeyword}
          // 搜索
          searchProps={searchProps}
          // 节流时长
          throttle={throttle}
          // 自定义渲染
          searchRender={searchRender}
        />

        {/* 树 */}
        <Tree
          itemRender={itemRender}
          keyword={keyword}
          value={value}
          list={list}
          onChange={onChange}
          onExpand={onExpand}
          onCollapse={onCollapse}
          {...props}
          ref={rootRef}
        />
      </>
    )
  }
)

export default Menu
