import getWeekNames from './getWeekNames'
import previousWeek from './previousWeek'
import nextWeek from './nextWeek'
import getWeekDates from './getWeekDates'

// 获得上周日历
function getPreviousWeekDates(currentDate, weekStart) {
  let date = previousWeek(new Date(currentDate))
  return getWeekDates(date, weekStart)
}
// 获得下周日历
function getNextWeekDates(currentDate, weekStart) {
  let date = nextWeek(new Date(currentDate))
  return getWeekDates(date, weekStart)
}

// 周数据: 上周和下周共14天
function getWeeks(currentDate, { weekStart }) {
  if (!currentDate) {
    return null
  }
  return {
    previous: getPreviousWeekDates(currentDate, weekStart),
    next: getNextWeekDates(currentDate, weekStart)
  }
}

export default {
  previousWeek: previousWeek,
  nextWeek: nextWeek,
  // 周名
  getWeekNames,
  // 当前日期一周的日期
  getWeekDates,
  // 获取上周与下周数据集合
  getWeeks
}
