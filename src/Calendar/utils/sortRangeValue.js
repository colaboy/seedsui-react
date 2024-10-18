import dayjs from 'dayjs'

// Range value, sort two date
function sortRangeValue(newDate, value) {
  // No value, click date, start date and end date is same
  if (!Array.isArray(value) || value.length !== 2) {
    return [newDate, newDate]
  }

  // Just has start date, select end date
  if (dayjs(value[0]).isSame(dayjs(value[1]), 'date')) {
    let newValue = [value[0], newDate]
    if (dayjs(value[0]).isBefore(dayjs(newDate), 'date') === false) {
      newValue = [newDate, value[0]]
    }
    return newValue
  }

  // Reselect start date
  return [newDate, newDate]
}

export default sortRangeValue
