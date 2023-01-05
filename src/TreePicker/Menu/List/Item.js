import React from 'react'

// 树菜单项
const Item = ({ item }) => {
  // 递归子级
  const children = (item.children || []).map((child, index) => {
    return <Item item={child} key={child.id || index} />
  })

  // 渲染
  return (
    <li>
      <div data-id={item.id} className={`treepicker-menu-tag expand active`}>
        <p className="treepicker-menu-tag-font">{item.name}</p>
        <i className="treepicker-menu-more"></i>
      </div>
      <ul>{children}</ul>
    </li>
  )
}

export default Item
