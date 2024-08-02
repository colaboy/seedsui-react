// 获取当前日期的3页日期数据
function getDates(activeData) {
  if (!activeData) return []
  return activeData.getCalendarData()
}

export default getDates
