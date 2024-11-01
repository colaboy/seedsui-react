// 比较年月,大于返回1,等于返回0,小于返回-1
function compareMonth(d1, d2) {
  let date1 = new Date(d1)
  let date2 = new Date(d2)
  date1.setDate(1)
  date1.setHours(0, 0, 0, 0)
  date2.setDate(1)
  date2.setHours(0, 0, 0, 0)
  let t1 = date1.getTime()
  let t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}

export default compareMonth
