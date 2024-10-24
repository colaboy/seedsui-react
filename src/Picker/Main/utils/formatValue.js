import _ from 'lodash'

// 格式化值
function formatValue(value, { lists, listCount }) {
  let newValue = null
  if (!Array.isArray(value)) {
    newValue = [...Array(listCount)].map((item, slotIndex) => {
      return lists[slotIndex][0]
    })
    return newValue
  } else {
    newValue = _.cloneDeep(value)
  }

  // 如果项数少，填充数组
  if (newValue.length < listCount) {
    newValue = [...Array(listCount)].map((item, slotIndex) => {
      if (!value?.[slotIndex]) {
        return lists[slotIndex][0]
      }
      return value[slotIndex]
    })
  }
  // 如果项数多，减少数组
  else if (newValue.length > listCount) {
    newValue = newValue.slice(0, listCount)
  }

  return newValue
}

export default formatValue
