import dayjs from 'dayjs'

// 内库使用
import locale from './../../locale'
import DateUtil from '../../DateUtil'

// 测试使用
// import { locale, DateUtil } from 'seedsui-react'

// 默认日期区间
const defaultRanges = {
  [locale('今日', 'SeedsUI_today')]: [new Date(), new Date()],
  [locale('昨日', 'SeedsUI_yesterday')]: [
    dayjs().subtract(1, 'day').toDate(),
    dayjs().subtract(1, 'day').toDate()
  ],
  [locale('近7日', 'SeedsUI_last_days', ['7'])]: [dayjs().subtract(6, 'day').toDate(), new Date()],
  [locale('近30日', 'SeedsUI_last_days', ['30'])]: [
    dayjs().subtract(29, 'day').toDate(),
    new Date()
  ],
  [locale('近90日', 'SeedsUI_last_days', ['90'])]: [
    dayjs().subtract(89, 'day').toDate(),
    new Date()
  ],
  [locale('本周', 'SeedsUI_this_week')]: [dayjs().day(1).toDate(), new Date()],
  [locale('本月', 'SeedsUI_this_month')]: [dayjs().date(1).toDate(), new Date()],
  [locale('上月', 'SeedsUI_last_month')]: [
    dayjs().date(1).subtract(1, 'month').toDate(),
    dayjs().date(1).subtract(1, 'day').toDate()
  ],
  [locale('本季度', 'SeedsUI_this_quarter')]: [DateUtil.firstDayOfQuarter(new Date()), new Date()],
  [locale('今年', 'SeedsUI_this_year')]: [
    DateUtil.firstDayOfYear(new Date()),
    DateUtil.lastDayOfYear(new Date())
  ],
  [locale('自定义', 'SeedsUI_custom')]: 0
}

export default defaultRanges
