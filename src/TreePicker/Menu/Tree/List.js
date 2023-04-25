import React, { useEffect } from 'react'
import Item from './Item'
import { active, expandKeyword } from './../utils/index'

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
  // 值变化时, 修改展开和选中
  useEffect(() => {
    active({ rootRef, value, list })
    // eslint-disable-next-line
  }, [value])

  useEffect(() => {
    expandKeyword({ rootRef, keyword, list })
    // eslint-disable-next-line
  }, [keyword])

  function handleChange(item) {
    if (onChange) onChange([item])
  }

  if (!Array.isArray(list) || !list.length) return null
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
