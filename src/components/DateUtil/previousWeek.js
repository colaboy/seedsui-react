// 上周
function previousWeek(currentDate) {
  const previousWeekDate = new Date(currentDate)
  previousWeekDate.setDate(currentDate.getDate() - 7)
  return previousWeekDate
}

export default previousWeek
