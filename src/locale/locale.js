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
  let localeData = window.localeData
  // 如果没有参数, 则返回国际化数据
  if (Array.from(arguments).length === 0) {
    return localeData
  }
  // 渲染国际化数据中对应的值
  if (key && localeData) {
    let value = localeData[key]

    // 没有对应值，或者值不是字符串类型，则返回remark
    if (!value || typeof value !== 'string') {
      return Interpolate.remark(remark, dangerouslyHTML)
    }

    // 构建变量映射: 将[variable0, variable1]转换成{'0': variable0, '1': variable1}
    let variableMap = {}
    if (variable && Array.isArray(variable) && variable.length) {
      for (let [index, variableItem] of variable.entries()) {
        variableMap[`${index}`] = variableItem
      }
    }

    // 将variableMap替换value的值中的变量{0}、{1}等
    return Interpolate.variable(value, variableMap, dangerouslyHTML)
  }
  // 没有国际化的值, 则渲染remark
  if (remark) return Interpolate.remark(remark, dangerouslyHTML)
  return ''
}
