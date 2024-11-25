// 内库使用
import ArrayUtil from '../../ArrayUtil'

// 测试使用
// import { ArrayUtil } from 'seedsui-react'

// 格式化数据
function formatList(tree) {
  if (!Array.isArray(tree) || !tree.length) return []
  return ArrayUtil.setDeepTreeParentId(tree)
}

export default formatList
