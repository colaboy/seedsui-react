// 异步加载: 获取加载完成项
function getLoadedKeys(list) {
  let keys = []
  function loop(currentList) {
    for (let item of currentList) {
      // isLoaded或者有children则认为已经加载完成
      if (item.isLoaded || (Array.isArray(item.children) && item.children.length)) {
        keys.push(item.id)
      }

      // 如果有子级，递归子级
      if (Array.isArray(item.children) && item.children.length) {
        loop(item.children)
      }
    }
  }

  loop(list)

  return keys
}

export default getLoadedKeys
