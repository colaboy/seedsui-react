import dayjs from 'dayjs'

// 当前日期是否选中, 空:未选中 数组:[selected:选中 selected-start:开始 selected-end:结束]
function isSelectedDate(date, selected) {
  // range mode
  if (Array.isArray(selected)) {
    if (selected.length === 2) {
      let isSelected = []
      if (dayjs(date).isAfter(selected[0], 'date') && dayjs(date).isBefore(selected[1], 'date')) {
        isSelected.push('selected')
      }
      if (dayjs(date).isSame(selected[0], 'date') || dayjs(date).isSame(selected[1], 'date')) {
        isSelected.push('selected')
      }
      if (dayjs(date).isSame(selected[0], 'date')) {
        isSelected.push('selected-start')
      }
      if (dayjs(date).isSame(selected[1], 'date')) {
        isSelected.push('selected-end')
      }
      if (isSelected.length) {
        return isSelected
      }
      return null
    }
    return null
  }

  // date mode
  if (selected instanceof Date === false) {
    return null
  }

  if (dayjs(date).isSame(dayjs(selected), 'date')) {
    return ['selected']
  }

  return null
}

export default isSelectedDate
