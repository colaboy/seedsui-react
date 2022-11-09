import locale from './locale' // 国际化

/* -------------------
解决加减乘除精度
------------------- */
Math.Calc = (function () {
  /* -----------------------------------------------------
  将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  @param (argNum: {number} 小数, argDigits: {number} 截取小数位, round: {bool} 是否四舍五入 默认为true)
  @return result {times:100, num: 314}
  ----------------------------------------------------- */
  function toInteger(argNum, argDigits, round) {
    var result = { times: 1, num: 0 }
    var argNumStr = argNum + ''
    if (argNumStr.indexOf('.') === -1) {
      result.num = argNum
      return result
    }
    var digits = isNaN(argDigits) ? argNumStr.substr(argNumStr.indexOf('.') + 1).length : argDigits // 小数位数
    var times = Math.pow(10, digits)
    var num = parseInt(Math.abs(argNum) * times + (round === false ? 0 : 0.5), 10) // 转成整数,并且小数位四舍五入
    var isNegative = argNum < 0 // 是否是负数
    result.times = times
    result.num = isNegative ? -num : num
    return result
  }

  /* -----------------------------------------------------
  核心方法，实现加减乘除运算，确保不丢失精度
  思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）

  @param a {number} 运算数1
  @param b {number} 运算数2
  @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
  @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
  ----------------------------------------------------- */
  function operation(a, b, digits, op) {
    var o1 = toInteger(a)
    var o2 = toInteger(b)
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
    if (digits && !isNaN(digits)) {
      // 精度设置
      return result.toFixed(digits)
    }
    return result
  }

  // 加减乘除的四个接口
  function add(a, b, digits) {
    return operation(a, b, digits, 'add')
  }
  function subtract(a, b, digits) {
    return operation(a, b, digits, 'subtract')
  }
  function multiply(a, b, digits) {
    return operation(a, b, digits, 'multiply')
  }
  function divide(a, b, digits) {
    return operation(a, b, digits, 'divide')
  }
  // toFixed 修复旧浏览器0.07.toFixed(1) => 0.0不会四舍五入的问题
  function toFixed(argNum, argDigits, fixed, round) {
    var result = toInteger(argNum, argDigits, round)
    if (fixed) return (result.num / result.times).toFixed(argDigits)
    return result.num / result.times
  }
  // 转换为千分位字符
  function toThousandth(num) {
    if (!num || isNaN(num)) return '0'
    let sExpr = /^([+-]?\d+)((\.\d+)?)$/
    let numStr = typeof num === 'number' ? num.toString() : num
    let n1 = numStr.toString().replace(sExpr, function (s, s1, s2) {
      let reExpr = /[+-]?\d{1,3}(?=(\d{3})+$)/g
      return s1.replace(reExpr, '$&,') + s2
    })
    return n1
  }
  // 矫正数字, 常用于输入过程中矫正, 可以为空串, valid为true时将校验为合法的数字: 001将转成1返回
  function correctNumber(argNumstr, options) {
    const { max, min, digits, maxLength, required, fail, valid = true } = options || {}
    if (argNumstr === '' || isNaN(argNumstr) || min - max >= 0) {
      // 非空校验
      if (required) return min ? '' + min : '0'
      return ''
    }
    var value = String(argNumstr || '')
    // 最大值
    if (!isNaN(max) && value - max > 0) {
      // callback fail
      if (fail) fail({ errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + max })
      return '' + max
    }
    // 最小值
    if (!isNaN(min) && value - min < 0) {
      // callback fail
      if (fail) fail({ errMsg: locale('不能小于', 'hint_cannot_be_less_than') + min })
      return '' + min
    }
    // 截取小数位数
    if (!isNaN(digits)) {
      if (value.indexOf('.') !== -1 && digits - 0 >= 0 && digits.toString().indexOf('.') === -1) {
        if (digits - 0 === 0) {
          // 整数
          value = value.substring(0, value.indexOf('.'))
        } else {
          // 小数
          value = value.substring(0, value.indexOf('.') + Number(digits) + 1)
        }
      }
    }
    // 最大长度限制
    if (maxLength && value && value.length > maxLength) {
      value = value.substring(0, maxLength)
    }
    // 转成Number类型, 把001转成1; 小数不能转, 因为输入到1.0的情况会转成1
    if (valid && value.indexOf('.') === -1) {
      return '' + Number(value)
    }
    return '' + value
  }
  // 矫正手机号码, 用于输入过程中矫正
  function correctPhone(argPhone, options) {
    const { fail } = options
    let value = argPhone
    // 如果输入的不是一个正整数，则转为正整数
    if (isNaN(value)) {
      const result = value.match(/[0-9]{1,}/)
      if (result) value = result[0]
      else value = ''
      // callback fail
      if (fail) fail({ errMsg: locale('必须要输入数字哦', 'hint_must_number') })
    }
    return value
  }
  // exports
  return {
    add: add, // 解决运算中1.22+1不等于2.22的问题
    subtract: subtract, // 解决运算中1.22-1不等于0.22的问题
    multiply: multiply,
    divide: divide,
    toFixed: toFixed,
    toThousandth: toThousandth,
    correctNumber: correctNumber,
    correctPhone: correctPhone
  }
})()
