import HighlightKeyword from './../../../HighlightKeyword'

// 构建渲染数据, 支持关键字搜索
function getTreeData({ list, onlyLeafCheck, keyword, itemRender, onClick }) {
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
      if (Array.isArray(item.children) && item.children.length) {
        return {
          disabled: onlyLeafCheck,
          ...item,
          title: titleNode,
          children: loop(item.children)
        }
      }
      return {
        ...item,
        title: titleNode
      }
    })
  return loop(list)
}

export default getTreeData
