import locale from './../../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

// 默认日期区间
const defaultRanges = {
  [locale('今日', 'SeedsUI_today')]: [new Date(), new Date()],
  [locale('昨日', 'SeedsUI_yesterday')]: [new Date().prevDate(), new Date().prevDate()],
  [locale('近7日', 'SeedsUI_last_days', ['7'])]: [new Date().prevDate(6), new Date()],
  [locale('近30日', 'SeedsUI_last_days', ['30'])]: [new Date().prevDate(29), new Date()],
  [locale('近90日', 'SeedsUI_last_days', ['90'])]: [new Date().prevDate(89), new Date()],
  [locale('本周', 'SeedsUI_this_week')]: [new Date().monday(), new Date()],
  [locale('本月', 'SeedsUI_this_month')]: [new Date().firstMonthDate(), new Date()],
  [locale('上月', 'SeedsUI_last_month')]: [
    new Date().prevMonth().firstMonthDate(),
    new Date().prevMonth().lastMonthDate()
  ],
  [locale('本季度', 'SeedsUI_this_quarter')]: [new Date().firstQuarterDate(), new Date()],
  [locale('今年', 'SeedsUI_this_year')]: [new Date().firstYearDate(), new Date().lastYearDate()],
  [locale('自定义', 'SeedsUI_custom')]: 0
}

export default defaultRanges
