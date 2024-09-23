// 获取当周7天
function getWeekDates(currentDate, weekStart) {
  const weekData = []
  const startOfWeek = new Date(currentDate)
  const dayOfWeek = startOfWeek.getDay() // 获取当前日期是星期几

  // 计算本周的周一
  if (weekStart === 'Monday') {
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    startOfWeek.setDate(currentDate.getDate() + mondayOffset)
  }
  // 设定为本周的第一天（周日）
  else {
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek)
  }

  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(startOfWeek)
    weekDay.setDate(startOfWeek.getDate() + i)
    weekData.push(weekDay)
  }

  return weekData
}

export default getWeekDates
