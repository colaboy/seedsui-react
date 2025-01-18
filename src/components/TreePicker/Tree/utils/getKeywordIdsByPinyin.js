// 名称匹配拼音, 返回匹配到的汉字
function getKeywordIdsByPinyin(keyword, name) {
  if (!name || typeof name !== 'string') return ''
  if (!keyword) return name
  // 转成拼音
  let namePinyin = name
  let pinyinIndex = namePinyin?.indexOf(keyword.toLowerCase())
  if (pinyinIndex !== -1) {
    return name
  }
  return ''
}

export default getKeywordIdsByPinyin
