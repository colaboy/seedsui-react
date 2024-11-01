// 比较年份,大于返回1,等于返回0,小于返回-1
function compareYear(d1, d2) {
  let date1 = new Date(d1)
  let date2 = new Date(d2)
  let t1 = date1.getFullYear()
  let t2 = date2.getFullYear()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}

export default compareYear
