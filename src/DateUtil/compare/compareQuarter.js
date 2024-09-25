import quarter from '../quarter'
// 比较年季度,大于返回1,等于返回0,小于返回-1
function compareQuarter(d1, d2) {
  let date1 = new Date(d1)
  let date2 = new Date(d2)
  date1.setDate(0)
  date1.setHours(0, 0, 0, 0)
  date2.setDate(0)
  date2.setHours(0, 0, 0, 0)
  let year1 = date1.getFullYear()
  let year2 = date2.getFullYear()

  if (year1 !== year2) {
    return year1 > year2 ? 1 : -1
  }

  let q1 = quarter(date1)
  let q2 = quarter(date2)

  if (q1 === q2) return 0
  return q1 > q2 ? 1 : -1
}

export default compareQuarter
