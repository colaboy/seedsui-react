// const minuteMillisecond = 60 * 1000
// const hourMillisecond = 60 * 60 * 1000
const dayMillisecond = 24 * 60 * 60 * 1000
// const weekMillisecond = 7 * 24 * 60 * 60 * 1000

// 上一月
function prevMonth(currentDate) {
  const previousMonthDate = new Date(currentDate)
  previousMonthDate.setMonth(currentDate.getMonth() - 1)

  // 如果结果日期不是有效的日期，设置为上月最后一天
  if (previousMonthDate.getDate() !== currentDate.getDate()) {
    previousMonthDate.setDate(0)
  }

  return previousMonthDate
}
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

// 月数据
function getMonthData(currentDate, weekStart) {
  let date = new Date(currentDate)
  // 获得本月日历, 返回42天
  // 月头的位置, 周日为0
  date.setDate(1)
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
  let startMillisecond = date.getTime() - dayMillisecond * firstDayIndex

  // 生成月
  let rows = []
  let data = []
  for (let i = 0; i < 42; i++) {
    // 设置日期
    data.push(new Date())
    if (i === 0) data[0].setTime(startMillisecond)
    else data[i].setTime(data[i - 1].getTime() + dayMillisecond)
    // 设置当月标识isCurrent
    data[i].isCurrent = false
    if (data[i].getMonth() === currentDate.getMonth()) data[i].isCurrent = true

    // 每7创建一个新组
    if (i % 7 === 0) {
      rows.push([])
    }
    // 将当前元素加入最新的组
    rows[rows.length - 1].push(data[i])
  }

  return rows
}

// 获得上月日历
function getPrevMonthData(currentDate, weekStart) {
  let date = prevMonth(new Date(currentDate))
  return getMonthData(date, weekStart)
}
// 获得下月日历
function getNextMonthData(currentDate, weekStart) {
  let date = nextMonth(new Date(currentDate))
  return getMonthData(date, weekStart)
}

// 获取三个月的日历数据, 每个月渲染42格, 共126格
function getDates(currentDate, { weekStart }) {
  if (!currentDate) {
    return null
  }

  // 获取三个月的日历数据
  let data = {
    previous: getPrevMonthData(currentDate, weekStart),
    current: getMonthData(currentDate, weekStart),
    next: getNextMonthData(currentDate, weekStart)
  }

  // 设置选中项与选中行
  // 今天选中位置: 当前日期(例如3.9 => 9) + 当月第一天的周几(例如3.1,周5 => 5) = 选中位置(例如14)
  let monthFirst = new Date(currentDate)
  monthFirst.setDate(1)
  let activeIndex = currentDate.getDate() + monthFirst.getDay()
  // 今天所在行数: 选中位置(例如14) / 一周7天(例如7) = 所在行数(例如1), 由于索引从0开始的, 所以返回1行
  data.activeRowIndex = Math.ceil(activeIndex / 7) - 1
  // 三个月中的位置: 当月选中位置(例如14) + 上个月日历42天(例如41, 由于索引是从0开始的, 所以加上41而不是42) + = 三个月中的位置(例如55)
  data.activeIndex = activeIndex + 41

  return data
}

export default getDates
