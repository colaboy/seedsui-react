// const minuteMillisecond = 60 * 1000
// const hourMillisecond = 60 * 60 * 1000
const dayMillisecond = 24 * 60 * 60 * 1000
// const weekMillisecond = 7 * 24 * 60 * 60 * 1000

// 上一月
function prevMonth(currentDate, count) {
  let date = new Date(currentDate)
  let targetMonth = date.getMonth() - (count || 1)
  let targetMaxDate = new Date(date.getFullYear(), targetMonth + 1, 0).getDate()
  if (date.getDate() > targetMaxDate) {
    date.setMonth(targetMonth, targetMaxDate)
  } else {
    date.setMonth(targetMonth)
  }
  return date
}
// 下一月
function nextMonth(currentDate, count) {
  let date = new Date(currentDate)
  let targetMonth = date.getMonth() + (count || 1)
  let targetMaxDate = new Date(date.getFullYear(), targetMonth + 1, 0).getDate()
  if (date.getDate() > targetMaxDate) {
    date.setMonth(targetMonth, targetMaxDate)
  } else {
    date.setMonth(targetMonth)
  }
  return date
}

// 月数据
function getMonthData(currentDate) {
  let date = new Date(currentDate)
  // 获得本月日历, 返回42天
  // 月头的位置
  date.setDate(1)
  let firstDayIndex = date.getDay()
  // 根据起始毫秒数，逐天增加天数
  let startDayMs = date.getTime() - dayMillisecond * firstDayIndex

  let data = []
  // 生成月
  for (let i = 0; i < 42; i++) {
    data.push(new Date())
    if (i === 0) data[0].setTime(startDayMs)
    else data[i].setTime(data[i - 1].getTime() + dayMillisecond)

    // 设置当月标识isCurrent
    data[i].isCurrent = false
    if (data[i].getMonth() === currentDate.getMonth()) data[i].isCurrent = true
  }
  return data
}

// 获得上月日历
function getPrevMonthData(currentDate) {
  let date = prevMonth(new Date(currentDate))
  return getMonthData(date)
}
// 获得下月日历
function getNextMonthData(currentDate) {
  let date = nextMonth(new Date(currentDate))
  return getMonthData(date)
}

// 获取三个月的日历数据, 每个月渲染42格, 共126格
function getDates(currentDate, { weekStart }) {
  if (!currentDate) return []

  // 获取三个月的日历数据
  let data = getPrevMonthData(currentDate)
    .concat(getMonthData(currentDate))
    .concat(getNextMonthData(currentDate))

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
