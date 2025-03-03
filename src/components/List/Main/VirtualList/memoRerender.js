// 获取当前项在列表中的索引
const getItems = (list) => {
  if (!Array.isArray(list) || !list) return []
  let items = []
  for (let item of list) {
    if (Array.isArray(item.children) && item.children.length) {
      items = items.concat(item.children)
    } else {
      items.push(item)
    }
  }
  return items
}

// 比较列表中每一项的id是否相等
function equalId(prevItems, nextItems) {
  return prevItems.every((item, index) => item.id === nextItems[index]?.id)
}

// 比较列表
function equalItems(prevItems, nextItems) {
  // 数组长度不同刷新
  if (prevItems.length !== nextItems.length) {
    console.log('数组长度不同刷新:', prevItems.length, nextItems.length)
    return false
  }
  // id不同刷新
  if (equalId(prevItems, nextItems) === false) {
    console.log('id不同刷新', prevItems, nextItems)
    return false
  }
  // 刷新
  console.log('不刷新')
  return true
}

// 列表长度不等重新渲染页面
const memoRerender = (prevProps, nextProps) => {
  // 值比较
  let prevValue = getItems(prevProps.value)
  let nextValue = getItems(nextProps.value)
  if (equalItems(prevValue, nextValue) === false) {
    return false
  }

  // 列表比较
  let prevItems = getItems(prevProps.list)
  let nextItems = getItems(nextProps.list)
  return equalItems(prevItems, nextItems)
}

export default memoRerender
