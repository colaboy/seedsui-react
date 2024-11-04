// 当年最后一天
function lastDayOfYear(date) {
  const currentDate = new Date(date instanceof Date ? date : null)
  currentDate.setMonth(11, 31)
  return currentDate
}

export default lastDayOfYear
