// 列表转日期
function listToValue(list, type) {
  if (type === 'year') {
    let year = list[0].id

    let newDate = new Date()
    newDate.setFullYear(year)
    return newDate
  }
  if (type === 'quarter') {
    let year = list[0].id
    let quarter = list[1].id
    let month = (quarter - 1) * 3

    let newDate = new Date()
    newDate.setFullYear(year, month)
    return newDate
  }
  if (type === 'month') {
    let year = list[0].id
    let month = list[1].id - 1

    let newDate = new Date()
    newDate.setFullYear(year, month)
    return newDate
  }
  if (type === 'date') {
    let year = list[0].id
    let month = list[1].id - 1
    let date = list[2].id

    let newDate = new Date()
    newDate.setFullYear(year, month, date)
    return newDate
  }
  if (type === 'datetime') {
    let year = list[0].id
    let month = list[1].id - 1
    let date = list[2].id
    let hour = list[3].id
    let minute = list[4].id

    let newDate = new Date()
    newDate.setFullYear(year, month, date)
    newDate.setHours(hour, minute, 0)
    return newDate
  }
  if (type === 'time') {
    let hour = list[0].id
    let minute = list[1].id

    let newDate = new Date()
    newDate.setHours(hour, minute, 0)
    return newDate
  }

  return null
}

export default listToValue
