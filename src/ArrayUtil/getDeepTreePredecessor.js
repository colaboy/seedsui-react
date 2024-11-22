import getDeepTreeNode from './getDeepTreeNode'

// 根据id, 取出此id节点的先辈数据
function getDeepTreePredecessor(list, id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let predecessor = []

  function buildPredecessor(list, parentId) {
    let parent = getDeepTreeNode(list, parentId)
    if (!parent) return
    predecessor.push(parent)
    if (parent['parentid']) {
      buildPredecessor(list, parent['parentid'])
    }
  }

  let current = list.getDeepTreeNode(id)
  if (current) {
    buildPredecessor(list, current['parentid'])
  }
  return predecessor
}

export default getDeepTreePredecessor
