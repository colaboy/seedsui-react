import dayjs from 'dayjs'
// dayjs国际化, 常用插件: https://day.js.org/docs/en/plugin/plugin
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'

function plugin() {
  // Add plugin
  dayjs.extend(isoWeek) // 用于解决format时报错:isoWeek
  dayjs.extend(weekOfYear) // 用于解决format时报错:week
  dayjs.extend(quarterOfYear)
  dayjs.extend(advancedFormat) // 支持高级format
}

export default plugin
