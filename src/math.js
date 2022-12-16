/**
 * 倍数取整, 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100, 返回{times: 100, num: 314}
 * @param {Number|Object} props 需要转换的数值
 * @param {Number} num 需要转换的数值
 * @param {Number} precision 自定义精度, 默认使用小数的精度
 * @param {Boolean} type 取整类型: round四舍五入, floor向下取整, ceil向上取整
 */
function timesInteger(props) {
  let { num, precision, type } = props || {}
  // 允许传数值或者
  if (typeof props === 'object') {
  } else if (typeof props === 'number') {
    num = props
  } else {
    return { times: 1, num: NaN }
  }

  // 没有小数位直接返回整数
  let result = { times: 1, num: 0 }
  let numStr = num + ''
  if (numStr.indexOf('.') === -1) {
    result.num = num
    return result
  }

  // 精度
  precision = isNaN(precision)
    ? numStr.substring(numStr.indexOf('.') + 1).length
    : Number(precision)

  // 倍数
  let times = Math.pow(10, precision)
  // 转成整数,向下+0, 四舍五入+0.5, 向上取整+0.9
  let typeCalcNum = 0
  if (type === 'round') {
    typeCalcNum = 0.5
  } else if (type === 'ceil') {
    typeCalcNum = 0.9
  }

  // 判断是否是负数
  let isNegative = num < 0

  // 计算倍数与取整
  num = parseInt(Math.abs(num) * times + typeCalcNum)
  result.times = times

  // 负数则返回负数
  result.num = isNegative ? -num : num
  return result
}

/**
* 将一个浮点数转成整数，如结果为3.14 >> 314，倍数是100, 返回314/100
@param {Number} a 运算数1
@param {Number} b 运算数2
@param {String} op 运算类型，有加减乘除（add/subtract/multiply/divide）
*/
function operation(a, b, op) {
  var o1 = timesInteger(a)
  var o2 = timesInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  switch (op) {
    case 'add':
      if (t1 === t2) {
        // 两个小数位数相同
        result = Number(n1) + Number(n2)
      } else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = Number(n1) + Number(n2 * (t1 / t2))
      } else {
        // o1 小数位 小于 o2
        result = Number(n1 * (t2 / t1)) + Number(n2)
      }
      result = result / max
      break
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      result = result / max
      break
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      break
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      break
    default:
      result = 0
  }
  return result
}

/**
 * 补小数精度
 * @param {Number} num 原数值
 * @param {Number} precision 需要补充的精度
 */
function padPrecision(num, precision) {
  // 参数不合法直接返回数值
  if (typeof num !== 'number' || typeof precision !== 'number') {
    return num
  }
  if (precision <= 0) {
    return num
  }

  let numLen = 0
  let numStr = num + ''
  // 整数需要补充小数点, 并计算总位数
  if (numStr.indexOf('.') === -1) {
    numStr = numStr + '.'
    numLen = numStr.length + precision
  }
  // 小数需要计算总位数
  else {
    numLen = numStr.split('.')[0].length + 1 + precision
  }
  // 补充0(只会在长度不足时补充), 数值小于总位数时不会截取, 所以需要截取
  return numStr.padEnd(numLen, '0').substring(0, numLen)
}

// 加减乘除的四个接口
function add(a, b) {
  return operation(a, b, 'add')
}
function subtract(a, b) {
  return operation(a, b, 'subtract')
}
function multiply(a, b) {
  return operation(a, b, 'multiply')
}
function divide(a, b) {
  return operation(a, b, 'divide')
}

// 截取小数位, 向上取整
function ceil(num, precision, props) {
  var result = timesInteger({ num: num, precision: precision, type: 'ceil' })
  // 默认保留小数
  if (props?.padPrecision === false) {
    return result.num / result.times
  }
  return padPrecision(result.num / result.times, precision)
}

// 截取小数位, 向下取整
function floor(num, precision, props) {
  var result = timesInteger({ num: num, precision: precision, type: 'floor' })
  // 默认保留小数
  if (props?.padPrecision === false) {
    return result.num / result.times
  }
  return padPrecision(result.num / result.times, precision)
}

// 截取小数位, 修复旧浏览器0.07.toFixed(1) => 0.0不会四舍五入的问题
function round(num, precision, props) {
  var result = timesInteger({ num: num, precision: precision, type: 'round' })
  // 默认保留小数
  if (props?.padPrecision === false) {
    return result.num / result.times
  }
  return padPrecision(result.num / result.times, precision)
}

// 转换为千分位字符
function thousands(num) {
  if (!num || isNaN(num)) return '0'
  let sExpr = /^([+-]?\d+)((\.\d+)?)$/
  let numStr = typeof num === 'number' ? num.toString() : num
  let n1 = numStr.toString().replace(sExpr, function (s, s1, s2) {
    let reExpr = /[+-]?\d{1,3}(?=(\d{3})+$)/g
    return s1.replace(reExpr, '$&,') + s2
  })
  return n1
}

// 千分位字符转数值
function antiThousands(num) {
  return `${num || ''}`.replace(/,/g, '')
}

// exports
export default {
  // 倍数转整
  timesInteger,
  // 补精度
  padPrecision,
  // 加减乘除
  add,
  subtract,
  multiply,
  divide,
  // 精度控制
  round,
  floor,
  ceil,
  // 千分位
  thousands,
  antiThousands
}
