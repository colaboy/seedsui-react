import React from 'react'
import HighlightKeyword from './../../../HighlightKeyword'

// 构建渲染数据, 支持关键字搜索
function getTreeData({ list, loadedKeys, onlyLeafCheck, keyword, itemRender, onClick }) {
  if (
    // 必须是数组
    !Array.isArray(list) ||
    !list.length ||
    // 必须有id和name属性
    !list[0]?.id ||
    !list[0]?.name
  ) {
    console.error('SeedsUI TreePicker.Tree: list参数不正确')
    return []
  }
  // 关键字搜索
  const loop = (data) =>
    data.map((item) => {
      // 行内容
      let titleContentNode = <HighlightKeyword text={item.name} keyword={keyword} />

      // 自定义渲染行内容
      if (typeof itemRender === 'function') {
        let customTitleNode = itemRender(item, {
          keyword: keyword
        })
        if (customTitleNode) {
          titleContentNode = customTitleNode
        }
      }

      // 自定义渲染行
      let titleNode = (
        <div
          className="rc-tree-title-wrapper"
          onClick={(e) => {
            e.stopPropagation()
            typeof onClick === 'function' && onClick(item)
          }}
        >
          {titleContentNode}
        </div>
      )

      // 子节点递归
      if (Array.isArray(item.children) && item.children.length) {
        return {
          // 仅允许选中末级节点，父节点则不允许选中
          disabled: onlyLeafCheck,
          ...item,
          title: titleNode,
          children: loop(item.children)
        }
      }

      // 叶子节点，异步加载的父级节点(不在loadedKeys集合中的为父节点)
      return {
        // 仅允许选择末级节点的情况下, 异步加载, 如果有子节点则禁用
        disabled:
          onlyLeafCheck && loadedKeys && loadedKeys.includes(item.id) === false ? true : false,
        ...item,
        title: titleNode
      }
    })
  return loop(list)
}

export default getTreeData
