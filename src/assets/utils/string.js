// 转为json，目的是字符串去重
window.String.prototype.toJson = function (split) {
  var array = this.split(split)
  var json = {}
  for (var i in array) {
    var ary = array[i]
    json[ary] ? (json[ary]++) : (json[ary] = 1)
  }
  return json
};

// 去除字符串左右两端的空格
window.String.prototype.trim = function (trimPos) {
  if (trimPos === 'left') {
    return this.replace(/(^\s*)/g, '')
  } else if (trimPos === 'right') {
    return this.replace(/(\s*$)/g, '')
  }
  return this.replace(/(^\s*)|(\s*$)/g, '')
};