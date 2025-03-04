// 比较列表中每一项的id是否相等
function equalItemsId(prevItems, nextItems) {
  return prevItems.every((item, index) => item.id === nextItems[index]?.id)
}

export default equalItemsId
