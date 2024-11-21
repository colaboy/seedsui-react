// 内库使用
import DateUtil from './../../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 数据
function getList(value, type, { hourStep, minuteStep }) {
  if (!hourStep || typeof hourStep !== 'number') {
    // eslint-disable-next-line
    hourStep = 1
  }
  if (!minuteStep || typeof minuteStep !== 'number') {
    // eslint-disable-next-line
    minuteStep = 1
  }

  // Year
  let years = []
  for (let item = new Date().getFullYear() - 120; item <= new Date().getFullYear() + 120; item++) {
    years.push({
      id: item,
      name: item
    })
  }

  // Month
  let months = []
  for (let item = 1; item <= 12; item++) {
    months.push({
      id: item,
      name: item
    })
  }

  // Date
  let dates = []
  for (let item = 1; item <= DateUtil.getDaysInMonth(value); item++) {
    dates.push({
      id: item,
      name: item
    })
  }

  // Hour
  let hours = []
  for (let item = 0; item <= 23; item += hourStep) {
    hours.push({
      id: item,
      name: item
    })
  }

  // Minute
  let minutes = []
  for (let item = 0; item <= 59; item += minuteStep) {
    minutes.push({
      id: item,
      name: item
    })
  }

  // Quarter
  let quarters = []
  for (let item = 1; item <= 4; item++) {
    quarters.push({
      id: item,
      name: 'Q' + item
    })
  }

  if (type === 'year') {
    return [years]
  }
  if (type === 'quarter') {
    return [years, quarters]
  }
  if (type === 'month') {
    return [years, months]
  }
  if (type === 'date') {
    return [years, months, dates]
  }
  if (type === 'datetime') {
    return [years, months, dates, hours, minutes]
  }
  if (type === 'time') {
    return [hours, minutes]
  }

  return null
}

export default getList
