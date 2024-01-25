import validateValue from './validateValue'

// 校验值是否正确
async function validateRange(
  newValue,
  { type, min, max, daysLimit, onError, onBeforeChange, activeKey, ranges }
) {
  let beforeChangeGoOn = null
  // 外部传入的校验
  if (typeof onBeforeChange === 'function') {
    beforeChangeGoOn = await onBeforeChange(newValue, {
      ranges: ranges,
      activeKey: activeKey
    })
    if (beforeChangeGoOn === false) {
      return false
    }
  }

  // 值合法性校验
  let goOn = await validateValue(newValue, {
    type,
    min,
    max,
    // 只有自定义时间段才有天数校验
    daysLimit,
    onError
  })
  if (goOn === false) {
    return false
  }

  return beforeChangeGoOn || goOn
}

export default validateRange
