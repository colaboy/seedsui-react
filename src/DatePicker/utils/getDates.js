// 开始结束时间
function getDates(value) {
  if (
    !Array.isArray(value) ||
    value.length !== 2 ||
    value[0] instanceof Date === false ||
    value[1] instanceof Date === false
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
  let startDate = value[0] instanceof Date ? value[0] : null
  let endDate = value[1] instanceof Date ? value[1] : null
  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default getDates
