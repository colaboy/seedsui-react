import Weeks from './../Weeks'
import getDateRowIndex from './getDateRowIndex'

// 方便渲染, 三维化months数组：3页6行7列
function paginateMonths(months, { weekStart, drawDate, type }) {
  if (!drawDate || !months) return []

  // 共3页，每页6行, 第行7个日期
  let pages = [months.previous, months.current, months.next]

  // 周需要替换同行上周和下周的数据
  if (type === 'week') {
    let drawDateRowIndex = getDateRowIndex(drawDate, weekStart)

    // 上周和下周数据
    let weekDates = Weeks.getWeeks(drawDate, { weekStart })

    // 平替周行的上月和下月，保证滑动时显示正常
    for (let [index, page] of pages.entries()) {
      if (index === 1) continue

      for (let rowIndex = 0; rowIndex < page.length; rowIndex++) {
        if (rowIndex === drawDateRowIndex) {
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

export default paginateMonths
