// 开始结束时间
function getDates(value) {
  if (
    !Array.isArray(value) ||
    value.length !== 2 ||
    Object.isDate(value[0]) === false ||
    Object.isDate(value[1]) === false
  ) {
    console.warn(
      'DatePicker.RangeModal: Wrong parameter with "value"! You need to correct for [new Date(), new Date()]',
      value
    )
    return {
      startDate: null,
      endDate: null
    }
  }
  let startDate = Object.isDate(value[0]) ? value[0] : null
  let endDate = Object.isDate(value[1]) ? value[1] : null

  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default getDates
