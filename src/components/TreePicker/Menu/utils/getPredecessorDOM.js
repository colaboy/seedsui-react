// 内库使用-start
import ArrayUtil from '../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 获取先辈节点
function getPredecessorDOM({ rootRef, ids, list }) {
  if (!ids || !ids.length) return null
  // 获取所有需要选中展开项
  let nodes = []
  for (let id of ids) {
    let predecessorNodes = ArrayUtil.getDeepTreePredecessorNodes(list, id) || []
    nodes = nodes.concat(predecessorNodes || [])
    nodes = nodes.concat({ id: id })
  }

  if (!nodes.length) {
    return null
  }
  // 获取所有dom
  let query = []
  for (let node of nodes) {
    query.push(`[data-id='${node.id}']`)
  }
  query = query.join(',')
  return rootRef.current.querySelectorAll(query)
}

export default getPredecessorDOM
