// 转为json，目的是字符串去重
window.String.prototype.toJson = function (split) {
  var array = this.split(split)
  var json = {}
  for (var i in array) {
    var ary = array[i]
    json[ary] ? json[ary]++ : (json[ary] = 1)
  }
  return json
}
function left_zero_4(str) {
  if (str && str.length === 2) {
    return '00' + str
  }
  return str
}
// 转为ASCII编码
window.String.prototype.toASCII = function () {
  var value = ''
  for (var i = 0; i < this.length; i++) {
    value += '\\u' + left_zero_4(parseInt(this.charCodeAt(i), 10).toString(16))
  }
  return value
}
window.String.prototype.fromASCII = function () {
  return this.replace(/(\\u)(\w{1,4})/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%5Cu)(\w{1,4})/g, '$2'), 16))
  })
}
// 转为unicode编码
window.String.prototype.toUnicode = function () {
  var value = ''
  for (var i = 0; i < this.length; i++) value += '&#' + this.charCodeAt(i) + ';'
  return value
}
window.String.prototype.fromUnicode = function () {
  return this.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, '$2'), 16))
  })
}
// 转为UTF8编码
window.String.prototype.toUTF8 = function () {
  var value = ''
  for (var i = 0; i < this.length; i++) {
    value += '&#x' + left_zero_4(parseInt(this.charCodeAt(i), 10).toString(16)) + ';'
  }
  return value
}
window.String.prototype.fromUTF8 = function () {
  return this.replace(/(&#)(\d{1,6});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, '$2'), 10))
  })
}
// 转为URI编码
window.String.prototype.toURI = function () {
  return encodeURI(this)
}
window.String.prototype.fromURI = function () {
  return decodeURI(this)
}
// 转为URI全编码
window.String.prototype.toURIComponent = function () {
  return encodeURIComponent(this)
}
window.String.prototype.fromURIComponent = function () {
  return decodeURIComponent(this)
}
// 地址栏编码,地址栏不允许有一些特殊字符,例如%,可用此方法规避此问题
window.String.prototype.encode = function () {
  return this.toASCII()
}
window.String.prototype.decode = function () {
  return this.fromASCII()
}

// 去除字符串左右两端的空格
window.String.prototype.trim = function (trimPos) {
  if (trimPos === 'left') {
    return this.replace(/(^\s*)/g, '')
  } else if (trimPos === 'right') {
    return this.replace(/(\s*$)/g, '')
  }
  return this.replace(/(^\s*)|(\s*$)/g, '')
}

