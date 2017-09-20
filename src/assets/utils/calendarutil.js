//  CalendarUtil 日历工具箱
var CalendarUtil = function (activeDate) {
  /* ---------------------
  Model
  --------------------- */
  var s = this
  s.weekMilliSecond = 7 * 24 * 60 * 60 * 1000
  s.dayMilliSecond = 24 * 60 * 60 * 1000
  // 选中日期
  s.activeDate = activeDate ? new Date(activeDate) : new Date()
  // 周视图
  s.midWeek = []
  s.prevWeek = []
  s.nextWeek = []
  s.tempWeek = []

  s.createWeeks = function () {
    for (var i = 0; i < 7; i++) {
      s.midWeek.push(new Date())
      s.prevWeek.push(new Date())
      s.nextWeek.push(new Date())
      s.tempWeek.push(new Date())
    }
  }
  s.createWeeks()
  // 月视图
  s.midMonth = []
  s.prevMonth = []
  s.nextMonth = []
  s.tempMonth = []
  s.createMonths = function () {
    for (var i = 0; i < 42; i++) {
      s.midMonth.push(new Date())
      s.prevMonth.push(new Date())
      s.nextMonth.push(new Date())
      s.tempMonth.push(new Date())
    }
  }
  s.createMonths()
  /* ---------------------
  Method
  --------------------- */
  // 周视图，根据日期获得一周
  s.updateWeekByDate = function (date, week) {
    var day = date.getDay()
    var startDayMs = date.getTime() - s.dayMilliSecond * day
    if (!week) {
      week = s.tempWeek
    }
    week[0].setTime(startDayMs)
    for (var i = 1; i < 7; i++) {
      week[i].setTime(week[i - 1].getTime() + s.dayMilliSecond)
    }
    return week
  }
  s.getMidWeek = function () { // 获得本周
    return s.updateWeekByDate(s.activeDate, s.midWeek)
  }
  s.getPrevWeek = function () { // 获得上周
    var prevWeekDateMs = s.activeDate.getTime() - s.weekMilliSecond
    return s.updateWeekByDate(new Date(prevWeekDateMs), s.prevWeek)
  }
  s.getNextWeek = function () { // 获得下周
    var nextWeekDateMs = s.activeDate.getTime() + s.weekMilliSecond
    return s.updateWeekByDate(new Date(nextWeekDateMs), s.nextWeek)
  }
  // 月视图
  s.currentMonth = null
  s.activeIndex = null
  s.activeRowIndex = null
  s.updateMonthByDate = function (date, month) {
    // 1日
    var firstDay = new Date()
    firstDay.setTime(date.getTime() - s.dayMilliSecond * (date.getDate() - 1))
    var firstDayIndex = firstDay.getDay()

    // 31日
    var monthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    var lastDayIndex = firstDayIndex + monthDays

    // 起始日
    var startDayMs = firstDay.getTime() - s.dayMilliSecond * firstDayIndex

    if (!month) {
      month = s.tempMonth
    }

    // 生成月
    for (var i = 0; i < 42; i++) {
      if (i === 0) month[0].setTime(startDayMs)
      else month[i].setTime(month[i - 1].getTime() + s.dayMilliSecond)
      // 设置选中项
      if (s.currentMonth === 'midMonth' && month[i].compareDate(date) === 0) {
        s.activeIndex = i + 42
        s.activeRowIndex = Math.floor(i / 7)
      }

      // 设置当月标识isCurrent
      month[i].isCurrent = false
      if (i >= firstDayIndex && i < lastDayIndex) month[i].isCurrent = true
    }
    return month
  }
  s.getPrevMonth = function () { // 获得上月
    s.currentMonth = 'prevMonth'

    var prevDate = new Date()
    prevDate.setMonth(s.activeDate.getMonth() - 1)
    return s.updateMonthByDate(prevDate, s.prevMonth)
  }
  s.getMidMonth = function () { // 获得本月
    s.currentMonth = 'midMonth'

    return s.updateMonthByDate(s.activeDate, s.midMonth)
  }
  s.getNextMonth = function () { // 获得下月
    s.currentMonth = 'nextMonth'

    var nextDate = new Date()
    nextDate.setMonth(s.activeDate.getMonth() + 1)
    return s.updateMonthByDate(nextDate, s.nextMonth)
  }
  s.getCalendarData = function () {
    return s.getPrevMonth().concat(s.getMidMonth()).concat(s.getNextMonth())
  }
  // 设置选中日期
  s.setActiveDate = function (activeDate) {
    s.activeDate.setTime(activeDate.getTime())
  }
  s.activePrevWeek = function () {
    var ms = s.activeDate.getTime() - s.weekMilliSecond
    s.activeDate = new Date(ms)
  }
  s.activeNextWeek = function () {
    var ms = s.activeDate.getTime() + s.weekMilliSecond
    s.activeDate = new Date(ms)
  }
  s.activePrevMonth = function () {
    var tempDate = new Date(s.activeDate)
    tempDate.setMonth(s.activeDate.getMonth() - 1)
    if (s.activeDate.getMonth() === tempDate.getMonth()) {
      tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 0)
    }
    s.activeDate = tempDate
  }
  s.activeNextMonth = function () {
    var tempDate = new Date(s.activeDate)
    tempDate.setMonth(s.activeDate.getMonth() + 1)
    if (s.activeDate.getMonth() === tempDate.getMonth() - 2) {
      tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 0)
    }
    s.activeDate = tempDate
  }
  /* 其它工具 */
  // 根据日期，获得周数
  s.getWeeksNum = function (currentDate) {
    var startDate = new Date(currentDate.getFullYear(), 0, 1)
    var startDay = startDate.getDay()
    if (startDay === 0) startDay = 7

    currentDate.setHours(0, 0, 0, 0)
    var currentDay = currentDate.getDay()
    if (currentDay === 0) currentDay = 7

    var dateNum = Math.round((currentDate.getTime() - startDate.getTime() + (startDay - currentDay) * s.dayMilliSecond) / s.dayMilliSecond)
    return Math.ceil(dateNum / 7) + 1
  }
  // 激活天为准，推前天数
  s.getBeforeDays = function (beforenum) {
    var days = []
    for (var i = 1; i <= beforenum; i++) {
      days.push(new Date(s.activeDate.getTime() - i * s.dayMilliSecond))
    }
    return days
  }
  // 激活月为准，推前月
  s.getBeforeMonths = function (beforenum) {
    var months = []
    var tempDate = new Date(s.activeDate.getFullYear(), s.activeDate.getMonth())
    for (var i = 1; i <= beforenum; i++) {
      var tempDate2 = new Date()
      tempDate2.setMonth(tempDate.getMonth() - i)
      months.push(tempDate2)
    }
    return months
  }
  // 激活周为准，推前周
  s.getBeforeWeeks = function (beforenum) {
    var weeks = new Array(beforenum)
    for (var i = 0; i < beforenum; i++) {
      weeks[i] = []
      for (var j = 0; j < 7; j++) {
        weeks[i].push(new Date())
      }
      var prevWeekDateMs = s.activeDate.getTime() - s.weekMilliSecond * (i + 1)
      s.updateWeekByDate(new Date(prevWeekDateMs), weeks[i])
    }
    return weeks
  }
};

//export default CalendarUtil
