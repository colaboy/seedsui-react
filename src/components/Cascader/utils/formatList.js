// 内库使用-start
import ArrayUtil from './../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 格式化列表, 补充parentid
function formatList(tree) {
  if (!Array.isArray(tree) || !tree.length) return tree
  ArrayUtil.updateDeepTreeParentId(tree)
  return tree
}

export default formatList
