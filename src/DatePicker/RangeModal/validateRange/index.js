import validateMaxMin from './../../utils/validateMaxMin'
import validateStartEnd from './validateStartEnd'
import validateDiff from './validateDiff'

// 校验值是否正确
function validateRange(value, { type, min, max, diff, onError }) {
  if (!Array.isArray(value)) {
    return null
  }

  let newValue = [...value]

  // 校验最大最小值
  if (min || max) {
    for (let [index, item] of newValue.entries()) {
      let newItem = validateMaxMin(item, {
        type: type,
        min: min,
        max: max,
        onError: onError
      })

      if (newItem === false) return false
      newValue[index] = newItem
    }
  }

  // 以下的校验必须是两个日期才可进行
  if (value?.[0] instanceof Date === false || value?.[1] instanceof Date === false) {
    return value
  }

  // 校验是否开始日期大于结束日期
  newValue = validateStartEnd(newValue, { type: type, onError: onError })
  if (newValue === false) return false

  // 校验限制
  if (diff) {
    newValue = validateDiff(newValue, { type: type, diff: diff, onError: onError })
    if (newValue === false) return false
  }

  return newValue
}

export default validateRange
