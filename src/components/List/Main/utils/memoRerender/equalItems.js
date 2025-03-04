// 内库使用-start
import ArrayUtil from './../../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 比较列表
function equalItems(prevItems, nextItems) {
  if ((prevItems || '') === (nextItems || '')) {
    return true
  }

  return ArrayUtil.isEqual(prevItems, nextItems)
}

export default equalItems
