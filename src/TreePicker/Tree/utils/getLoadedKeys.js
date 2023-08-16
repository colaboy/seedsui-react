// 异步加载: 获取加载完成项
function getLoadedKeys(flattenList) {
  if (!Array.isArray(flattenList) || !flattenList.length) return []
  let keys = []
  for (let item of flattenList.filter((item) => item.isLoaded)) {
    keys.push(item.id)
  }
  return keys
}

export default getLoadedKeys
