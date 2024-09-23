// const minuteMillisecond = 60 * 1000
// const hourMillisecond = 60 * 60 * 1000
const dayMillisecond = 24 * 60 * 60 * 1000
// const weekMillisecond = 7 * 24 * 60 * 60 * 1000

// 月数据
function getMonthDates(currentDate, weekStart) {
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

export default getMonthDates
