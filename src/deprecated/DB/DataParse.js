// 数据存入时使用字符串, 回显时使用原数据类型
const DataParse = {
  // 入库
  stringify: function (val) {
    if (typeof val === 'number') {
      return '_number:' + val.toString()
    }
    if (typeof val === 'boolean') {
      return '_boolean:' + val.toString()
    }
    // 因为数字和boolean类型非判断有问题, 所以非判断放到下面
    if (!val) {
      return ''
    }
    if (typeof val === 'string') {
      return val
    }
    if (val instanceof Function) {
      return '_function:' + val.toString()
    }
    if (val instanceof Object) {
      return '_json:' + JSON.stringify(val)
    }
    return ''
  },
  // 出库
  parse: function (val) {
    if (!val || typeof val !== 'string') {
      return val
    }
    if (val.indexOf('_number:') === 0) {
      return Number(val.replace(/^_number:/, ''))
    }
    if (val.indexOf('_boolean:') === 0) {
      return val.replace(/^_boolean:/, '') === 'true'
    }
    if (val.indexOf('_function:') === 0) {
      return val.replace(/^_function:/, '')
    }
    if (val.indexOf('_json:') === 0) {
      return JSON.parse(val.replace(/^_json:/, ''))
    }
    return val
  }
}
export default DataParse
