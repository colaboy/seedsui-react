import Picker from './../../Picker/Main/instance.js'
import locale from './../../locale'

// 测试使用
// import Picker from 'seedsui-react/lib/Picker/Main/instance.js'
// import locale from 'seedsui-react/lib/locale'

let PickerDate = function (params) {
  let nowDate = new Date()
  /* ----------------
    Model
    ---------------- */
  let defaults = {
    viewType: 'date', // 'year','quarter','month','date','time','datetime'
    isSimpleYear: false,

    yearClass: 'text-center',
    quarterClass: 'text-center',
    monthClass: 'text-center',
    dayClass: 'text-center',
    hourClass: 'text-center',
    minuteClass: 'text-center',

    yearsData: null,
    quartersData: null,
    monthsData: null,
    daysData: null,
    hoursData: null,
    minutesData: null,

    defaultYear: '',
    defaultQuarter: '',
    defaultMonth: '',
    defaultDay: '',
    defaultHour: '',
    defaultMinute: '',

    minYear: nowDate.getFullYear() - 120, // 120年前
    maxYear: nowDate.getFullYear() + 120, // 120年后

    yyUnit: '', // 年
    MMUnit: '', // 月
    ddUnit: '', // 日
    hhUnit: '', // 时
    mmUnit: '' // 分
  }
  // eslint-disable-next-line
  params = params || {}
  for (let def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  let s = new Picker(params)

  function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  // 更新params
  s.updateParams = function (params = {}) {
    for (let param in params) {
      s.params[param] = params[param]
    }
  }
  // 设置默认值
  s.setDefaultYear = function (yearKey) {
    s.params.defaultYear = trim('' + yearKey)
  }
  s.setDefaultQuarter = function (quarterKey) {
    s.params.defaultQuarter = trim('' + quarterKey)
  }
  s.setDefaultMonth = function (monthKey) {
    s.params.defaultMonth = trim('' + monthKey)
  }
  s.setDefaultDay = function (dayKey) {
    s.params.defaultDay = trim('' + dayKey)
  }
  s.setDefaultHour = function (hourKey) {
    s.params.defaultHour = trim('' + hourKey)
  }
  s.setDefaultMinute = function (minuteKey) {
    s.params.defaultMinute = trim('' + minuteKey)
  }

  // 默认时间
  s.updateDetault = function () {
    nowDate = new Date()
    // 默认值
    if (!s.params.defaultYear) {
      let yyyy = nowDate.getFullYear()
      let _yyyy = '' + yyyy
      s.setDefaultYear(_yyyy)
    }
    if (!s.params.defaultQuarter) {
      let QQ = nowDate.quarter()
      let _QQ = QQ.toString().length === 1 ? QQ : QQ
      s.setDefaultQuarter(_QQ)
    }
    if (!s.params.defaultMonth) {
      let MM = nowDate.getMonth() + 1
      let _MM = MM.toString().length === 1 ? '0' + MM : MM
      s.setDefaultMonth(_MM)
    }
    if (!s.params.defaultDay) {
      let dd = nowDate.getDate()
      let _dd = dd.toString().length === 1 ? '0' + dd : dd
      s.setDefaultDay(_dd)
    }
    if (!s.params.defaultHour) {
      let hh = nowDate.getHours()
      let _hh = hh.toString().length === 1 ? '0' + hh : hh
      s.setDefaultHour(_hh)
    }
    if (!s.params.defaultMinute) {
      let mm = nowDate.getMinutes()
      let _mm = mm.toString().length === 1 ? '0' + mm : mm
      s.setDefaultMinute(_mm)
    }
  }
  s.updateDetault()

  // 从非自定义日数据的自然日中更新
  function updateDaysForDefault(year, month) {
    let lastDay = '' + new Date(year, month, 0).getDate()
    let currentLastDay = s.days[s.days.length - 1]['id']
    if (lastDay === currentLastDay) return
    if (lastDay > currentLastDay) {
      for (let i = 1 + parseInt(currentLastDay, 10); i <= lastDay; i++) {
        s.days.push({
          id: '' + i,
          name: '' + i + s.params.ddUnit
        })
      }
    } else if (lastDay < currentLastDay) {
      let spliceCount = currentLastDay - lastDay
      s.days.splice(s.days.length - spliceCount, spliceCount)
    }
  }

  // 从自定义的日数据daysData中更新
  function updateDaysForCustom(year, month) {
    let lastDay = '' + new Date(year, month, 0).getDate()
    let currentLastDay = s.days[s.days.length - 1]['id']
    let customData = s.params.daysData
    if (lastDay === currentLastDay) return
    if (lastDay > currentLastDay) {
      customData.forEach(function (n) {
        if (n['id'] <= lastDay && n['id'] > currentLastDay) s.days.push(n)
      })
    } else if (lastDay < currentLastDay) {
      for (let j = currentLastDay; j > lastDay; j--) {
        // eslint-disable-next-line
        s.days.forEach(function (n) {
          if (n['id'] === '' + j) s.days.pop()
        })
      }
    }
  }

  // 变换月时更新总天数
  s.updateDays = function (year, month, defaultDay) {
    if (s.params.daysData) {
      updateDaysForCustom(year, month)
    } else {
      updateDaysForDefault(year, month)
    }
    let defaultKey = defaultDay
    if (s.days.length < defaultDay) defaultKey = s.days[s.days.length - 1]['id']
    s.replaceSlot(2, s.days, defaultKey, s.params.dayClass) // 修改第三项
  }

  /* ----------------
  Method
  ---------------- */
  // 获取国际化的日期
  s.getLocaleDayString = function (date) {
    if (date instanceof Date === false) return ''
    let day = date.getDay()
    let days = [
      locale('周一', 'picker_monday'),
      locale('周二', 'picker_tuesday'),
      locale('周三', 'picker_wednesday'),
      locale('周四', 'picker_thursday'),
      locale('周五', 'picker_friday'),
      locale('周六', 'picker_saturday'),
      locale('周日', 'picker_sunday')
    ]
    // 星期天返回0
    if (day === 0) day = 7
    return days[day - 1]
  }
  // 获取选中项目的文本值
  s.getActiveDate = function (options) {
    let activeKeys = options.map(function (n, i, a) {
      return n['id']
    })
    let date = new Date()
    if (s.params.viewType === 'year') {
      date.year(activeKeys[0])
      return date
    } else if (s.params.viewType === 'quarter') {
      date.year(activeKeys[0])
      date.quarter(activeKeys[1])
      return date
    } else if (s.params.viewType === 'month') {
      date.year(activeKeys[0])
      date.month(activeKeys[1])
      return date
    } else if (s.params.viewType === 'date') {
      date.year(activeKeys[0])
      date.month(activeKeys[1])
      date.date(activeKeys[2])
      return date
    } else if (s.params.viewType === 'datetime') {
      date.year(activeKeys[0])
      date.month(activeKeys[1])
      date.date(activeKeys[2])
      date.hour(activeKeys[3])
      date.minute(activeKeys[4])
      return date
    } else if (s.params.viewType === 'time') {
      date.hour(activeKeys[0])
      date.minute(activeKeys[1])
      return date
    }
    return date
  }

  // 格式化
  s.formatDate = function (date) {
    if (date instanceof Date === false) {
      return ''
    }
    if (s.params.viewType === 'year') {
      return date.format('YYYY')
    } else if (s.params.viewType === 'quarter') {
      return date.format('YYYY-Q')
    } else if (s.params.viewType === 'month') {
      return date.format('YYYY-MM')
    } else if (s.params.viewType === 'date') {
      return date.format('YYYY-MM-DD')
    } else if (s.params.viewType === 'datetime') {
      return date.format('YYYY-MM-DD hh:mm')
    } else if (s.params.viewType === 'time') {
      return date.format('hh:mm')
    }
    return date.format('YYYY-MM-DD')
  }
  // 标题格式化
  s.formatTitle = function (format) {
    const options = s.activeOptions
    let activeDate = s.getActiveDate(options)
    return activeDate.format(format)
  }
  s.setDefaultsByKeys = function (activeKeys) {
    if (
      s.params.viewType === 'year' ||
      s.params.viewType === 'quarter' ||
      s.params.viewType === 'month' ||
      s.params.viewType === 'date' ||
      s.params.viewType === 'datetime'
    ) {
      if (activeKeys[0]) s.setDefaultYear(activeKeys[0])
      if (s.params.viewType === 'quarter' && activeKeys[1]) {
        s.setDefaultQuarter(activeKeys[1])
      } else if (activeKeys[1]) {
        s.setDefaultMonth(activeKeys[1])
      }
      if (activeKeys[2]) s.setDefaultDay(activeKeys[2])
      if (activeKeys[3]) s.setDefaultHour(activeKeys[3])
      if (activeKeys[4]) s.setDefaultMinute(activeKeys[4])
    } else if (s.params.viewType === 'time') {
      if (activeKeys[0]) s.setDefaultHour(activeKeys[0])
      if (activeKeys[1]) s.setDefaultMinute(activeKeys[1])
    }
  }
  s.setDefaults = function (activeData) {
    if (activeData.year) s.setDefaultYear(activeData.year)
    if (activeData.quarter) s.setDefaultQuarter(activeData.quarter)
    if (activeData.month) s.setDefaultMonth(activeData.month)
    if (activeData.day) s.setDefaultDay(activeData.day)
    if (activeData.hour) s.setDefaultHour(activeData.hour)
    if (activeData.minute) s.setDefaultMinute(activeData.minute)
  }
  /* ----------------
  Init
  ---------------- */

  // 添加数据
  function addYearSlot() {
    // 年
    s.years = []
    if (s.params.yearsData) {
      s.years = s.params.yearsData
    } else {
      for (let yyyy = s.params.minYear; yyyy <= s.params.maxYear; yyyy++) {
        s.years.push({
          id: '' + yyyy,
          name: s.params.isSimpleYear
            ? yyyy.toString().substring(2, 4) + s.params.yyUnit
            : yyyy + s.params.yyUnit
        })
      }
    }
    s.addSlot(s.years, s.params.defaultYear, s.params.yearClass)
  }

  function addQuarterSlot() {
    // 年
    addYearSlot()

    // 季
    s.quarters = []
    if (s.params.quartersData) {
      s.quarters = s.params.quartersData
    } else {
      for (let q = 1; q <= 4; q++) {
        s.quarters.push({
          id: q,
          name: q
        })
      }
    }
    s.addSlot(s.quarters, s.params.defaultQuarter, s.params.quarterClass)
  }

  function addMonthSlot() {
    // 年
    addYearSlot()

    // 月
    s.months = []
    if (s.params.monthsData) {
      s.months = s.params.monthsData
    } else {
      for (let MM = 1; MM <= 12; MM++) {
        let _MM = MM.toString().length === 1 ? '0' + MM : MM
        s.months.push({
          id: '' + _MM,
          name: _MM + s.params.MMUnit
        })
      }
    }
    s.addSlot(s.months, s.params.defaultMonth, s.params.monthClass)
  }

  function addDateSlot() {
    addMonthSlot()
    // 日
    s.days = []
    let currentMaxday = new Date(
      s.params.defaultYear || nowDate.getFullYear(),
      s.params.defaultMonth || nowDate.getMonth() + 1,
      0
    ).getDate()
    if (s.params.daysData) {
      s.days = Object.clone(s.params.daysData)
    } else {
      for (let dd = 1; dd <= currentMaxday; dd++) {
        let _dd = dd.toString().length === 1 ? '0' + dd : dd
        s.days.push({
          id: '' + _dd,
          name: _dd + s.params.ddUnit
        })
      }
    }
    s.addSlot(s.days, s.params.defaultDay, s.params.dayClass)
  }

  function addTimeSlot() {
    // 时
    s.hours = []
    if (s.params.hoursData) {
      s.hours = s.params.hoursData
    } else {
      for (let hh = 0; hh <= 23; hh++) {
        let _hh = hh.toString().length === 1 ? '0' + hh : hh
        s.hours.push({
          id: '' + _hh,
          name: _hh + s.params.hhUnit
        })
      }
    }
    s.addSlot(s.hours, s.params.defaultHour, s.params.hourClass)
    // 分
    s.minutes = []
    if (s.params.minutesData) {
      s.minutes = s.params.minutesData
    } else {
      for (let mm = 0; mm <= 59; mm++) {
        let _mm = mm.toString().length === 1 ? '0' + mm : mm
        s.minutes.push({
          id: '' + _mm,
          name: _mm + s.params.mmUnit
        })
      }
    }
    s.addSlot(s.minutes, s.params.defaultMinute, s.params.minuteClass)
  }

  function addDateTime() {
    addDateSlot()
    addTimeSlot()
  }

  function initSlots() {
    switch (s.params.viewType) {
      case 'year':
        addYearSlot()
        break
      case 'quarter':
        addQuarterSlot()
        break
      case 'month':
        addMonthSlot()
        break
      case 'date':
        addDateSlot()
        break
      case 'time':
        addTimeSlot()
        break
      case 'datetime':
        addDateTime()
        break
      default:
        console.error('DatePicker.Modal: failed to initSlots')
    }
  }
  s.update = function () {
    s.clearSlots()
    initSlots()
  }
  initSlots()
  return s
}

export default PickerDate
