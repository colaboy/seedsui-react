import getKeywordIds from './getKeywordIds'

// 内库使用-start
import ArrayUtil from '../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 根据id获取你级的id
function getExpandedKeys(keyword, flatTree) {
  // 获取所有选中项
  const ids = getKeywordIds(keyword, flatTree)

  // 获取所有选中项的所有的父级
  let expandedKeys = []
  for (let id of ids) {
    const predecessors = ArrayUtil.getFlatTreePredecessorNodes(flatTree, id)
    for (let node of predecessors) {
      if (expandedKeys?.indexOf(node.id) === -1) {
        expandedKeys.push(node.id)
      }
    }
  }
  return expandedKeys
}

export default getExpandedKeys
