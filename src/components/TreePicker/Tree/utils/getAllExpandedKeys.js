// 展开所有加载完成项
function getAllExpandedKeys(list) {
  let keys = []
  function loop(currentList) {
    for (let item of currentList) {
      // 展开所有父级
      if (Array.isArray(item.children) && item.children.length) {
        keys.push(item.id)
      }
    }
  }

  loop(list)

  return keys
}

export default getAllExpandedKeys
