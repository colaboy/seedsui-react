// 内库使用-start
import ArrayUtil from './../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'seedsui-react'
测试使用-end */

// 测试，后台完成后删除此段
// import chinaData from 'library/components/Cascader/utils/data/chinaData'

function formatProvinceData(tree) {
  // 测试，后台完成后删除此段
  // return chinaData

  if (!tree) return null
  ArrayUtil.setDeepTreeNodes(tree, (node) => {
    if (node.anchor) delete node.anchor
    if (node.level === '3') {
      node.type = ['district']
    }
  })
  return tree
}

export default formatProvinceData
