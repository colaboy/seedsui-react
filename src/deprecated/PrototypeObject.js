import _ from 'lodash'

/* -------------------
判断是否是空对象
------------------- */
Object.isEmptyObject = function (obj) {
  if (obj === undefined || obj === '') return true
  if (typeof obj !== 'object') return false
  for (let n in obj) {
    if (obj.hasOwnProperty(n)) {
      return false
    }
  }
  return true
}
/* -------------------
判断是否是纯对象
------------------- */
Object.isPlainObject = function (obj) {
  let proto
  let Ctor
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
  return (
    typeof Ctor === 'function' &&
    {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call(Object)
  )
}

/* -------------------
  克隆对象字面量、Array
  ------------------- */
Object.clone = function (obj) {
  return _.cloneDeep(obj)
}

/**
 * IE11不支持, 不允许使用
 * 用于get请求,将Json参数转为params字符串
 * @param {Object} obj 格式: {key1: 'value1', key2: 'value2'}
 * @param {String} splitter 分割符, 仅在深度对象{obj: {key1: 'value1', key2: 'value2'}}或{obj: [{key1: 'value1'},{key1: 'value1'}]}时工作
 * {String} stringifyValue value用stringify返回
 * {String} bracket 用[]分割, 默认用点分割
 * @param {String} isNotEnCode 是否需要编码
 * {Boolean} true[默认] 将使用encodeURIComponent(value)
 * {Boolean} false value值原样返回
 * @return {String} 格式key1=value1&key2=value2, obj.key1=value1&obj.key2=value2, obj.0.key1=value1&obj.1.key1=value1
 */
Object.params = function (obj, splitter, isNotEnCode) {
  // 数组, 只支持一维数组[{key1: 'value1', key1: 'value1}]转为key1=value1&key1-value1
  if (obj instanceof Array) {
    let arr = []
    for (let item of obj) {
      arr.push(Object.params(item, splitter, isNotEnCode))
    }
    return arr.join('&')
  }
  // 对象
  if (!Object.isPlainObject(obj)) return obj
  if (obj instanceof Object && obj.length > 0) return ''
  // 把{obj:[{key1:'value1', key2:'value2'}]}转成obj=[{key1:'value1', key2:'value2'}]的方式
  if (splitter === 'stringifyValue') {
    let arr = []
    for (let n in obj) {
      arr.push(n + '=' + JSON.stringify(obj[n]))
    }
    return arr.join('&')
  }
  // 把{key1: 'value1', key2: 'value2'}转成key1=value1&key2=value2
  // 把{obj:[{key1:'value1'}, {key1:'value1'}]}转成obj.0.key1=value1&obj.1.key1=value1
  // 把{obj: {key1: 'value1', key2: 'value2'}}转成obj.key1=value1&obj.key2=value2
  let result = ''
  function buildParams(obj, prevKey) {
    for (let key in obj) {
      if (obj[key] instanceof Object) {
        let prefix = prevKey ? prevKey + '.' + key : key
        buildParams(obj[key], prefix)
      } else {
        if (prevKey) {
          // result += '&' + prevKey + '.' + key + '=' + obj[key]
          if (splitter !== 'bracket')
            result +=
              '&' +
              prevKey +
              '.' +
              key +
              '=' +
              (isNotEnCode ? obj[key] : encodeURIComponent(obj[key]))
          if (splitter === 'bracket')
            result +=
              '&' +
              prevKey +
              '[' +
              key +
              ']=' +
              (isNotEnCode ? obj[key] : encodeURIComponent(obj[key]))
        } else {
          // result += '&' + key + '=' + obj[key]
          result += '&' + key + '=' + (isNotEnCode ? obj[key] : encodeURIComponent(obj[key]))
        }
      }
    }
    return result
  }
  buildParams(obj)
  // 删除result第一个字符&
  if (result) {
    result = result.slice(1)
  }
  return result
}
/* Object.params = function (obj, isNotEnCode) {
  let result = ''
  let item
  for (item in obj) {
    if (isNotEnCode) result += '&' + item + '=' + obj[item]
    else result += '&' + item + '=' + encodeURIComponent(obj[item]) // 使用decodeURIComponent解码
  }
  if (result) {
    result = result.slice(1)
  }
  return result
} */

/* -------------------
获得类型, boolean | number | string | function | array | date | regexp | object | json
------------------- */
Object.type = function (obj) {
  if (!obj) {
    return obj + ''
  }
  let type = Object.prototype.toString
    .call(obj)
    .replace('[', '')
    .replace(']', '')
    .split(' ')[1]
    .toLowerCase()
  if (type === 'object') {
    let objStr = JSON.stringify(obj)
    try {
      JSON.parse(objStr)
      return 'json'
    } catch (e) {}
  }
  return type
}

/* -------------------
字符类型
------------------- */
Object.charType = function (char) {
  if (char >= 48 && char <= 57) return 'number' // 数字
  if (char >= 65 && char <= 90) return 'capitalize' // 大写
  if (char >= 97 && char <= 122) return 'lowercase'
  // 小写
  else return 'other'
}
Object.passwordLvl = function (value) {
  let mode = {}
  for (let i = 0; i < value.length; i++) {
    mode[Object.charType(value.charCodeAt(i))] = ''
  }
  let lvl = 0
  /* eslint-disable */
  for (m in mode) {
    lvl++
  }
  /* eslint-enable */
  if (value.length > 0 && value.length < 6) return 1
  return lvl
}

/* -------------------
  是否是日期
  ------------------- */
Object.isDate = function (date) {
  if (date instanceof Date === false) return false
  return String(date) !== 'Invalid Date'
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
  return obj !== null && obj === obj.window
}

/* -------------------
  继承合并
  ------------------- */
Object.extend = function () {
  let options
  let name
  let src
  let copy
  let copyIsArray
  let clone
  let target = arguments[0] || {}
  let i = 1
  let length = arguments.length
  let deep = false

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
    options = arguments[i]
    if (options !== null) {
      // 扩展基础对象
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止永无止境的循环
        if (target === copy) {
          continue
        }

        // 如果我们合并了普通的对象或数组，就会重新出现
        // eslint-disable-next-line
        if (deep && copy && (Object.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
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
}
/* -------------------
  生成唯一标识
  ------------------- */
Object.generateGUID = function () {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16) // eslint-disable-line
  })
  return uuid
}
/* -------------------
  比较两个对象是否相同
  ------------------- */
Object.equals = function (object1, object2) {
  // 用window.Object.prototype.equals在react或者vue中会默认为组件绑定此方法而报错,故不用
  // 第一个循环，只检查类型
  for (let propName in object1) {
    // 检查继承的方法和属性 - 比如.equals本身
    // 如果返回值不同，则返回false
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false
    }
    // 检查实例类型
    else if (typeof object1[propName] !== typeof object2[propName]) {
      // 不同的类型=>不等于
      return false
    }
  }
  // 现在更深入地检查使用其他对象的属性名称
  for (let propName in object2) {
    // 无论如何必须检查实例，可能有一个只存在于object2中的属性
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false
    } else if (typeof object1[propName] !== typeof object2[propName]) {
      return false
    }
    // 如果该属性是继承的，则不要再检查（如果两个对象都继承它，则必须相等）
    if (!object1.hasOwnProperty(propName)) continue

    // 现在详细检查和递归

    // 这将脚本返回到数组比较
    /** 需要Array.equals **/
    if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
      // 递归到嵌套数组中
      if (!Object.equals(object1[propName], object2[propName])) return false
    } else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
      // 递归到另一个对象中
      // console.log('递归比较 ', object1[propName],'和',object2[propName], ' 都命名 \''+propName+'\'')
      if (!Object.equals(object1[propName], object2[propName])) return false
    }
    // 字符串和数字的正常值比较
    else if (object1[propName] !== object2[propName]) {
      return false
    }
  }
  // 如果一切顺利,返回true
  return true
}

