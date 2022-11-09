// 把相差的毫秒数转成日、时、分、秒
// eslint-disable-next-line
Number.prototype.toDuration = function (start) {
  var milli = this
  // 如果从秒开始
  if (start === 'second') {
    return {
      seconds: milli / 1000
    }
  }

  var secondMilli = 1000 // 一分钟的毫秒数
  var minuteMilli = 60 * secondMilli // 一分钟的毫秒数
  var hourMilli = 60 * minuteMilli // 一小时的毫秒数
  var dayMilli = 24 * hourMilli // 一天的毫秒数
  // 计算出相差天数
  var daysDiff = Math.floor(milli / dayMilli)
  // 计算出剩余小时数
  var dayMilliRemainder = milli % dayMilli
  var hoursDiff = Math.floor(dayMilliRemainder / hourMilli)
  // 计算剩余分钟数
  var minuteMilliRemainder = dayMilliRemainder % hourMilli
  var minutesDiff = Math.floor(minuteMilliRemainder / minuteMilli)
  // 计算剩余秒数
  var secondMilliRemainder = minuteMilliRemainder % minuteMilli
  var secondsDiff = Math.round(secondMilliRemainder / secondMilli)

  // 如果从时开始
  if (start === 'hour') {
    return {
      hours: hoursDiff + daysDiff * 24,
      minutes: minutesDiff,
      seconds: secondsDiff
    }
  }
  // 如果从分开始
  if (start === 'minute') {
    return {
      minutes: minutesDiff + hoursDiff * 60 + daysDiff * 24 * 60,
      seconds: secondsDiff
    }
  }
  // 从天开始
  return {
    days: daysDiff,
    hours: hoursDiff,
    minutes: minutesDiff,
    seconds: secondsDiff
  }
}
