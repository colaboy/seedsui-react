// 上一月
function previousMonth(currentDate) {
  const previousMonthDate = new Date(currentDate)
  previousMonthDate.setMonth(currentDate.getMonth() - 1)

  // 如果结果日期不是有效的日期，设置为上月最后一天
  if (previousMonthDate.getDate() !== currentDate.getDate()) {
    previousMonthDate.setDate(0)
  }

  return previousMonthDate
}

export default previousMonth
