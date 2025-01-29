// 内库使用
import ArrayUtil from './../../../utils/ArrayUtil'

// 测试使用
// import { ArrayUtil } from 'seedsui-react'

// 格式化列表, 补充parentid
function formatList(tree) {
  if (!Array.isArray(tree) || !tree.length) return []
  ArrayUtil.updateDeepTreeParentId(tree)
  console.log(tree)
  return tree
}

export default formatList
