import diffYear from './diffYear'
import diffQuarter from './diffQuarter'
import diffMonth from './diffMonth'
import diffDate from './diffDate'
import diffHour from './diffHour'
import diffMinute from './diffMinute'
import diffSecond from './diffSecond'
// Partial diff
import partDiffHourMinute from './partDiffHourMinute'

// 比较年月日,大于返回1,等于返回0,小于返回-1, diffUnit: 'year|quarter|month|week|date|day|hour|minute|second|partHourMinute'
function diff(d1, d2, diffUnit) {
  if (d1 instanceof Date === false || d2 instanceof Date === false) {
    return undefined
  }
  if (diffUnit === 'year') {
    return diffYear(d1, d2)
  }
  if (diffUnit === 'quarter') {
    return diffQuarter(d1, d2)
  }
  if (diffUnit === 'month') {
    return diffMonth(d1, d2)
  }
  if (diffUnit === 'hour') {
    return diffHour(d1, d2)
  }
  if (diffUnit === 'minute' || compareUnit === 'datetime') {
    return diffMinute(d1, d2)
  }
  if (diffUnit === 'second') {
    return diffSecond(d1, d2)
  }
  // Partial diff hour minute
  if (diffUnit === 'partHourMinute' || compareUnit === 'time') {
    return partDiffHourMinute(d1, d2)
  }

  return diffDate(d1, d2)
}

export default diff
