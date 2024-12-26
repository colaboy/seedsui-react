// 比较年份,大于返回1,等于返回0,小于返回-1
function compareYear(d1, d2) {
  let year1 = d1.getFullYear()
  let year2 = d2.getFullYear()

  if (year1 === year2) return 0
  return year1 > year2 ? 1 : -1
}

export default compareYear