// 判断是否是#的形式
window.String.prototype.isQueryId = function () {
  if (!this.length) return false
  var idExpr = /^#([\w-]*)$/ // 匹配id(#id)
  var match = idExpr.exec(this)
  if (!match || !match[1]) {
    return false
  }
  return true
}
// 判断是否是合法的日期 YYYY-MM-DD
window.String.prototype.isDate = function (dateSplit) {
  return new RegExp(`^[0-9]{4}${dateSplit || '-'}[0-9]{2}${dateSplit || '-'}[0-9]{2}$`).test(this)
}
// 判断是否是合法的年份 yyyy
window.String.prototype.isYear = function () {
  return new RegExp(`^[0-9]{4}$`).test(this)
}
// 判断是否是合法的月份 yyyy-QQ
window.String.prototype.isQuarter = function (dateSplit) {
  return new RegExp(`^[0-9]{4}${dateSplit || '-'}[1-4]{1}$`).test(this)
}
// 判断是否是合法的月份 yyyy-MM
window.String.prototype.isMonth = function (dateSplit) {
  return new RegExp(`^[0-9]{4}${dateSplit || '-'}[0-9]{2}$`).test(this)
}
// 判断是否是日期格式 YYYY-MM-DD hh:mm:ss 或 YYYY-MM-DD hh:mm
window.String.prototype.isDateTime = function (dateSplit, timeSplit) {
  return new RegExp(
    `^[0-9]{4}${dateSplit || '-'}[0-9]{2}${dateSplit || '-'}[0-9]{2}\\s[0-9]{2}${
      timeSplit || ':'
    }[0-9]{2}(${timeSplit || ':'}[0-9]{2})?$`
  ).test(this)
}
// 判断是否是时间格式 hh:mm 或 hh:mm:ss
window.String.prototype.isTime = function (timeSplit) {
  return new RegExp(`^[0-9]{2}${timeSplit || ':'}[0-9]{2}(${timeSplit || ':'}[0-9]{2})?$`).test(
    this
  )
}
// 转换成日期
window.String.prototype.toDate = function (dateSplit, timeSplit, now) {
  var date = new Date()
  var dateStrArr = [date.getFullYear(), date.getMonth(), 1]
  var timeStrArr = [0, 0, 0]
  let tempDateStrArr = null
  let tempTimeStrArr = null
  if (now) {
    dateStrArr = [date.getFullYear(), date.getMonth(), date.getDate()]
    timeStrArr = [date.getHours(), date.getMinutes(), date.getSeconds()]
  }
  if (this.isYear()) {
    dateStrArr[0] = this
  } else if (this.isQuarter(dateSplit)) {
    tempDateStrArr = this.split(dateSplit || '-')
    dateStrArr[0] = tempDateStrArr[0]
    dateStrArr[1] = tempDateStrArr[1]
  } else if (this.isMonth(dateSplit)) {
    tempDateStrArr = this.split(dateSplit || '-')
    dateStrArr[0] = tempDateStrArr[0]
    dateStrArr[1] = tempDateStrArr[1]
  } else if (this.isDate(dateSplit)) {
    dateStrArr = this.split(dateSplit || '-')
  } else if (this.isDateTime(dateSplit, timeSplit)) {
    tempDateStrArr = this.split(dateSplit || '-')
    tempTimeStrArr = tempDateStrArr[2].split(' ')[1].split(timeSplit || ':')
    dateStrArr[0] = tempDateStrArr[0]
    dateStrArr[1] = tempDateStrArr[1]
    dateStrArr[2] = tempDateStrArr[2].split(' ')[0]
    timeStrArr[0] = tempTimeStrArr[0]
    timeStrArr[1] = tempTimeStrArr[1]
    timeStrArr[2] = tempTimeStrArr[2] || timeStrArr[2]
  } else if (this.isTime(timeSplit)) {
    tempTimeStrArr = this.split(timeSplit || ':')
    timeStrArr[0] = tempTimeStrArr[0]
    timeStrArr[1] = tempTimeStrArr[1]
    timeStrArr[2] = tempTimeStrArr[2] || timeStrArr[2]
  }
  date.setYear(dateStrArr[0])
  date.setMonth(dateStrArr[1] - 1, dateStrArr[2])
  date.setHours(timeStrArr[0], timeStrArr[1], timeStrArr[2])
  return date
}
// 判断是否包含class名称
window.String.prototype.hasClass = function (name) {
  var classStr = this
  if (this.indexOf('class=') > -1) {
    var res = classStr.match(/class=["'](.*)["']/)
    if (res[1]) {
      classStr = res[1]
    } else {
      classStr = ''
    }
  }
  var names = classStr.split(' ')
  for (var i = 0; i < names.length; i++) {
    if (names[i] === name) return true
  }
  return false
}
// 添加class名称
window.String.prototype.addClass = function (name) {
  var str = String(this)
  var className = 'class="' + name + '"'
  if (this.indexOf('class=') > -1) {
    // 如果有class,并且class名称不存在,则增加class
    var res = this.match(/class=["'](.*)["']/)
    if (res[1] && !res[1].hasClass(name)) {
      // 新增class不存在,则新增
      className = 'class="' + res[1] + ' ' + name + '"'
      str = str.replace(/class=["'](.*)["']/, className)
      return str
    }
    return str
  } else {
    // 如果没有class,则创建一个class
    res = str.match(/<\w+/)
    if (res[0]) {
      return str.replace(/<\w+/, res[0] + ' ' + className)
    }
    return str
  }
}

// 清除img字符串的"https:"和"http:", 例如‘<img src="http:’转换后‘<img src="’
window.String.prototype.clearImgProtocol = function () {
  return this.replace(/<img\s+src="https:/gim, '<img src="').replace(
    /<img\s+src="http:/gim,
    '<img src="'
  )
}

// 清除字符串的"https:"和"http:"
window.String.prototype.clearProtocol = function () {
  return this.replace(/https:/gim, '').replace(/http:/gim, '')
}

// 判断是否是queryId
window.String.prototype.isQueryId = function () {
  if (!this.length) return false
  var idExpr = /^#([\w-]*)$/
  var match = idExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
// 判断是否是queryClass
window.String.prototype.isQueryClass = function () {
  if (!this.length) return false
  var classExpr = /^\.([\w-]*)$/
  var match = classExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
// 判断是否是query标签
window.String.prototype.isTag = function () {
  if (!this.length) return false
  var tagExpr = /^<(\w+)\s*.*\/\w*>$/im
  var match = tagExpr.exec(this)
  if (match && match.length > 0) {
    return true
  }
  return false
}

// 密码等级
String.charType = function (char) {
  // 数字
  if (char >= 48 && char <= 57) return 'number'
  // 大写
  if (char >= 65 && char <= 90) return 'capitalize'
  // 小写
  if (char >= 97 && char <= 122) return 'lowercase'
  else return 'other'
}
window.String.prototype.safeLvl = function () {
  if (this.length > 0 && this.length < 6) return 1
  var mode = {}
  for (var i = 0; i < this.length; i++) {
    mode[String.charType(this.charCodeAt(i))] = ''
  }
  return Object.values(mode).length
}
// 英文占位长度, limit为截取长度, character为数字、大写字母等其它类型的自定义比例
window.String.prototype.enLength = function (limit, character) {
  let strlen = 0
  let str = '' // 用于构建截取后的字符串
  for (let i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 255) {
      // 长度判断: 如果是汉字，则字符串占用字节数加2
      strlen += 2
    } else if (
      character &&
      character.type === 'number' &&
      this.charCodeAt(i) >= 48 &&
      this.charCodeAt(i) <= 57
    ) {
      // 自定义长度比例: 如果是数字，则字符串占用字节数加1.3
      strlen += character.scale || 1.3
    } else if (
      character &&
      character.type === 'uppercase' &&
      this.charCodeAt(i) >= 65 &&
      this.charCodeAt(i) <= 90
    ) {
      // 自定义长度比例: 如果是大写英文字母，则字符串占用字节数加1.3
      strlen += character.scale || 1.3
    } else {
      strlen++
    }
    // 字符串构建
    str += this[i]
    if (strlen === limit) {
      return str
    }
    if (strlen > limit) {
      return str.substring(0, str.length - 1)
    }
  }
  // 如果设置了截取长度, 则返回字符串
  if (limit) {
    return this.toString()
  }
  // 返回长度
  return strlen
}

// 没有换行符的文字换行, limit每页条数
window.String.prototype.brRow = function (limit, character) {
  if (!limit) return [this.toString()]
  let page = 1
  let rows = limit

  // 分页列表
  let list = []
  // 长度数量
  let count = 0
  // 字符串的开始和结束截取位置
  let start = 0
  let end = 0
  // 存储没有还满足分页条件时的字符串
  let temp = ''
  for (let i = 0; i < this.length; i++) {
    // 长度判断: 如果是汉字，则字符串占用字节数加2
    if (this.charCodeAt(i) > 255) {
      count += 2
    } else if (
      character &&
      character.type === 'number' &&
      this.charCodeAt(i) >= 48 &&
      this.charCodeAt(i) <= 57
    ) {
      // 自定义长度比例: 如果是数字，则字符串占用字节数加1.3
      count += character.scale || 1.3
    } else if (
      character &&
      character.type === 'uppercase' &&
      this.charCodeAt(i) >= 65 &&
      this.charCodeAt(i) <= 90
    ) {
      // 自定义长度比例: 如果是大写英文字母，则字符串占用字节数加1.3
      count += character.scale || 1.3
    } else {
      count++
    }
    // 存储剩余不足一页的部分
    temp = this.substring(end)
    // 长度数量大于分页时开始分页, 例如: rows为2个字符为一页, count3时则开始分页, substring(0, 2), 但这样仅截取了两位, 还多一位
    if (count > page * rows) {
      // 结束位置就是游标i
      end = i
      // 存储剩余不足一页的部分
      temp = this.substring(end)
      // 此条字符串
      let rowStr = this.substring(start, end)
      if (rowStr) list.push(rowStr)
      // 开始位置从此页的结束位置开始
      start = i
      page++
    }
  }
  // 如果有没有满足分页条件的剩余字符串时, 加入到list中去
  if (temp) list.push(temp)

  // 返回分页后的结果
  if (!list.length) return [this.toString()]
  return list
}

// 文字换行
window.String.prototype.br = function (limit, character) {
  // 先对br换行
  var brList = this.split(new RegExp('(\\r|\\n|\\r\\n)', 'g'))
  if (!brList || !brList.length) brList = [this.toString()]
  var list = []
  for (let item of brList) {
    let rowList = item.brRow(limit, character)
    // 遍历一条字符返回的分页列表
    for (let rowItem of rowList) {
      // 过滤换行符和空值
      let match = rowItem.match(new RegExp('(\\r|\\n|\\r\\n)', 'g'))
      if (rowItem && !match) {
        list.push(rowItem)
      }
    }
  }

  return list
}

// 取出单位中的数字, 如12px, 返回12
window.String.prototype.toNumber = function () {
  var match = this.match(/^([+-]?(0|([1-9][0-9]*))(\.[0-9]+)?)/gim)
  if (match && match[0]) {
    return Number(match[0])
  }
  return null
}

// 取出文件后缀名
window.String.prototype.getSuffix = function () {
  if (this.indexOf('.') === -1) return ''
  let suffix = this.substring(this.lastIndexOf('.') + 1, this.length)
  if (!suffix) return ''
  if (suffix.indexOf('?') !== -1) {
    suffix = suffix.substring(0, suffix.indexOf('?'))
  }
  return suffix
}
