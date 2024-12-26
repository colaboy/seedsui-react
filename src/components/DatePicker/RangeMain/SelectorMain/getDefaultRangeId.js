// 内库使用-start
import DateUtil from './../../../../DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'seedsui-react'
测试使用-end */

/**
 * 根据value和ranges获取选中项
 * @param {Array} value
 * @param {Object} ranges
 * @param {String} type // year | quarter | month | date | time | datetime
 * @returns {Object} {id: '', value: ''}
 */
function getDefaultRangeId(value, ranges, type) {
  // 没有值
  if (!Array.isArray(value) || value.length !== 2) {
    return null
  }

  // ranges不合法
  if (toString.call(ranges) !== '[object Object]') {
    return null
  }

  let activeIds = []
  let customId = ''
  for (let id in ranges) {
    // 自定义选项
    if (!Array.isArray(ranges[id])) {
      customId = id
    }

    // 其它快捷选项
    if (
      Array.isArray(ranges[id]) &&
      ranges[id].length === 2 &&
      DateUtil.format(ranges[id][0], type) === DateUtil.format(value[0], type) &&
      DateUtil.format(ranges[id][1], type) === DateUtil.format(value[1], type)
    ) {
      activeIds.push(id)
    }
  }

  // 快捷选项没有匹配，则选中自定义
  if (!activeIds.length) {
    return customId
  }

  // 否则使用选中项的第一项
  return activeIds[0]
}

export default getDefaultRangeId
