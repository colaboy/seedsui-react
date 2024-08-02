import getWeekDates from './getWeekDates'
import getDateRowIndex from './getDateRowIndex'

// 方便渲染, 三维化dates数组：3页6行7列
function getSplitDates(dates, { activeDate, type }) {
  const result = []
  if (!activeDate || !dates?.length) return result
  // 共3页，每页42个
  for (let i = 0; i < dates.length; i += 42) {
    const page = dates.slice(i, i + 42)
    const pageArray = []
    // 每页6行，每行7个
    for (let j = 0; j < page.length; j += 7) {
      const row = page.slice(j, j + 7)
      pageArray.push(row)
    }
    result.push(pageArray)
  }

  // 周需要替换同行上周和下周的数据
  if (typeof type === 'number' || type === 'week') {
    let activeRowIndex = getDateRowIndex(activeDate)

    // 上周和下周数据
    let prevWeek = getWeekDates(activeDate, -7)
    let nextWeek = getWeekDates(activeDate, 7)

    // 平替周行的上月和下月，保证滑动时显示正常
    for (let [index, page] of result.entries()) {
      if (index === 1) continue

      for (let rowIndex = 0; rowIndex < page.length; rowIndex++) {
        if (rowIndex === activeRowIndex) {
          // 替换上周数据
          if (index === 0) {
            page[rowIndex] = prevWeek
          }
          // 替换下周数据
          else if (index === 2) {
            page[rowIndex] = nextWeek
          }
        }
      }
    }
  }

  return result
}

export default getSplitDates
