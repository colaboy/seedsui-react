import React from 'react'
import HighlightKeyword from './../../../HighlightKeyword'

// 树菜单项
const Item = ({
  itemRender,
  keyword,
  item,
  // 回调
  onExpand,
  onCollapse,
  onChange
}) => {
  // 递归子级
  const children =
    Array.isArray(item.children) && item.children.length
      ? item.children.map((child, index) => {
          return (
            <Item
              key={child.id || index}
              itemRender={itemRender}
              keyword={keyword}
              item={child}
              onExpand={onExpand}
              onCollapse={onCollapse}
              onChange={onChange}
            />
          )
        })
      : null

  // 点击
  function handleClick(e) {
    let target = e.currentTarget
    // 回调收缩和展开事件
    if (Array.isArray(item.children) && item.children.length) {
      if (target.classList.contains('expand')) {
        if (onCollapse) onCollapse([item])
      } else {
        if (onExpand) onExpand([item])
      }
    }

    // 如果已经选中, 则收展
    if (target.classList.contains('active')) {
      target.classList.toggle('expand')
      return
    }

    // 点击非选中项, 移除同级所有的选中项与展开项
    // var parent = e.currentTarget.parentNode.parentNode
    // var actives = parent.querySelectorAll('.active')
    // if (actives && actives.length) {
    //   for (var i = 0, active; (active = actives[i++]); ) {
    //     active.classList.remove('expand')
    //     active.classList.remove('active')
    //   }
    // }

    // 选中
    // e.currentTarget.classList.add('active')
    // e.currentTarget.classList.toggle('expand')

    // 回调
    if (onChange) onChange(item)
  }

  // 是否包含关键字
  function hasKeyword(text, keyword) {
    if (keyword && text.indexOf(keyword) !== -1) {
      return true
    }
    return false
  }
  // 获取文文
  function getItemNode() {
    if (typeof itemRender === 'function') {
      let itemNode = itemRender(item, { keyword: keyword })
      if (itemNode) return itemNode
    }
    if (hasKeyword(item.name, keyword) !== -1) {
      return (
        <div className="treepicker-menu-item-caption">
          <HighlightKeyword text={item.name} keyword={keyword} />
        </div>
      )
    }
    return <div className="treepicker-menu-item-caption">{item.name}</div>
  }

  // 渲染
  return (
    <li>
      <div data-id={item.id} className={`treepicker-menu-item`} onClick={handleClick}>
        {getItemNode()}
        {children && <i className="treepicker-menu-more"></i>}
      </div>
      {children && <ul>{children}</ul>}
    </li>
  )
}

export default Item
