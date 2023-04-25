// 名称匹配拼音, 返回匹配到的汉字
function getKeywordIdsByPinyin(keyword, name) {
  if (!name || typeof name !== 'string') return ''
  if (!keyword) return name
  let pinyinIndex = name?.toPinyin()?.indexOf(keyword.toLowerCase())
  if (pinyinIndex !== -1) {
    return name
  }
  return ''
}

export default getKeywordIdsByPinyin
