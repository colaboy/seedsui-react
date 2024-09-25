import DateUtil from '../../DateUtil'

// 当前日期是否选中, 空:未选中 数组:[selected:选中 selected-start:开始 selected-end:结束]
function isSelectedDate(date, selected) {
  // range mode
  if (Array.isArray(selected)) {
    if (selected.length === 2) {
      let isSelected = []
      // Date is between startDate and endDate, add selected class
      if (DateUtil.compare(date, selected[0]) >= 0 && DateUtil.compare(date, selected[1]) <= 0) {
        isSelected.push('selected')
      }

      if (DateUtil.compare(date, selected[0]) === 0) {
        isSelected.push('selected-start')
      }
      if (DateUtil.compare(date, selected[1]) === 0) {
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

  if (DateUtil.compare(date, selected) === 0) {
    return ['selected']
  }

  return null
}

export default isSelectedDate
