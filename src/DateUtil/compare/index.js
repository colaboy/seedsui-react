import compareYear from './compareYear'
import compareQuarter from './compareQuarter'
import compareMonth from './compareMonth'
import compareDate from './compareDate'
import compareHour from './compareHour'
import compareMinute from './compareMinute'
import compareSecond from './compareSecond'
// Partial compare
import partCompareHourMinute from './partCompareHourMinute'

// 比较年月日,大于返回1,等于返回0,小于返回-1, compareUnit: 'year|quarter|month|week|date|day|hour|minute|second|partHourMinute'
function compare(d1, d2, compareUnit) {
  if (d1 instanceof Date === false || d2 instanceof Date === false) {
    return undefined
  }
  if (compareUnit === 'year') {
    return compareYear(d1, d2)
  }
  if (compareUnit === 'quarter') {
    return compareQuarter(d1, d2)
  }
  if (compareUnit === 'month') {
    return compareMonth(d1, d2)
  }
  if (compareUnit === 'hour') {
    return compareHour(d1, d2)
  }
  if (compareUnit === 'minute') {
    return compareMinute(d1, d2)
  }
  if (compareUnit === 'second') {
    return compareSecond(d1, d2)
  }
  // Partial compare hour minute
  if (compareUnit === 'partHourMinute') {
    return partCompareHourMinute(d1, d2)
  }

  return compareDate(d1, d2)
}

export default compare
