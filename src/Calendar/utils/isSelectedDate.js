import DateUtil from './../../DateUtil'

// 当前日期是否选中
function isSelectedDate(date, selected) {
  if (DateUtil.compareDate(selected, date) === 0) {
    return true
  }
  return false
}

export default isSelectedDate
