import validateDaysLimit from './validateDaysLimit'
import validateStartEnd from './validateStartEnd'
import { validateMaxMin } from '../utils'

// 校验选择的区间是否合法
function validateBeforeChange(
  newValue,
  {
    type,
    min,
    max,
    onError,
    onBeforeChange,
    // RangeMain props
    ranges,
    activeKey,
    setActiveKey
  }
) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 校验最大最小值
    if (Array.isArray(newValue) && newValue.length) {
      // 开始日期
      let minMaxValid = validateMaxMin(newValue?.[0], {
        type: type,
        min: min,
        max: max,
        onError: onError
      })
      if (minMaxValid === false) {
        resolve(false)
        return
      }
      if (newValue?.[0]) newValue[0] = minMaxValid

      // 结束日期
      minMaxValid = validateMaxMin(newValue[1], {
        type: type,
        min: min,
        max: max,
        onError: onError
      })
      if (minMaxValid === false) {
        resolve(false)
        return
      }
      if (newValue?.[1]) newValue[1] = minMaxValid
    }

    // 校验是否开始日期大于结束日期
    let startEndValid = validateStartEnd(newValue, { type: type, onError: onError })
    if (startEndValid === false) {
      resolve(false)
      return
    }
    // eslint-disable-next-line
    newValue = startEndValid

    // 校验天数限制
    if (typeof daysLimit === 'number') {
      let daysLimitValid = validateDaysLimit(newValue, {
        daysLimit: daysLimit,
        onError: onError
      })
      if (daysLimitValid === false) {
        resolve(false)
        return
      }
    }

    // 外部传入的校验
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue, {
        ranges: ranges,
        activeKey: activeKey,
        setActiveKey: setActiveKey
      })
      if (goOn === false) {
        resolve(false)
        return
      }
    }

    resolve(newValue)
  })
}

export default validateBeforeChange
