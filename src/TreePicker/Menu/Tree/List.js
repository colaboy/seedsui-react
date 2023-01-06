import React, { useEffect } from 'react'
import Item from './Item'
import Utils from './../Utils'

// 树菜单项
const List = ({
  itemRender,
  keyword,
  rootRef,
  value,
  list,
  // 回调
  onExpand,
  onCollapse,
  onChange
}) => {
  if (!Array.isArray(list) || !list.length) return null

  // 值变化时, 修改展开和选中
  useEffect(() => {
    Utils.active({ rootRef, value, list })
    // eslint-disable-next-line
  }, [value])

  useEffect(() => {
    Utils.expandKeyword({ rootRef, keyword, list })
    // eslint-disable-next-line
  }, [keyword])

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
            onExpand={onExpand}
            onCollapse={onCollapse}
            onChange={handleChange}
          />
        )
      })}
    </>
  )
}

export default List
