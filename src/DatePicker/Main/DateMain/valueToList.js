// 内库使用
import DateUtil from './../../../DateUtil'

// 日期转列表
function valueToList(value, type) {
  let currentDate = value
  if (value instanceof Date === false) {
    currentDate = new Date()
  }

  let year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let date = currentDate.getDate()
  let hour = currentDate.getHours()
  let minute = currentDate.getMinutes()
  let quarter = DateUtil.quarter(currentDate)

  if (type === 'year') {
    return [{ id: year, name: year }]
  }
  if (type === 'quarter') {
    return [
      { id: year, name: year },
      { id: quarter, name: 'Q' + quarter }
    ]
  }
  if (type === 'month') {
    return [
      { id: year, name: year },
      { id: month, name: month }
    ]
  }
  if (type === 'date') {
    return [
      { id: year, name: year },
      { id: month, name: month },
      { id: date, name: date }
    ]
  }
  if (type === 'datetime') {
    return [
      { id: year, name: year },
      { id: month, name: month },
      { id: date, name: date },
      { id: hour, name: hour },
      { id: minute, name: minute }
    ]
  }
  if (type === 'time') {
    return [
      { id: hour, name: hour },
      { id: minute, name: minute }
    ]
  }

  return null
}

export default valueToList
