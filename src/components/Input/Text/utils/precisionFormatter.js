// 内库使用-start
import MathUtil from './../../../../utils/MathUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil } from 'seedsui-react'
测试使用-end */

// 矫正小数位截取
function precisionFormatter(value, { precision, trim }) {
  let val = value
  // 符合截取条件时
  if (typeof precision === 'number' && !isNaN(val) && val !== (null || '')) {
    if (trim) {
      val = Number(val || 0)
    }
    val = MathUtil.fixed(val, precision)
  }
  return val
}

export default precisionFormatter
