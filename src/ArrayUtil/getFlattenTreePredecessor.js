import getFlattenTreeNode from './getFlattenTreeNode'

// 根据id, 取出此id节点的先辈数据
function getFlattenTreePredecessor(list, id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let current = getFlattenTreeNode(list, id)
  let predecessor = []
  function buildPredecessor(list, parentId) {
    for (let i = 0, item; (item = list[i++]); ) {
      // eslint-disable-line
      if (parentId && item['id'] === parentId.toString()) {
        predecessor.push(item)
        buildPredecessor(list, item['parentid'])
      }
    }
  }
  buildPredecessor(list, current['parentid'])
  return predecessor
}

export default getFlattenTreePredecessor
