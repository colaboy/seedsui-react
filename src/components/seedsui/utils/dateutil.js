// DateUtil
window.Date.prototype.minuteMilliSecond = 60 * 1000
window.Date.prototype.hourMilliSecond = 60 * 60 * 1000
window.Date.prototype.dayMilliSecond = 24 * 60 * 60 * 1000
window.Date.prototype.weekMilliSecond = 7 * 24 * 60 * 60 * 1000

/*
  * 年操作
  * */
// 年
window.Date.prototype.year = function (year) {
  if (year) this.setYear(year)
  return this.getFullYear()
}
// 上一年
window.Date.prototype.prevYear = function (count) {
  this.setYear(this.getFullYear() - (count || 1))
  return this
}
// 下一年
window.Date.prototype.nextYear = function (count) {
  this.setYear(this.getFullYear() + (count || 1))
  return this
}
/*
  * 季操作
  * */
// 季
window.Date.prototype.season = function (count) {
  if (count) {
    this.setMonth(count * 3 - 1)
    return count
  }
  return Math.ceil((this.getMonth() + 1) / 3)
}
// 上一季
window.Date.prototype.prevSeason = function (count) {
  // 获得当前季的第一个月
  this.setMonth(this.getMonth() - (3 * (count || 1)))
  return this.season()
}
// 下一季
window.Date.prototype.nextSeason = function (count) {
  // 获得当前季的第一个月
  this.setMonth(this.getMonth() + (3 * (count || 1)))
  return this.season()
}
/*
  * 月操作
  * */
// 月
window.Date.prototype.month = function (month) {
  if (month) this.setMonth(month)
  var num = this.getMonth() + 1
  return num < 10 ? '0' + num : num
}
// 上一月
window.Date.prototype.prevMonth = function (count) {
  this.setMonth(this.getMonth() - (count || 1))
  return this
}
// 下一月
window.Date.prototype.nextMonth = function (count) {
  this.setMonth(this.getMonth() + (count || 1))
  return this
}
// 年初
window.Date.prototype.firstMonth = function () {
  this.setMonth(0)
  return this
}
// 年末
window.Date.prototype.endMonth = function () {
  this.setMonth(11)
  return this
}

/*
  * 周操作
  * */
// 周几,参数:zh_cn
window.Date.prototype.day = function (language) {
  var chDay = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 0: '日' }
  if (language === 'zh_cn') {
    return chDay[this.getDay()]
  }
  return this.getDay()
}
// 周数
window.Date.prototype.week = function (count) {
  // 当年的1月1日
  var january1 = new Date(this.getFullYear(), 0, 1)
  var january1Day = january1.getDay()
  if (january1Day === 0) january1Day = 7
  // 如果传入周数,则设置周数
  if (count) {
    this.setTime(january1.getTime() + (this.weekMilliSecond * count))
    return count
  }
  // 计算当前天到1月1号相差周数
  var num = Math.ceil((this.getTime() - january1.getTime()) / this.weekMilliSecond)
  return num
}
// 上一周
window.Date.prototype.prevWeek = function (count) {
  this.setTime(this.getTime() - (this.weekMilliSecond * (count || 1)))
  return this
}
// 下一周
window.Date.prototype.nextWeek = function (count) {
  this.setTime(this.getTime() + (this.weekMilliSecond * (count || 1)))
  return this
}
// 周日,日历都是从周日开始的
window.Date.prototype.sunday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() - this.dayMilliSecond * day)
  return this
}
// 获得一周的日期
window.Date.prototype.getWeeks = function () {
  var weeks = []
  var sunday = this.sunday()
  for (var i = 0; i < 7; i++) {
    weeks.push(new Date(sunday.getTime() + this.dayMilliSecond * i))
  }
  return weeks
}

/*
  * 日操作
  * */
// 日
window.Date.prototype.date = function (date) {
  if (date) this.setDate(date)
  var num = this.getDate()
  return num < 10 ? '0' + num : num
}
// 上一天
window.Date.prototype.prevDate = function (count) {
  this.setTime(this.getTime() - (this.dayMilliSecond * (count || 1)))
  return this
}
// 下一天
window.Date.prototype.nextDate = function (count) {
  this.setTime(this.getTime() + (this.dayMilliSecond * (count || 1)))
  return this
}
// 月初
window.Date.prototype.firstDate = function () {
  this.setDate('01')
  return this
}
// 月末
window.Date.prototype.endDate = function () {
  this.setMonth(this.getMonth() + 1, 0)
  this.setDate(this.getDate())
  return this
}
// 返回当月共多少天
window.Date.prototype.getEndDate = function () {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
}
/*
  * 时操作
  * */
