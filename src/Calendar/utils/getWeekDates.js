// 上周
function prevWeek(currentDate) {
  const prevWeekDate = new Date(currentDate)
  prevWeekDate.setDate(currentDate.getDate() - 7)
  return prevWeekDate
}

// 下周
function nextWeek(currentDate) {
  const nextWeekDate = new Date(currentDate)
  nextWeekDate.setDate(currentDate.getDate() + 7)
  return nextWeekDate
}

// 获取当周7天
function getWeekData(currentDate, weekStart) {
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

// 获得上周日历
function getPrevWeekData(currentDate, weekStart) {
  let date = prevWeek(new Date(currentDate))
  return getWeekData(date, weekStart)
}
// 获得下周日历
function getNextWeekData(currentDate, weekStart) {
  let date = nextWeek(new Date(currentDate))
  return getWeekData(date, weekStart)
}

// 周数据: 上周和下周共14天
function getWeekDates(currentDate, { weekStart }) {
  if (!currentDate) {
    return null
  }
  return {
    previous: getPrevWeekData(currentDate, weekStart),
    next: getNextWeekData(currentDate, weekStart)
  }
}

export default getWeekDates
