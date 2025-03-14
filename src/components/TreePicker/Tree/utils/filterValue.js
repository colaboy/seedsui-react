// 内库使用-start
import ArrayUtil from '../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 过滤值
function filterValue(value, type) {
  if (Array.isArray(value) === false || !value.length) return value
  // 只显示父级
  if (type === 'parent') {
    for (let item of value) {
      if (item.halfChecked || !item.id || item.disabled) continue
      let descendants = ArrayUtil.getFlatTreeDescendantNodes(value, item.id) || []
      let descendantIds = descendants.map((descendant) => descendant.id)
      // eslint-disable-next-line
      value = value.filter((n) => {
        if (descendantIds.includes(n.id)) {
          return false
        }
        return true
      })
    }
  }
  // 只显示子级
  else if (type === 'leaf') {
    for (let item of value) {
      if (item.halfChecked || !item.id || item.disabled) continue
      let predecessors = ArrayUtil.getFlatTreePredecessorNodes(value, item.id) || []
      let predecessorIds = predecessors.map((predecessor) => predecessor.id)
      // eslint-disable-next-line
      value = value.filter((n) => {
        if (predecessorIds.includes(n.id)) {
          return false
        }
        return true
      })
    }
  }

  return value
}

export default filterValue
