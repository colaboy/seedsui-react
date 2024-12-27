import quarter from '../quarter'
// 比较年季度,大于返回1,等于返回0,小于返回-1
function compareQuarter(d1, d2) {
  let year1 = d1.getFullYear()
  let year2 = d2.getFullYear()
  let q1 = quarter(d1)
  let q2 = quarter(d2)

  if (year1 !== year2) {
    return year1 > year2 ? 1 : -1
  } else {
    if (q1 === q2) return 0
    return q1 > q2 ? 1 : -1
  }
}

export default compareQuarter
