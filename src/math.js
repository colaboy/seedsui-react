/**
 * 数字千分位/小数位补充两位
 * @param {Number} number
 * @param {Boolean} decimalThousands 小数是否需要千分位
 */
function thousands(number, decimalThousands) {
  // 小数位也要千分位
  if (decimalThousands) {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  // 小数位不要千分位
  let parts = String(number).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 小数四舍五入 fixed(1.005, 2) = 1.00
 * @param {Number} number
 * @param {Number} precision
 * @returns
 */
function fixed(number, precision) {
  let numStr = String(number)
  let decimalIndex = numStr.indexOf('.')
  if (decimalIndex !== -1) {
    // Truncate to specified number of decimal places
    numStr = numStr.substring(0, decimalIndex + precision + 1)
  }
  return numStr
}

/**
 * 小数四舍五入 round(1.005, 2) = 1.01
 * @param {Number} number
 * @param {Number} precision
 * @returns
 */
function round(number, precision) {
  return Math.round(+number + 'e' + precision) / Math.pow(10, precision)
}

/**
 * 数字精度丢失
 * @param {Number} number
 * @param {Number} precision
 * @returns
 */
function strip(number, precision = 12) {
  return +parseFloat(number.toPrecision(precision))
}

/**
 * 反千分位
 * @param {Number} number
 * @returns
 */
function antiThousands(number) {
  return `${number || ''}`.replace(/,/g, '')
}

export default { round, fixed, strip, thousands, antiThousands }
