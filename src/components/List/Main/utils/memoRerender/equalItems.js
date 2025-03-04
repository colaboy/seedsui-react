import equalItemsId from './equalItemsId'

// 比较列表
function equalItems(prevItems, nextItems) {
  if ((prevItems || '') === (nextItems || '')) {
    return true
  }

  // 数组长度不同刷新
  if (prevItems.length !== nextItems.length) {
    // console.log('数组长度不同刷新:', prevItems.length, nextItems.length)
    return false
  }
  // id不同刷新
  if (equalItemsId(prevItems, nextItems) === false) {
    // console.log('id不同刷新', prevItems, nextItems)
    return false
  }
  // 刷新
  return true
}

export default equalItems
