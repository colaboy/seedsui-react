import locale from './../../locale'

// 测试使用
// import locale from 'seedsui-react/lib/locale'

// eslint-disable-next-line
export default {
  // 获取默认值, 用于实例化日期
  getDefaults: function (value, defaultPickerValue) {
    let defaultValue = value
    if (Object.isDate(defaultValue) === false) {
      defaultValue = Object.isDate(defaultPickerValue) ? defaultPickerValue : new Date()
    }

    let defaultDay = defaultValue.getDate()
    defaultDay = defaultDay < 10 ? '0' + defaultDay : defaultDay

    let defaultHour = defaultValue.getHours()
    defaultHour = defaultHour < 10 ? '0' + defaultHour : defaultHour

    let defaultMinute = defaultValue.getMinutes()
    defaultMinute = defaultMinute < 10 ? '0' + defaultMinute : defaultMinute

    return {
      year: defaultValue.getFullYear(),
      quarter: defaultValue.quarter(),
      month: defaultValue.month(),
      day: defaultDay,
      hour: defaultHour,
      minute: defaultMinute
    }
  },
  // 数据
  getData: function (data) {
    // 自定义数据
    let yearsData = null
    let quartersData = null
    let monthsData = null
    let daysData = null
    let hoursData = null
    let minutesData = null
    if (data) {
      if (data.year) {
        yearsData = data.year.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_year') // 年
          }
        })
      }
      if (data.quarter) {
        quartersData = data.quarter.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_quarter') // 季
          }
        })
      }
      if (data.month) {
        monthsData = data.month.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_month') // 月
          }
        })
      }
      if (data.day) {
        daysData = data.day.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_date') // 日
          }
        })
      }
      if (data.hour) {
        hoursData = data.hour.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_hour') // 时
          }
        })
      }
      if (data.minute) {
        minutesData = data.minute.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_minute') // 分
          }
        })
      }
    }
    return {
      yearsData: yearsData,
      quartersData: quartersData,
      monthsData: monthsData,
      daysData: daysData,
      hoursData: hoursData,
      minutesData: minutesData
    }
  }
}
