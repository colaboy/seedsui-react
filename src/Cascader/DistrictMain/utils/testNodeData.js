// 内库使用
import ArrayUtil from '../../../ArrayUtil'

// 测试使用
// import { ArrayUtil } from 'seedsui-react'

// 判断是否在list中，在list中被认为是省市区，不在则是街道
function testNodeData(current, list) {
  if (!current?.id || !Array.isArray(list) || !list?.length) return null

  let node = ArrayUtil.getDeepTreeNode(list, current.id)
  if (node?.isStreet || node?.type?.includes?.('street')) return 'street'
  if (node?.isDistrict || node?.type?.includes?.('district')) return 'district'
  return null
}

export default testNodeData
