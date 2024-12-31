// import getKeywordIdsByPinyin from './getKeywordIdsByPinyin'

// 获取关键字的所有匹配的keys
function getKeywordIds(keyword, flattenTree) {
  if (!keyword || typeof keyword !== 'string') return []
  let keys = []
  for (let node of flattenTree) {
    if (node.name && node?.name?.indexOf(keyword) !== -1) {
      keys.push(node.id)
    }
  }

  // 如果没有匹配到, 再根据拼音匹配
  /*
  if (keys.length < 1 && keyword && /^[a-zA-Z]+$/.test(keyword)) {
    for (let item of flattenTree) {
      if (getKeywordIdsByPinyin(keyword, item.name)) {
        keys.push(item.id)
        break
      }
    }
  }
  */
  return keys
}

export default getKeywordIds
