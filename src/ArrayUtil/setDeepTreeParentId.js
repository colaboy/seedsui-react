// 补充parentid
function setDeepTreeParentId(list) {
  function loopDeepTree(list, parentId) {
    for (let item of list) {
      // 补充parentid
      if (parentId) {
        item['parentid'] = parentId
      }
      //　有子项继续遍历子项
      if (Array.isArray(item['children']) && item['children'].length) {
        loopDeepTree(item['children'], item['id'])
      }
    }
  }
  loopDeepTree(list)
  return list
}

export default setDeepTreeParentId
