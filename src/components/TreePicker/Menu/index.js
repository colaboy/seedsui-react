// require PrototypeArray.js
import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import Tree from './Tree'

// 树菜单选择
const Menu = (
  {
    value = [], // 选中项: [{id: '', name: ''}]
    list = [], // 数据: [{id: '', name: '', parentid: ''}]

    onChange, // func(value)
    onExpand, // func(value)
    onCollapse, // func(value)

    // 自定义渲染
    itemRender,

    ...props
  },
  ref
) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      ...rootRef?.current,
      search: (newKeyword) => {
        setKeyword(newKeyword)
      }
    }
  })

  // 搜索项属性
  let [keyword, setKeyword] = useState(null)

  return (
    <>
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

export default forwardRef(Menu)
