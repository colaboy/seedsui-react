import getWeekDates from './getWeekDates'
import previousWeek from './previousWeek'
import nextWeek from './nextWeek'
import getDaysInMonth from './getDaysInMonth'
import compare from './compare'
import format from './format'
import quarter from './quarter'

// 日期工具类
const dateUtil = {
  // 周操作
  getWeekDates: getWeekDates,
  previousWeek: previousWeek,
  nextWeek: nextWeek,
  // 月操作
  getDaysInMonth: getDaysInMonth,
  // 比较年月日,大于返回1,等于返回0,小于返回-1,错误返回undefined
  compare: compare,
  // 格式化日期
  format: format,
  // 获取当前季度
  quarter: quarter
}

export default dateUtil
