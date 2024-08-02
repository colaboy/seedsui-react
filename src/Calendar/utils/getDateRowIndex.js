import dayjs from 'dayjs'

// 获取日期所在行
function getDateRowIndex(date) {
  // 在当月中的位置: 1号周几 + 当前几号
  let monthIndex = dayjs(date).startOf('month').toDate().getDay() + date.getDate()
  // 今天所在行数: 选中位置(例如14) / 一周7天(例如7) = 所在行数(例如1), 由于索引从0开始的, 所以返回1行
  return Math.ceil(monthIndex / 7) - 1
}

export default getDateRowIndex
