import deepTree from './deepTree'
import getDeepTreeNode from './getDeepTreeNode'
import getDeepTreeNodes from './getDeepTreeNodes'
import getDeepTreePredecessorNodes from './getDeepTreePredecessorNodes'
import getDeepTreeLeafNodes from './getDeepTreeLeafNodes'
import setDeepTreeNode from './setDeepTreeNode'
import setDeepTreeNodes from './setDeepTreeNodes'
import setDeepTreeLeafNode from './setDeepTreeLeafNode'
import updateDeepTreeParentId from './updateDeepTreeParentId'

import flattenTree from './flattenTree'
import getFlatTreeNode from './getFlatTreeNode'
import getFlatTreeNodes from './getFlatTreeNodes'
import getFlatTreePredecessorNodes from './getFlatTreePredecessorNodes'
import getFlatTreeDescendantNodes from './getFlatTreeDescendantNodes'

import isEqual from './isEqual'
import isEqualById from './isEqualById'

const ArrayUtil = {
  deepTree,
  getDeepTreeNode,
  getDeepTreeNodes,
  getDeepTreePredecessorNodes,
  getDeepTreeLeafNodes,
  setDeepTreeLeafNode,
  setDeepTreeNode,
  setDeepTreeNodes,
  updateDeepTreeParentId,

  flattenTree,
  getFlatTreeNode,
  getFlatTreeNodes,
  getFlatTreePredecessorNodes,
  getFlatTreeDescendantNodes,

  isEqual,
  isEqualById
}

export default ArrayUtil
