// 取出扁平数据的顶层id集合, 无parentid, 则修改为'-404'
function getFlattenTreeRootIds(list) {
  let parentIdMap = {}
  // 取出所有的parentid
  for (let item of list) {
    if (!item['parentid']) {
      item['parentid'] = '-404'
      parentIdMap['-404'] = '1'
    }
    parentIdMap[item['parentid']] = '1'
  }
  // 在id中出现的parentid说明不是顶层id
  for (let item of list) {
    if (!item.id) continue
    if (parentIdMap[item.id]) delete parentIdMap[item.id]
  }
  return Object.keys(parentIdMap)
}

export default getFlattenTreeRootIds
