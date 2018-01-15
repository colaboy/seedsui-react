// 幂集 如:[1,2],返回[[1],[2],[1,2]]
window.Array.prototype.powerset = function () {
  var ps = [[]]
  for (var i = 0; i < this.length; i++) {
    for (var j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(this[i]))
    }
  }
  return ps
}

// 二维数组转为一维数组
window.Array.prototype.toOneColumn = function () {
  var reg = /[\d\.]+\,([\d\.]+)/g // eslint-disable-line
  return this.join(',').replace(reg, '$1').split(',')
}

// 包含，支持传数组包含数组
window.Array.prototype.contains = function (arg) {
  if (toString.call(arg) !== '[object Array]') {
    return this.indexOf(arg) > -1
  }
  return this.filter(function (elem) {
    return arg.indexOf(elem) > -1
  }).length === arg.length
}
// 比较两个数组是否相同, 比较不了包含{x: 20}的数组
if (Array.prototype.equals) {
  console.warn('覆盖现有的Array.prototype.equals。 可能的原因：新的API定义了方法，存在框架冲突，或者在代码中包含了双重包含。')
}
window.Array.prototype.equals = function (array) {
  if (!array)
    return false

  // 比较长度可以节省很多时间
  if (this.length !== array.length)
    return false

  for (var i = 0, l = this.length; i < l; i++) {
    // 检查是否有嵌套的数组
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // 递归到嵌套数组中
      if (!this[i].equals(array[i]))
        return false
    }
    else if (this[i] !== array[i]) {
      // 警告 - 两个不同的对象实例永远不会相同：{x：20}!= {x：20}
      return false
    }
  }
  return true
}
// 从for-in循环隐藏方法
Object.defineProperty(window.Array.prototype, "equals", { enumerable: false })
