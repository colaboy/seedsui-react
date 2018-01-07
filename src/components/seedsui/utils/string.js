// 转为json，目的是字符串去重
window.String.prototype.toJson = function (split) {
  var array = this.split(split)
  var json = {}
  for (var i in array) {
    var ary = array[i]
    json[ary] ? (json[ary]++) : (json[ary] = 1)
  }
  return json
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
  var idExpr = /^#([\w-]*)$/ // 匹配id(#id)
  var match = idExpr.exec(this)
  if(!match || !match[1]){
    return false
  }
  return true
}

// 判断是否包含class名称
window.String.prototype.hasClass = function (name) {
  var names = this.split(' ')
  for (var i = 0; i < names.length; i++) {
    if (names[i] === name) return true
  }
  return false
}

// 清除img字符串的"https:"和"http:", 例如‘<img src="http:’转换后‘<img src="’
window.String.prototype.clearImgScheme = function () {
  return this.replace(/<img\s+src="https:/gim, '<img src="').replace(/<img\s+src="http:/gim, '<img src="')
}
// 清除字符串的"https:"和"http:"
window.String.prototype.clearScheme = function () {
  return this.replace(/https:/gim, '').replace(/http:/gim, '')
}

/* -------------------
  query条件判断
  ------------------- */
window.String.prototype.isQueryId = function () {
  var idExpr = /^#([\w-]*)$/
  var match = idExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
window.String.prototype.isQueryClass = function () {
  var classExpr = /^\.([\w-]*)$/
  var match = classExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
window.String.prototype.isTag = function () {
  var tagExpr = /^<(\w+)\s*.*\/\w*>$/im
  var match = tagExpr.exec(this)
  if (match && match.length > 0) {
    return true
  }
  return false
}
