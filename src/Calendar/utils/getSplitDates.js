import Weeks from './Weeks'
import Months from './Months'

// 方便渲染, 三维化dates数组：3页6行7列
function getSplitDates(dates, { weekStart, activeDate, type }) {
  if (!activeDate || !dates) return []

  // 共3页，每页6行, 第行7个日期
  let pages = [dates.previous, dates.current, dates.next]

  // 周需要替换同行上周和下周的数据
  if (type === 'week') {
    let activeRowIndex = Months.getDateRowIndex(activeDate, weekStart)

    // 上周和下周数据
    let weekDates = Weeks.getWeeks(activeDate, { weekStart })

    // 平替周行的上月和下月，保证滑动时显示正常
    for (let [index, page] of pages.entries()) {
      if (index === 1) continue

      for (let rowIndex = 0; rowIndex < page.length; rowIndex++) {
        if (rowIndex === activeRowIndex) {
          // 替换上周数据
          if (index === 0) {
            page[rowIndex] = weekDates.previous
          }
          // 替换下周数据
          else if (index === 2) {
            page[rowIndex] = weekDates.next
          }
        }
      }
    }
  }

  return pages
}

export default getSplitDates
