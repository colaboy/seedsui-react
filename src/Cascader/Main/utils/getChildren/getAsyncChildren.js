// 获取异步列表
async function getAsyncChildren({ data, loadData, id }) {
  let children = await loadData(id, { list: data })

  // 当前项下增加children, 并修改children的parentid
  if (Array.isArray(children) && children.length) {
    // 增加parentid
    children = children.map((item) => {
      item.parentid = id
      return item
    })

    // 设置子级数据
    data.setDeepTreeNodeProp(id, (node) => {
      node.children = children || []
    })
  }

  return children
}

export default getAsyncChildren
