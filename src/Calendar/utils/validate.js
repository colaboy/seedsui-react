// 校验选中日期是否正确
function validate(jumpDate, { min, max, onError }) {
  if (jumpDate instanceof Date === false) {
    return
  }
  // 如果最小值大于等于最大值则无法生效
  if (min instanceof Date && max instanceof Date && min.compareDate(max) >= 1) {
    let errMsg =
      '最小值min' + min.format('YYYY年MM月DD日') + '不能大于等于max' + max.format('YYYY年MM月DD日')
    console.log('SeedsUI Warn：' + errMsg)
    if (onError) onError({ errMsg: errMsg, min: min, max: max, value: jumpDate, instance: s })
    return false
  }
  // 小于最小值
  if (min instanceof Date && jumpDate.compareDate(min) === -1) {
    let errMsg = '禁止访问' + min.format('YYYY年MM月DD日') + '前的日期'
    console.log('SeedsUI Warn：' + errMsg)
    if (onError) onError({ errMsg: errMsg, min: min, value: jumpDate, instance: s })
    return -1
  }
  // 大于最大值
  if (max instanceof Date && jumpDate.compareDate(max) === 1) {
    let errMsg = '禁止访问' + max.format('YYYY年MM月DD日') + '后的日期'
    console.log('SeedsUI Warn：' + errMsg)
    if (onError) onError({ errMsg: errMsg, max: max, value: jumpDate, instance: s })
    return 1
  }
  return true
}
