import getDeepTreeNode from './getDeepTreeNode'

// 取出所有先辈节点
function getDeepTreePredecessorNodes(tree, id) {
  let predecessorNodes = []
  function traverse(nodes, nodeId) {
    let node = getDeepTreeNode(nodes, nodeId)
    predecessorNodes.unshift(node)
    if (node.parentid) {
      traverse(nodes, node.parentid)
    }
  }

  traverse(tree, id)
  return predecessorNodes
}

export default getDeepTreePredecessorNodes
