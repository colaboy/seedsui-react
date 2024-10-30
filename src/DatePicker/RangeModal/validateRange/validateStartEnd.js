// 内库使用
import locale from './../../../locale'
import DateUtil from './../../../DateUtil'

// 测试使用
// import { locale, DateUtil } from 'seedsui-react'

// 判断是否开始时间大于结束时间
function validateStartEnd(value, { type, onError }) {
  if (value?.[0] instanceof Date === false || value?.[1] instanceof Date === false) {
    return value
  }

  let [startDate, endDate] = value
  let greater = DateUtil.compare(startDate, endDate, type)
  if (greater > 0) {
    if (onError) {
      onError({
        errMsg: locale('开始时间不能大于结束时间', 'SeedsUI_starttime_greater_than_endtime'),
        value: value
      })
      return false
    }
    return [endDate, startDate]
  }
  return value
}

export default validateStartEnd
