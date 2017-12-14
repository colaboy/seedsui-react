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

// 生成唯一标识符
window.String.GUID = function () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16) // eslint-disable-line
  })
  return uuid
}
