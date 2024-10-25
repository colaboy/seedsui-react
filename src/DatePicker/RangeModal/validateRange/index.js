import formatValue from './../../RangeMain/formatValue'
import validateMaxMin from './../../utils/validateMaxMin'
import validateStartEnd from './validateStartEnd'

// 校验值是否正确
async function validateRange(value, { type, min, max, diff, onError }) {
  let newValue = formatValue(value, { min, max })

  // 校验最大最小值
  if (min || max) {
    for (let [index, item] of newValue.entries()) {
      let newItem = validateMaxMin(item, {
        type: type,
        min: min,
        max: max,
        onError: onError
      })

      if (!newItem) return false
      newValue[index] = newItem
    }
  }

  // 校验是否开始日期大于结束日期
  newValue = validateStartEnd(newValue, { type: type, onError: onError })
  if (!newValue) return false

  // 校验限制
  if (diff) {
    newValue = validateStartEnd(newValue, { type: type, diff: diff, onError: onError })
    if (!newValue) return false
  }

  return newValue
}

export default validateRange
