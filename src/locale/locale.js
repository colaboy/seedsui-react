import Interpolate from './Interpolate'

/**
 * 国际化函数
 * @param {String} remark 用于没有key时将直接显示remark
 * @param {String} key 将从国际化文件中获取此key的值
 * @param {Array} variable 替换值中的变量{0}{1}, 数组中支持String|String<html>|Number|Node类型
 * @param {Boolean} dangerouslyHTML 变量是否需要将变量html字符串转换成reactDOM显示
 * @return {Node} 返回reactDOM
 */
// eslint-disable-next-line
export default function (remark, key, variable, dangerouslyHTML) {
  let locale = window.localeData
  // 如果没有参数, 则返回国际化数据
  if (Array.from(arguments).length === 0) {
    return locale
  }
  // 渲染国际化数据中对应的值
  if (key && locale) {
    let value = locale[key]
    // 构建变量映射: 将[variable0, variable1]转换成{'0': variable0, '1': variable1}
    let variableMap = {}
    if (value && variable && Array.isArray(variable) && variable.length) {
      for (let [index, variableItem] of variable.entries()) {
        variableMap[`${index}`] = variableItem
      }
    }

    // key的值value必须为string类型
    if (typeof value === 'string') {
      return Interpolate.variable(value, variableMap, dangerouslyHTML)
    }
  }
  // 没有国际化的值, 则渲染remark
  if (remark) return Interpolate.remark(remark, dangerouslyHTML)
  return ''
}
