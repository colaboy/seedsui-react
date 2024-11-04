// 当季第一天
function firstDayOfQuarter(date) {
  const currentDate = new Date(date instanceof Date ? date : null)
  const count = Math.ceil((currentDate.getMonth() + 1) / 3)
  currentDate.setFullYear(currentDate.getFullYear(), count * 3 - 3, 1)
  return currentDate
}

export default firstDayOfQuarter
