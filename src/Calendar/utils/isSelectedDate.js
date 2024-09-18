import dayjs from 'dayjs'

// 当前日期是否选中
function isSelectedDate(date, selected) {
  // range mode
  if (Array.isArray(selected)) {
    if (selected.length === 2) {
      if (dayjs(date).isAfter(selected[0], 'date') && dayjs(date).isBefore(selected[1], 'date')) {
        return true
      }
      if (dayjs(date).isSame(selected[0], 'date') || dayjs(date).isSame(selected[1], 'date')) {
        return true
      }
    }
    return false
  }

  // date mode
  if (selected instanceof Date === false) {
    return false
  }

  if (dayjs(date).isSame(dayjs(selected), 'date')) {
    return true
  }

  return false
}

export default isSelectedDate
