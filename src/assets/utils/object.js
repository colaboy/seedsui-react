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

          // 永远不要修改原始对象，而是克隆它们
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
