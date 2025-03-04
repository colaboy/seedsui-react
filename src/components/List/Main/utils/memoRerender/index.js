import flattenList from './flattenList'
import equalItems from './equalItems'

// 暂时不使用, 会导致children里的Loading以及错误信息等不更新
// Rerender if value or list changes
const memoRerender = (prevProps, nextProps) => {
  // Equal value
  let prevValue = flattenList(prevProps.value)
  let nextValue = flattenList(nextProps.value)
  if (equalItems(prevValue, nextValue) === false) {
    return false
  }

  // Equal list
  let prevItems = flattenList(prevProps.list)
  let nextItems = flattenList(nextProps.list)
  return equalItems(prevItems, nextItems)
}

export default memoRerender
