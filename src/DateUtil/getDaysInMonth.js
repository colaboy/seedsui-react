// 获取当月天数
function getDaysInMonth(date) {
  const currentDate = new Date(date instanceof Date ? date : null)
  const year = currentDate.getFullYear() // 获取当前年份
  const month = currentDate.getMonth() // 获取当前月份（0-11）

  // 创建下个月的第一天，并设置日期为0，这样可以获取上个月的最后一天
  const lastDayOfCurrentMonth = new Date(year, month + 1, 0)

  // 返回当月的天数
  return lastDayOfCurrentMonth.getDate()
}

export default getDaysInMonth
