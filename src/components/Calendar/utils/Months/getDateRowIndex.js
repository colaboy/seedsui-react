// 获取日期所在行
function getDateRowIndex(currentDate, weekStart) {
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

  // 在当月中的位置: 1号的起始位置+当前多少号
  let monthIndex = firstDayIndex + currentDate.getDate()

  // 今天所在行数: 选中位置(例如14) / 一周7天(例如7) = 所在行数(例如1), 由于索引从0开始的, 所以返回1行
  return Math.ceil(monthIndex / 7) - 1
}

export default getDateRowIndex
