import validateValue from './validateValue'

// 校验值是否正确
async function validateRange(
  newValue,
  { type, min, max, dateRangeLimit, onError, onBeforeChange, activeKey, ranges }
) {
  // 值合法性校验
  let goOn = await validateValue(newValue, {
    type,
    min,
    max,
    // 只有自定义时间段才有天数校验
    dateRangeLimit,
    onError
  })
  if (goOn === false) {
    return false
  }

  // 外部传入的校验
  let beforeChangeGoOn = null
  if (typeof onBeforeChange === 'function') {
    beforeChangeGoOn = await onBeforeChange(newValue, {
      ranges: ranges,
      activeKey: activeKey
    })
    if (beforeChangeGoOn === false) {
      return false
    }
  }

  return true
}

export default validateRange
