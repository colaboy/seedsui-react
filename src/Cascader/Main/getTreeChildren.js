// 内库使用
import ArrayUtil from '../../ArrayUtil'

// 测试使用
// import { ArrayUtil } from 'seedsui-react'

function getTreeChildren(tree, id) {
  let node = ArrayUtil.getDeepTreeNode(tree, id)
  if (node && Array.isArray(node.children)) {
    return node.children
  }
  return null
}

export default getTreeChildren
