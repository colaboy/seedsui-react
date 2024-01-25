/**
 * 根据value和ranges获取选中项
 * @param {Array} value
 * @param {Object} ranges
 * @param {Object} options {format: 'YYYY-MM-DD', currentActiveKey: ''}
 * @returns {Object} {id: '', value: ''}
 */
function getActiveOption(value, ranges, options) {
  // 没有值
  if (!Array.isArray(value) || value.length === 0) {
    return null
  }

  // ranges不合法
  if (toString.call(ranges) !== '[object Object]') {
    return null
  }

  let { format: fmt, currentActiveKey } = options || {}
  if (!fmt || typeof fmt !== 'string') {
    fmt = 'YYYY-MM-DD'
  }

  if (
    Array.isArray(value) &&
    value.length === 2 &&
    Object.isDate(value[0]) &&
    Object.isDate(value[1])
  ) {
    let activeKeys = []
    let customKey = ''
    for (let key in ranges) {
      // 自定义选项
      if (!Array.isArray(ranges[key])) {
        customKey = key
      }

      // 其它快捷选项
      if (
        Array.isArray(ranges[key]) &&
        ranges[key].length === 2 &&
        ranges[key][0].format(fmt) === value[0].format(fmt) &&
        ranges[key][1].format(fmt) === value[1].format(fmt)
      ) {
        activeKeys.push(key)
      }
    }

    // 快捷选项没有匹配，则选中自定义
    if (!activeKeys.length) {
      return { id: customKey, name: customKey, value: ranges[customKey] }
    }

    // 如果点击项也在选中项中，优先使用点击项
    if (currentActiveKey && activeKeys.includes(currentActiveKey)) {
      return { id: currentActiveKey, name: currentActiveKey, value: ranges[currentActiveKey] }
    }
    // 否则使用选中项的第一项
    let activeKey = activeKeys[0]
    return { id: activeKey, name: activeKey, value: ranges[activeKey] }
  }
}

export default getActiveOption
