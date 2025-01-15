// 提取数值
function extractNumber(str) {
  if (typeof str === 'number') {
    return str
  }
  if (typeof str !== 'string') {
    return null
  }

  let match = str.match(/^([+-]?(0|([1-9][0-9]*))(\.[0-9]+)?)/gim)
  if (match && match[0]) {
    return Number(match[0])
  }

  return null
}

export default extractNumber
