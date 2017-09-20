// SafeLvl 密码安全级别
var SafeLvl = {
  // 字符类型
  charMode: function (char) {
    if (char >= 48 && char <= 57) return 'number' // 数字
    if (char >= 65 && char <= 90) return 'capitalize' // 大写
    if (char >= 97 && char <= 122) return 'lowercase' // 小写
    else return 'other'
  },
  // 密码强度检测
  check: function (value) {
    var mode = {}
    for (var i = 0; i < value.length; i++) {
      mode[this.charMode(value.charCodeAt(i))] = ''
    }
    var lvl = 0
    /* eslint-disable */
    for (m in mode) {
      lvl++
    }
    /* eslint-enable */
    return lvl
  }
};

//export default SafeLvl