// 时
window.Date.prototype.hour = function (hour) {
  if (hour) this.setHours(hour)
  var num = this.getHours()
  return num < 10 ? '0' + num : num
}
// 上一小时
window.Date.prototype.nextHour = function (count) {
  this.setTime(this.getTime() - (this.hourMilliSecond * (count || 1)))
  return this
}
// 下一小时
window.Date.prototype.nextHour = function (count) {
  this.setTime(this.getTime() + (this.hourMilliSecond * (count || 1)))
  return this
}
/*
  * 分操作
  * */
// 分
window.Date.prototype.minute = function (minute) {
  if (minute) this.setMinutes(minute)
  var num = this.getMinutes()
  return num < 10 ? '0' + num : num
}
// 上一分钟
window.Date.prototype.prevMinute = function (count) {
  this.setTime(this.getTime() - (this.minuteMilliSecond * (count || 1)))
  return this
}
// 下一分钟
window.Date.prototype.nextMinute = function (count) {
  this.setTime(this.getTime() + (this.minuteMilliSecond * (count || 1)))
  return this
}
// 返回当前分钟的下档位时间
window.Date.prototype.nextMinuteSpace = function (argSpace) {
  var space = argSpace ? argSpace : 5 // 间隔
  var minute = this.getMinutes() // 分钟
  var hasRemainder = minute % space === 0 // 是否有余数

  var percentNum = Math.ceil(minute / space) // 档位
  percentNum = hasRemainder ? parseInt(percentNum, 10) + 1 : percentNum

  var result = percentNum * space // 根据档位计算结果
  this.setMinutes(result)
  return this
}
// 返回当前分钟的上档位时间
window.Date.prototype.prevMinuteSpace = function (argSpace) {
  var space = argSpace ? argSpace : 5 // 间隔
  var minute = this.getMinutes() // 分钟
  var hasRemainder = minute % space === 0 // 是否有余数

  var percentNum = Math.floor(minute / space) // 档位
  percentNum = hasRemainder ? parseInt(percentNum, 10) - 1 : percentNum

  var result = percentNum * space // 根据档位计算结果
  this.setMinutes(result)
  return this
}
/*
  * 比较操作
  * */
// 比较Date对象,返回相差天时分秒等信息
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
// 比较年月日时分秒，大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareDateTime = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setSeconds(0, 0)
  date2.setSeconds(0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
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
  return t1 > t2 ? 1 : -1
}
// 比较年月,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareMonth = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setDate(0)
  date1.setHours(0, 0, 0, 0)
  date2.setDate(0)
  date2.setHours(0, 0, 0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}
// 比较时分,格式:hh:mm,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareTime = function (date) {
  var date1 = new Date(this)
  date1.setYear(0)
  date1.setMonth(0, 0)
  var date2 = new Date()
  if (date.isTime) {
    date2.setHours(date.split(':')[0], date.split(':')[1], date.split(':')[2] || 0, 0)
  } else if (date instanceof Date) {
    date2 = date
  } else {
    console.log('请传入hh:mm的字符串,或者一个Date对象')
    return false
  }
  date2.setYear(0)
  date2.setMonth(0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}
/*
  * 返回时效,例如:new Date().expires('today'),返回
  * 参数: Date | String(小时数 | 'today')
  * 返回: Date (增加时效后的日期)
  * */
window.Date.prototype.expires = function (expires) {
   // 如果没传参数, 默认返回2小时后的时效
  if (!expires) {
    this.nextHour(2)
    return this
  }
  // 如果参数是日期
  if (expires instanceof Date === true) {
    // 如果小于当前时间, 则返回设置的时效日期
    if (expires.compareDateTime(this) === 1) {
      return expires
    }
    return this
  }
  // 如果参数是小时
  if (!isNaN(expires)) {
    this.nextHour(expires)
    return this
  }
  // 如果参数是今天
  if (expires === 'today') {
    this.setHours(0, 0, 0, 0)
    this.nextDate()
    return this
  }
}

/*
  * 格式化
  * */
// 格式化日期,参数:yyyy-MM-dd hh:mm:ss WW EE
window.Date.prototype.format = function (fmtModel) {
  var fmt = typeof fmtModel === 'string' ? fmtModel : 'yyyy-MM-dd hh:mm:ss'
  var year = this.getFullYear()
  var month = this.getMonth() + 1
  var date = this.getDate()
  var hour = this.getHours()
  var minute = this.getMinutes()
  var second = this.getSeconds()
  var weeksCount = this.week()
  var week = this.day('zh_cn')

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
