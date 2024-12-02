import deepTree from './deepTree'
import getDeepTreeNode from './getDeepTreeNode'
import getDeepTreeNodes from './getDeepTreeNodes'
import getDeepTreeLeafNodes from './getDeepTreeLeafNodes'
import getDeepTreePredecessorNodes from './getDeepTreePredecessorNodes'
import setDeepTreeNode from './setDeepTreeNode'
import setDeepTreeLeafNode from './setDeepTreeLeafNode'
import updateDeepTreeParentId from './updateDeepTreeParentId'

// import flattenTree from './flattenTree'
// import getFlattenTreeChildren from './getFlattenTreeChildren'
// import getFlattenTreeDescendants from './getFlattenTreeDescendants'
// import getFlattenTreeNode from './getFlattenTreeNode'
// import getFlattenTreeParent from './getFlattenTreeParent'
// import getFlattenTreePredecessor from './getFlattenTreePredecessor'
// import getFlattenTreePredecessors from './getFlattenTreePredecessors'
// import getFlattenTreeRootIds from './getFlattenTreeRootIds'
// import getFlattenTreeRoots from './getFlattenTreeRoots'
// import setFlattenTreeNodeProp from './setFlattenTreeNodeProp'

const ArrayUtil = {
  deepTree,
  getDeepTreeNode,
  getDeepTreeNodes,
  getDeepTreeLeafNodes,
  getDeepTreePredecessorNodes,
  setDeepTreeLeafNode,
  setDeepTreeNode,
  updateDeepTreeParentId

  // flattenTree,
  // getFlattenTreeChildren,
  // getFlattenTreeDescendants,
  // getFlattenTreeNode,
  // getFlattenTreeParent,
  // getFlattenTreePredecessor,
  // getFlattenTreePredecessors,
  // getFlattenTreeRootIds,
  // getFlattenTreeRoots,
  // setFlattenTreeNodeProp
}

export default ArrayUtil
