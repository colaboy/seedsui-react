import React, { useEffect } from 'react'
import Item from './Item'
import Utils from './../Utils'

// 树菜单项
const List = ({ value, list }) => {
  if (!Array.isArray(list) || !list.length) return null

  useEffect(() => {
    Utils.activePredecessor(value, list)
    // eslint-disable-next-line
  }, [value])

  return (
    <>
      {list.map((item, index) => {
        return <Item key={item.id || index} item={item} />
      })}
    </>
  )
}

export default List
