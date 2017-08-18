// 克隆对象字面量、Array
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
};
// 将Json转为params字符串
Object.params = function (obj) {
  var result = ''
  var item
  for (item in obj) {
    result += '&' + item + '=' + encodeURIComponent(obj[item])
  }
  if (result) {
    result = result.slice(1)
  }
  return result
};