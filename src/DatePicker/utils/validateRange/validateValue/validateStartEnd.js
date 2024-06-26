import locale from './../../../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

import getRangeDates from './../../getRangeDates'

// 判断是否开始时间大于结束时间
function validateStartEnd(value, config) {
  let { startDate, endDate } = getRangeDates(value)
  if (!startDate || !endDate) {
    return value
  }
  const { type, onError } = config
  let errMsg = ''
  if (type === 'year' && endDate.compareYear(startDate) === -1) {
    errMsg = locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime')
  } else if (type === 'quarter' && endDate.compareMonth(startDate) === -1) {
    errMsg = locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime')
  } else if (type === 'month' && endDate.compareMonth(startDate) === -1) {
    errMsg = locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime')
  } else if (type === 'date' && endDate.compareDate(startDate) === -1) {
    errMsg = locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime')
  } else if (type === 'datetime' && endDate.compareDateTime(startDate) === -1) {
    errMsg = locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime')
  } else if (type === 'time' && endDate.compareTime(startDate) === -1) {
    errMsg = locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime')
  }

  // 有错误
  if (errMsg) {
    if (onError) {
      onError({
        errMsg: errMsg,
        value: value
      })
      return false
    }
    return [endDate, endDate]
  }
  return value
}

export default validateStartEnd
