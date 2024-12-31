// 根据id, 在指定id节点下加入属性数据, 例如{childrenLoaded: true}
function setFlattenTreeNodeProp(id, updateNode) {
  if (!id || typeof updateNode !== 'function') return this
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let list = this

  for (let item of list) {
    if (item['id'] === id) {
      updateNode(item)
    }
  }
  return list
}

export default setFlattenTreeNodeProp
