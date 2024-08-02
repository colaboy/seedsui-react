// 当前日期是否选中
function isSelectedDate(date, selected) {
  if (selected.compareDate(date) === 0) {
    return true
  }
  return false
}

export default isSelectedDate
