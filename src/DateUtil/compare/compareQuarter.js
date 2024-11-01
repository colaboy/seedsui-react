import quarter from '../quarter'
// 比较年季度,大于返回1,等于返回0,小于返回-1
function compareQuarter(d1, d2) {
  let date1 = new Date(d1)
  let date2 = new Date(d2)
  let year1 = date1.getFullYear()
  let year2 = date2.getFullYear()
  let q1 = quarter(date1)
  let q2 = quarter(date2)

  let t1 = Number(year1 + '.' + q1)
  let t2 = Number(year2 + '.' + q2)
  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}

export default compareQuarter
