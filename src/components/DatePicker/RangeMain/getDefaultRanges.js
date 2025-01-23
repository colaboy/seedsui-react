import dayjs from 'dayjs'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { locale, DateUtil } from 'seedsui-react'
测试使用-end */

// 默认日期区间
function getDefaultRanges() {
  return {
    [LocaleUtil.locale('今日', 'SeedsUI_today')]: [new Date(), new Date()],
    [LocaleUtil.locale('昨日', 'SeedsUI_yesterday')]: [
      dayjs().subtract(1, 'day').toDate(),
      dayjs().subtract(1, 'day').toDate()
    ],

    [LocaleUtil.locale('近{0}日', 'SeedsUI_last_days', ['7'])]: [
      dayjs().subtract(6, 'day').toDate(),
      new Date()
    ],

    [LocaleUtil.locale('近{0}日', 'SeedsUI_last_days', ['30'])]: [
      dayjs().subtract(29, 'day').toDate(),
      new Date()
    ],

    [LocaleUtil.locale('近{0}日', 'SeedsUI_last_days', ['90'])]: [
      dayjs().subtract(89, 'day').toDate(),
      new Date()
    ],

    [LocaleUtil.locale('本周', 'SeedsUI_this_week')]: [dayjs().day(1).toDate(), new Date()],
    [LocaleUtil.locale('本月', 'SeedsUI_this_month')]: [dayjs().date(1).toDate(), new Date()],
    [LocaleUtil.locale('上月', 'SeedsUI_last_month')]: [
      dayjs().date(1).subtract(1, 'month').toDate(),
      dayjs().date(1).subtract(1, 'day').toDate()
    ],

    [LocaleUtil.locale('本季度', 'SeedsUI_this_quarter')]: [
      DateUtil.firstDayOfQuarter(new Date()),
      new Date()
    ],

    [LocaleUtil.locale('今年', 'SeedsUI_this_year')]: [
      DateUtil.firstDayOfYear(new Date()),
      DateUtil.lastDayOfYear(new Date())
    ],

    [LocaleUtil.locale('自定义', 'SeedsUI_custom')]: 0
  }
}

export default getDefaultRanges
