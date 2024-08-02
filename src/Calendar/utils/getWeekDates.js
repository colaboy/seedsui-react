import dayjs from 'dayjs'

// 获取当前周的开始日期和结束日期
function getWeekDates(date, period) {
  let startOfWeek = dayjs(date)

  // 前周
  if (period < 0) {
    startOfWeek = startOfWeek.subtract(Math.abs(period || 0), 'day').startOf('week')
  }
  // 后周
  else if (period > 0) {
    startOfWeek = startOfWeek.add(period || 0, 'day').startOf('week')
  }

  // 获取一周的日期数组
  const datesOfWeek = []
  for (let i = 0; i < 7; i++) {
    datesOfWeek.push(startOfWeek.add(i, 'day').toDate())
  }
  return datesOfWeek
}

export default getWeekDates
