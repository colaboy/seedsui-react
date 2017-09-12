/* -------------------
  克隆对象字面量、Array
  ------------------- */
Object.clone = function (obj) {
  var copy
  if (typeof obj === 'object') {
    if (obj === null) {
      copy = null
    } else {
      if (obj instanceof Array) {
        copy = []
        for (var i = 0; i < obj.length; i++) {
          copy.push(this.clone(obj[i]))
        }
      } else {
        copy = {}
        for (var j in obj) {
          copy[j] = this.clone(obj[j])
        }
      }
    }
  } else {
    copy = obj
  }
  return copy
}

/* -------------------
  将Json转为params字符串
  ------------------- */
Object.params = function (obj, isNotEnCode) {
  var result = ''
  var item
  for (item in obj) {
    if (isNotEnCode) result += '&' + item + '=' + obj[item]
    else result += '&' + item + '=' + encodeURIComponent(obj[item])
  }
  if (result) {
    result = result.slice(1)
  }
  return result
}

/* -------------------
  解决加减乘除精度
  ------------------- */
Object.FloatOp = (function () {
  // 判断obj是否为一个整数
  function isInteger (obj) {
    return Math.floor(obj) === obj
  }

  /* -----------------------------------------------------
  将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  @param floatNum {number} 小数
  @return ret {times:100, num: 314}
  ----------------------------------------------------- */
  function toInteger (floatNum) {
    var ret = { times: 1, num: 0 }
    var isNegative = floatNum < 0
    if (isInteger(floatNum)) {
      ret.num = floatNum
      return ret
    }
    var strfi = floatNum + ''
    var dotPos = strfi.indexOf('.')
    var len = strfi.substr(dotPos + 1).length
    var times = Math.pow(10, len)
    var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
    ret.times = times
    if (isNegative) {
      intNum = -intNum
    }
    ret.num = intNum
    return ret
  }

  /* -----------------------------------------------------
  核心方法，实现加减乘除运算，确保不丢失精度
  思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）

  @param a {number} 运算数1
  @param b {number} 运算数2
  @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
  @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
  ----------------------------------------------------- */
  function operation (a, b, digits, op) {
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
        if (t1 === t2) { // 两个小数位数相同
          result = n1 + n2
        } else if (t1 > t2) { // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2)
        } else { // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2
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
    }
    if (digits && !isNaN(digits)) {
      // 精度设置
      var digitsMatch = new RegExp('[0-9]+\\.[0-9]{' + digits + '}')
      result = ('' + result).match(digitsMatch)
      return Number(result)
    }
    return result
  }

  // 加减乘除的四个接口
  function add (a, b, digits) {
    return operation(a, b, digits, 'add')
  }
  function subtract (a, b, digits) {
    return operation(a, b, digits, 'subtract')
  }
  function multiply (a, b, digits) {
    return operation(a, b, digits, 'multiply')
  }
  function divide (a, b, digits) {
    return operation(a, b, digits, 'divide')
  }
  // toFixed 修复两位小数不会四舍五入的问题
  function toFixed (num, digits) {
    var times = Math.pow(10, digits)
    var result = num * times + 0.5
    result = parseInt(result, 10) / times
    return result
  }
  // exports
  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    toFixed: toFixed
  }
})()

/* -------------------
  判断是否是纯对象
  ------------------- */
Object.isPlainObject = function (obj) {
  var proto
  var Ctor
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  proto = Object.getPrototypeOf(obj)

  // 没有原型的对象（例如`Object.create（null）`），则直接返回true
  if (!proto) {
    return true
  }

  // 如果原型的对象是由全局Object函数构造的，则它们是纯对象
  Ctor = {}.hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return typeof Ctor === 'function' && {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call(Object)
}

/* -------------------
  获得类型
  ------------------- */
Object.type = function (obj) {
  if (obj == null) {
    return obj + ''
  }

  // Support: Android <=2.3 only (functionish RegExp)
  return typeof obj === 'object' || typeof obj === 'function' ? {}[toString.call(obj)] || 'object' : typeof obj
}

/* -------------------
  是否是方法
  ------------------- */
Object.isFunction = function (obj) {
  return Object.type(obj) === 'function'
}

/* -------------------
  是否是窗口
  ------------------- */
Object.isWindow = function (obj) {
  return obj != null && obj === obj.window
}

/* -------------------
  继承合并
  ------------------- */
Object.extend = function () {
  var options
  var name
  var src
  var copy
  var copyIsArray
  var clone
  var target = arguments[0] || {}
  var i = 1
  var length = arguments.length
  var deep = false

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target

    // Skip the boolean and the target
    target = arguments[i] || {}
    i++
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !Object.isFunction(target)) {
    target = {}
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    // 只处理非空/未定义的值
    if ((options = arguments[i]) != null) {
      // 扩展基础对象
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止永无止境的循环
        if (target === copy) {
          continue
        }

        // 如果我们合并了普通的对象或数组，就会重新出现
        if (deep && copy && (Object.isPlainObject(copy) ||
          (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && Object.isPlainObject(src) ? src : {}
          }

          // 永远不要移动原始对象，克隆它们
          target[name] = Object.extend(deep, clone, copy)

          // 不要带入未定义的值
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // 返回修改后的对象
  return target
};
