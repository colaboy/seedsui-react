// 内库使用-start
import ArrayUtil from '../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

function getTreeChildren(tree, id) {
  let node = ArrayUtil.getDeepTreeNode(tree, id)
  if (node && Array.isArray(node.children)) {
    return node.children
  }
  return null
}

export default getTreeChildren
