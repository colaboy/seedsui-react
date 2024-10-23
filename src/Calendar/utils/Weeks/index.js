import getWeekNames from './getWeekNames'

// 内库使用
import DateUtil from './../../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 获得上周日历
function getPreviousWeekDates(currentDate, weekStart) {
  let date = DateUtil.previousWeek(new Date(currentDate))
  return DateUtil.getWeekDates(date, weekStart)
}
// 获得下周日历
function getNextWeekDates(currentDate, weekStart) {
  let date = DateUtil.nextWeek(new Date(currentDate))
  return DateUtil.getWeekDates(date, weekStart)
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

const Weeks = {
  // 周名
  getWeekNames,
  // 获取上周与下周数据集合
  getWeeks
}

export default Weeks
