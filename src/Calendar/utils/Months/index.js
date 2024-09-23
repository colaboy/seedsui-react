import getDateRowIndex from './getDateRowIndex'
import previousMonth from './previousMonth'
import nextMonth from './nextMonth'
import getMonthDates from './getMonthDates'

// 获得上月日历
function getPrevMonthData(currentDate, weekStart) {
  let date = previousMonth(new Date(currentDate))
  return getMonthDates(date, weekStart)
}
// 获得下月日历
function getNextMonthData(currentDate, weekStart) {
  let date = nextMonth(new Date(currentDate))
  return getMonthDates(date, weekStart)
}

// 获取三个月的日历数据, 每个月渲染42格, 共126格
function getMonths(currentDate, { weekStart }) {
  if (!currentDate) {
    return null
  }

  // 获取三个月的日历数据
  let data = {
    previous: getPrevMonthData(currentDate, weekStart),
    current: getMonthDates(currentDate, weekStart),
    next: getNextMonthData(currentDate, weekStart)
  }

  return data
}

export default {
  // 当前日期在日历中的行数, 用于周视图替换同行上下周数据
  getDateRowIndex,
  // 当前日期一月的日期
  getMonthDates,
  // 获取上月,本月与下月数据集合
  getMonths
}
