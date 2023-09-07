import getFormat from '../Combo/getFormat'

// 根据value获取选中项
function getActiveKey({ value, ranges, type, currentActiveKey }) {
  // ranges不合法
  if (toString.call(ranges) !== '[object Object]') {
    return null
  }

  let fmt = 'YYYY-MM-DD'
  if (type) {
    fmt = getFormat(type)
  }
  if (!currentActiveKey) {
    // eslint-disable-next-line
    currentActiveKey = window.activeRangeKey
  }

  if (
    Array.isArray(value) &&
    value.length === 2 &&
    Object.isDate(value[0]) &&
    Object.isDate(value[1])
  ) {
    let activeKeys = []
    for (let key in ranges) {
      if (
        Array.isArray(ranges[key]) &&
        ranges[key].length === 2 &&
        ranges[key][0].format(fmt) === value[0].format(fmt) &&
        ranges[key][1].format(fmt) === value[1].format(fmt)
      ) {
        activeKeys.push(key)
      }
    }
    if (!activeKeys.length) return null

    // 如果点击项和选中项相事则使用点击项
    if (currentActiveKey && activeKeys.includes(currentActiveKey)) {
      return currentActiveKey
    }
    // 否则使用选中项的第一项
    return activeKeys[0]
  }
}

export default getActiveKey
