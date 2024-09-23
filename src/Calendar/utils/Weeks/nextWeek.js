// 下周
function nextWeek(currentDate) {
  const nextWeekDate = new Date(currentDate)
  nextWeekDate.setDate(currentDate.getDate() + 7)
  return nextWeekDate
}

export default nextWeek
