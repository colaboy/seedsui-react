// 内库使用-start
import locale from './../../../locale'
import DateUtil from './../../DateUtil'
// 内库使用-end

/* 测试使用-start
import { locale, DateUtil } from 'seedsui-react'
测试使用-end */

// 是否为禁用日期
function isDisabledDate(date, { min, max }) {
  if (date instanceof Date === false) {
    let errDate = new Date()
    return {
      errCode: 'CALENDAR_INVALID_DATE',
      errMsg: locale(`非法的日期格式`),
      date: errDate
    }
  }
  if (min instanceof Date && date.setHours(0, 0, 0, 0) < min.setHours(0, 0, 0, 0)) {
    return {
      errCode: 'CALENDAR_MIN_ERROR',
      errMsg: locale(`禁止访问小于${DateUtil.format(min, 'YYYY年MM月DD日')}`),
      date: min
    }
  }
  if (max instanceof Date && date.setHours(0, 0, 0, 0) > max.setHours(0, 0, 0, 0)) {
    return {
      errCode: 'CALENDAR_MAX_ERROR',
      errMsg: locale(`禁止访问大于${DateUtil.format(max, 'YYYY年MM月DD日')}`),
      date: max
    }
  }
  return false
}
export default isDisabledDate