// 单位转成数字, 如: 12px返回12
Object.getUnitNum = function (unit) {
  if (typeof unit === 'number') {
    return unit
  }
  if (typeof unit !== 'string') {
    return null
  }
  return unit.toNumber()
}

// 动态加载script的方法
Object.loadScript = function (src, opts, cb) {
  if (typeof opts === 'function') {
    // eslint-disable-next-line
    cb = opts
    // eslint-disable-next-line
    opts = {}
  }
  return new Promise((resolve) => {
    const loadScript = require('./../utils/AssetUtil/loadJs/loadscript.js')
    loadScript(src, opts, (error, script) => {
      if (error) {
        resolve(null)
        if (typeof cb === 'function') cb(null)
      } else {
        resolve(script)
        if (typeof cb === 'function') cb(script)
      }
    })
  })
}

/* -------------------
SeedsUI组件: 获取参数
@params e => 事件对象
@params parameters => 其它参数, '$event'字符串将用e代替后返回
@return 若无parameters,将返回e; 若有parameters,将parameters中的'$event'替换成e后返回
------------------- */
Object.getArgs = function (e, parameters) {
  let args = parameters ? Object.clone(parameters) : parameters
  if (args !== undefined) {
    if (typeof args === 'string' && args === '$event') {
      args = e
    } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
      args[args.indexOf('$event')] = e
    }
  } else {
    args = e
  }
  return args
}

// json数据排序
Object.sortJsonKey = function (json) {
  let keys = Object.keys(json).sort()
  let newObj = {}
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    newObj[key] = json[key]
  }
  return newObj
}
