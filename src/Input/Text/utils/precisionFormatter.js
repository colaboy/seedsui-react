import MathJs from './../../../math'

// 矫正小数位截取
function precisionFormatter(value, { precision, trim }) {
  let val = value
  // 符合截取条件时
  if (typeof precision === 'number' && !isNaN(val) && val !== (null || '')) {
    if (trim) {
      val = Number(val || 0)
    }
    val = MathJs.fixed(val, precision)
  }
  return val
}

export default precisionFormatter
