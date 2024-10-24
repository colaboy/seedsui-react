// 列表转日期
function listToValue(list, type) {
  if (type === 'year') {
    return new Date(`${list[0].id}`)
  }
  if (type === 'quarter') {
    let year = list[0].id
    let quarter = list[1].id
    let month = (quarter - 1) * 3
    return new Date(`${year}-${month + 1}-01`)
  }
  if (type === 'month') {
    let year = list[0].id
    let month = list[1].id
    return new Date(`${year}-${month}-01`)
  }
  if (type === 'date') {
    let year = list[0].id
    let month = list[1].id
    let date = list[2].id
    return new Date(`${year}-${month}-${date}`)
  }
  if (type === 'datetime') {
    let year = list[0].id
    let month = list[1].id
    let date = list[2].id
    let hour = list[3].id
    let minute = list[4].id
    return new Date(`${year}-${month}-${date} ${hour}:${minute}`)
  }
  if (type === 'time') {
    let hour = list[0].id
    let minute = list[1].id
    let date = new Date()
    date.setHours(hour, minute, 0)
    return date
  }

  return null
}

export default listToValue
