// 幂集 如:[1,2],返回[[1],[2],[1,2]]
Array.prototype.powerset = function () {
  var ps = [[]]
  for (var i = 0; i < this.length; i++) {
    for (var j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(this[i]))
    }
  }
  return ps
}

// 二维数组转为一维数组
Array.prototype.toOneColumn = function () {
  var reg = /[\d\.]+\,([\d\.]+)/g
  return this.join(',').replace(reg, '$1').split(',')
}
