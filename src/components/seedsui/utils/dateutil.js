// DateUtil

// 比较年月日时分秒，大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareDateTime = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setSeconds(0, 0)
  date2.setSeconds(0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 === true ? 1 : -1
}
// 比较年月日,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareDate = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setHours(0, 0, 0, 0)
  date2.setHours(0, 0, 0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 === true ? 1 : -1
}
// 比较时分,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareTime = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setYear(0)
  date1.setMonth(0, 0)
  date2.setYear(0)
  date2.setMonth(0, 0)

  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 === true ? 1 : -1
}
// 年
window.Date.prototype.year = function () {
  return this.getFullYear()
}
// 月
window.Date.prototype.month = function () {
  var monthNum = this.getMonth() + 1
  if (monthNum < 10) {
    monthNum = '0' + monthNum
  }
  return monthNum
}
// 日
window.Date.prototype.date = function () {
  var dayNum = this.getDate()
  if (dayNum < 10) {
    dayNum = '0' + dayNum
  }
  return dayNum
}
// 返回当月共多少天
window.Date.prototype.days = function (year, month) {
  if (month && year) {
    return new Date(year, month, 0).getDate()
  }
  return new Date(this.year(), this.month(), 0).getDate()
}
// 时
window.Date.prototype.hour = function () {
  var hourNum = this.getHours()
  if (hourNum < 10) {
    hourNum = '0' + hourNum
  }
  return hourNum
}
// 分
window.Date.prototype.minute = function () {
  var minuteNum = this.getMinutes()
  if (minuteNum < 10) {
    minuteNum = '0' + minuteNum
  }
  return minuteNum
}
// 周,参数:zh_cn
window.Date.prototype.week = function (language) {
  var chinaWeek = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 0: '日' }
  if (language === 'zh_cn') {
    return chinaWeek[this.getDay()]
  }
  return this.getDay()
}
// 季
window.Date.prototype.quarter = function () {
  return Math.floor((this.getMonth() + 3) / 3)
}
// 获得当前日期的周数
window.Date.prototype.getWeeksCount = function () {
  var dayMilliSecond = 24 * 60 * 60 * 1000

  var startDate = new Date(this.getFullYear(), 0, 1)
  var startDay = startDate.getDay()
  if (startDay === 0) startDay = 7

  this.setHours(0, 0, 0, 0)
  var currentDay = this.getDay()
  if (currentDay === 0) currentDay = 7

  var dateNum = Math.round((this.getTime() - startDate.getTime() + (startDay - currentDay) * dayMilliSecond) / dayMilliSecond)
  return Math.ceil(dateNum / 7) + 1
}

