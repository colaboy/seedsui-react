// 获取当前季度
function getQuarter(date) {
  if (date instanceof Date === false) {
    return undefined
  }
  return Math.ceil((date.getMonth() + 1) / 3)
}

export default getQuarter
