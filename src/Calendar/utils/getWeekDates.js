const weekMillisecond = 7 * 24 * 60 * 60 * 1000

// 上周
function prevWeek(currentDate) {
  const prevWeekDate = new Date(currentDate)
  prevWeekDate.setDate(currentDate.getDate() - 7)
  return prevWeekDate
}

// 下周
function nextWeek(currentDate) {
  const nextWeekDate = new Date(currentDate)
  nextWeekDate.setDate(currentDate.getDate() - 7)
  return nextWeekDate
}

// 周数据: 上周和下周共14天
function getWeekData(currentDate, weekStart) {
  let date = new Date(currentDate)
  let firstDayIndex = date.getDay()

  // 起始点如果是周一, 则周一为0
  if (weekStart === 'Monday') {
    // 周日索引为6
    if (firstDayIndex === 0) {
      firstDayIndex = 6
    }
    // 其它减1, 保证周一是0
    else {
      firstDayIndex = firstDayIndex - 1
    }
  }

  // 根据起始毫秒数，逐天增加天数
  let startMillisecond = date.getTime() - weekMillisecond * firstDayIndex

  let data = []
  // 生成周
  for (let i = 0; i < 7; i++) {
    data.push(new Date())
    if (i === 0) data[0].setTime(startMillisecond)
    else data[i].setTime(data[i - 1].getTime() + weekMillisecond)
  }
  return data
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

// 获取三个月的日历数据, 每个月渲染42格, 共126格
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
