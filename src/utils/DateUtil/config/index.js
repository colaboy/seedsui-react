// dayjs国际化, 常用插件: https://day.js.org/docs/en/plugin/plugin
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'

function config({ language }) {
  // Add plugin
  dayjs.extend(isoWeek) // 用于解决format时报错:isoWeek
  dayjs.extend(weekOfYear) // 用于解决format时报错:week
  dayjs.extend(quarterOfYear)
  dayjs.extend(advancedFormat) // 支持高级format

  // List of supported locales: https://github.com/iamkun/dayjs/tree/dev/src/locale
  dayjs.locale('zh-cn')
}

export default config
