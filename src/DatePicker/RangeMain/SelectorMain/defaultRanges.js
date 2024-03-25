import locale from './../../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'

// 默认日期区间
const defaultRanges = {
  [locale('今日')]: [new Date(), new Date()],
  [locale('昨日')]: [new Date().prevDate(), new Date().prevDate()],
  [locale('近7日')]: [new Date().prevDate(6), new Date()],
  [locale('近30日')]: [new Date().prevDate(29), new Date()],
  [locale('近90日')]: [new Date().prevDate(89), new Date()],
  [locale('本周')]: [new Date().monday(), new Date()],
  [locale('本月')]: [new Date().firstMonthDate(), new Date()],
  [locale('上月')]: [
    new Date().prevMonth().firstMonthDate(),
    new Date().prevMonth().lastMonthDate()
  ],
  [locale('本季度')]: [new Date().firstQuarterDate(), new Date()],
  [locale('今年')]: [new Date().firstYearDate(), new Date().lastYearDate()],
  [locale('自定义')]: 0
}

export default defaultRanges