// Date对象,返回相差天数等
window.Date.prototype.diff = function (date) {
  var dateStart = this // 开始时间
  var dateEnd = date // 结束时间

  var secondMilli = 1000 // 一分钟的毫秒数
  var minuteMilli = 60 * secondMilli // 一分钟的毫秒数
  var hourMilli = 60 * minuteMilli // 一小时的毫秒数
  var dayMilli = 24 * hourMilli // 一天的毫秒数

  var timeDiff = dateEnd.getTime() - dateStart.getTime() // 毫秒差

  // 计算出相差天数
  var daysDiff = Math.floor(timeDiff / dayMilli)
  // 计算出剩余小时数
  var dayMilliRemainder = timeDiff % dayMilli
  var hoursDiff = Math.floor(dayMilliRemainder / hourMilli)
  // 计算剩余分钟数
  var minuteMilliRemainder = dayMilliRemainder % hourMilli
  var minutesDiff = Math.floor(minuteMilliRemainder / minuteMilli)
  // 计算剩余秒数
  var secondMilliRemainder = minuteMilliRemainder % minuteMilli
  var secondsDiff = Math.round(secondMilliRemainder / secondMilli)

  // 计算相差小时数
  var hoursAllDiff = Math.floor(timeDiff / hourMilli)
  // 计算相差分钟数
  var minutesAllDiff = Math.floor(timeDiff / minuteMilli)
  // 计算相差秒数
  var secondsAllDiff = Math.floor(timeDiff / secondMilli)

  return {
    days: daysDiff,
    hours: hoursDiff,
    minutes: minutesDiff,
    seconds: secondsDiff,
    hoursAll: hoursAllDiff,
    minutesAll: minutesAllDiff,
    secondsAll: secondsAllDiff
  }
}
// 减天数
window.Date.prototype.minusDate = function (num) {
  var numMilli = num * 1000 * 60 * 60 * 24
  this.setTime(this.getTime() - numMilli)
  return this
}
// 加天数
window.Date.prototype.plusDate = function (num) {
  var numMilli = num * 1000 * 60 * 60 * 24
  this.setTime(this.getTime() + numMilli)
  return this
}
// 减分钟
window.Date.prototype.minusMinute = function (num) {
  var numMilli = num * 1000 * 60
  this.setTime(this.getTime() - numMilli)
  return this
}
// 加分钟
window.Date.prototype.plusMinute = function (num) {
  var numMilli = num * 1000 * 60
  this.setTime(this.getTime() + numMilli)
  return this
}
// 整数时间，返回日期的档位时间
window.Date.prototype.setMinuteCeil = function (space) {
  /* eslint-disable */
  var space = space ? space : 5 // 间隔
  /* eslint-enable */
  var minute = this.getMinutes() // 分钟
  var hasRemainder = minute % space === 0 // 是否有余数

  var percentNum = Math.ceil(minute / space) // 档位
  percentNum = hasRemainder ? parseInt(percentNum, 10) + 1 : percentNum

  var result = percentNum * space // 根据档位计算结果
  this.setMinutes(result)
  return this
}
// 整数时间，返回日期的档位时间
window.Date.prototype.setMinuteFloor = function (space) {
  /* eslint-disable */
  var space = space ? space : 5 // 间隔
  /* eslint-enable */
  var minute = this.getMinutes() // 分钟
  var hasRemainder = minute % space === 0 // 是否有余数

  var percentNum = Math.floor(minute / space) // 档位
  percentNum = hasRemainder ? parseInt(percentNum) - 1 : percentNum

  var result = percentNum * space // 根据档位计算结果
  this.setMinutes(result)
  return this
}
// 时效性比较,以当前时间为基准,支持比较'日期对象' / '小时数' / 'today'
window.Date.prototype.expires = function (expiresTime) {
  if (!expiresTime) return
  var endTime = new Date(this)
  // 如果参数是日期
  if (expiresTime instanceof Date === true) {
    if (endTime.compareDateTime(expiresTime) === -1) {
      return expiresTime
    } else {
      endTime.setHours(0, 0, 0, 0)
      return endTime.plusDay(1)
    }
  }

  // 如果参数是小时
  if (!isNaN(expiresTime)) {
    var numMilli = expiresTime * 1000 * 60 * 60
    endTime = new Date(endTime.getTime() + numMilli)
    return endTime
  }

  // 如果参数是今天
  if (expiresTime === 'today') {
    endTime.setHours(0, 0, 0, 0)
    return endTime.plusDay(1)
  }
}
// 格式化日期,参数:yyyy-MM-dd hh:mm:ss WW EE
window.Date.prototype.format = function (fmtModel) {
  var fmt = typeof fmtModel === 'string' ? fmtModel : 'yyyy-MM-dd hh:mm:ss'
  var year = this.getFullYear()
  var month = this.getMonth() + 1
  var date = this.getDate()
  var hour = this.getHours()
  var minute = this.getMinutes()
  var second = this.getSeconds()
  var weeksCount = this.getWeeksCount()
  var week = this.week('zh_cn')

  var dateJson = {
    'M+': month,
    'd+': date,
    'h+': hour,
    'm+': minute,
    's+': second,
    'W+': weeksCount,
    'E+': week
  }
  if (/(y+)/.test(fmt)) { // 匹配年
    fmt = fmt.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length))
  }
  for (var k in dateJson) { // 逐个匹配
    // '('+ k +')'=(M+)、(d+)、(h+)...
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateJson[k]) : (('00' + dateJson[k]).substr(('' + dateJson[k]).length)))
    }
  }
  return fmt
}
// 获取月头和月尾
window.Date.prototype.monthStartEnd = function () {
  var year = this.year()
  var month = this.month()
  var firstDay = '01'
  var lastDay = this.days()
  if (lastDay < 10) lastDay = '0' + lastDay
  return {
    start: year + '-' + month + '-' + firstDay,
    end: year + '-' + month + '-' + lastDay
  }
}