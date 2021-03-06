import Bridge from './../Bridge'
import locale from './../locale'

export default {
  getDateRange: function (type) {
    let date = null
    // 今天
    if (type === 'today') {
      date = new Date()
      return {
        startDate: date.format('YYYY-MM-DD'),
        endDate: date.format('YYYY-MM-DD')
      }
    }
    // 昨天
    if (type === 'yesterday') {
      date = new Date()
      date.prevDate()
      return {
        startDate: date.format('YYYY-MM-DD'),
        endDate: date.format('YYYY-MM-DD')
      }
    }
    // 本月
    if (type === 'month') {
      date = new Date()
      date.firstMonthDate()
      return {
        startDate: date.format('YYYY-MM-DD'),
        endDate: new Date().format('YYYY-MM-DD')
      }
    }
    // 上月
    if (type === 'prevmonth') {
      let sDate = new Date()
      sDate.prevMonth()
      sDate.firstMonthDate()
      let eDate = new Date()
      eDate.prevMonth()
      eDate.lastMonthDate()
      return {
        startDate: sDate.format('YYYY-MM-DD'),
        endDate: eDate.format('YYYY-MM-DD')
      }
    }
    // 最近7内
    if (type === '7') {
      date = new Date()
      date.prevDate(7)
      return {
        startDate: date.format('YYYY-MM-DD'),
        endDate: new Date().format('YYYY-MM-DD')
      }
    }
    // 最近30天
    if (type === '30') {
      date = new Date()
      date.prevDate(30)
      return {
        startDate: date.format('YYYY-MM-DD'),
        endDate: new Date().format('YYYY-MM-DD')
      }
    }
  },
  getDateName: function (startDate, endDate) {
    let date = null
    // 今天
    date = this.getDateRange('today')
    if (endDate === date.endDate && startDate === date.startDate) {
      return locale('今天', 'datepopover_today')
    }
    // 昨天
    date = this.getDateRange('yesterday')
    if (endDate === date.endDate && startDate === date.startDate) {
      return locale('昨天', 'datepopover_yesterday')
    }
    // 本月
    date = this.getDateRange('month')
    if (endDate === date.endDate && startDate === date.startDate) {
      return locale('本月', 'datepopover_this_month')
    }
    // 上月
    date = this.getDateRange('prevmonth')
    if (endDate === date.endDate && startDate === date.startDate) {
      return locale('上月', 'datepopover_last_month')
    }
    // 最近7内
    date = this.getDateRange('7')
    if (endDate === date.endDate && startDate === date.startDate) {
      return locale(locale('最近7天', 'datepopover_last_days', ['7']))
    }
    // 最近30天
    date = this.getDateRange('30')
    if (endDate === date.endDate && startDate === date.startDate) {
      return locale('最近30天', 'datepopover_last_days', ['30'])
    }
    // 自定义
    return `${startDate.substring(5)} ~ ${endDate.substring(5)}`
  },
  // 计算区间, 区间内
  isRange: function (startDate, endDate, range, rangeErrMsg) {
    if (!range) return true
    if (startDate && endDate) {
      const diff = startDate.toDate().diff(endDate.toDate())
      if (diff.days > range) {
        Bridge.showToast(rangeErrMsg || locale(`自定义时间区间不能超过${range}天`, 'hint_error_datepopover_custom_date_range_timeout', [range]), { mask: false })
        return false
      }
    }
    return true
  }
}
