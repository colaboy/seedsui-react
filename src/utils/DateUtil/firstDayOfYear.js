// 当年第一天
function firstDayOfYear(date) {
  const currentDate = new Date(date instanceof Date ? date : null)
  currentDate.setMonth(0, 1)
  return currentDate
}

export default firstDayOfYear
