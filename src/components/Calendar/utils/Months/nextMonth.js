// 下一月
function nextMonth(currentDate) {
  const nextMonthDate = new Date(currentDate)
  nextMonthDate.setMonth(currentDate.getMonth() + 1)

  // 如果结果日期不是有效的日期，设置为下月最后一天
  if (nextMonthDate.getDate() !== currentDate.getDate()) {
    nextMonthDate.setDate(0)
  }

  return nextMonthDate
}

export default nextMonth
