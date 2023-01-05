import React, { useEffect } from 'react'
import Item from './Item'
import Utils from './../Utils'

// 树菜单项
const List = ({ itemRender, keyword, rootRef, value, list, onChange }) => {
  if (!Array.isArray(list) || !list.length) return null

  // 值变化时, 修改展开和选中
  useEffect(() => {
    Utils.active({ rootRef, value, list })
    // eslint-disable-next-line
  }, [value])

  function handleChange(item) {
    if (onChange) onChange([item])
  }

  return (
    <>
      {list.map((item, index) => {
        return (
          <Item
            key={item.id || index}
            itemRender={itemRender}
            keyword={keyword}
            item={item}
            onChange={handleChange}
          />
        )
      })}
    </>
  )
}

export default List
