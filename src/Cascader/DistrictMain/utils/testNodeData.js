// 内库使用
import ArrayUtil from '../../../ArrayUtil'

// 测试使用
// import { ArrayUtil } from 'seedsui-react'

// 判断是否在list中，在list中被认为是省市区，不在则是街道
function testNodeData(current, list) {
  if (!current?.id || !Array.isArray(list) || !list?.length) return false

  let node = ArrayUtil.getDeepTreeNode(list, current.id)
  if (node?.isStreet) return 'street'
  if (node) return true
  return false
}

export default testNodeData
