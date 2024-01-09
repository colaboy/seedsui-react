// 获取异步列表
async function getAsyncChildren({ loadData, id }) {
  let children = await loadData(id)
  // 当前项下增加children, 并修改children的parentid
  if (Array.isArray(children) && children.length) {
    // 增加parentid
    children = children.map((item) => {
      item.parentid = id
      return item
    })
    data.setDeepTreeNodeProp(id, (node) => {
      node.children = children
    })
  }
  return children
}

export default getAsyncChildren
