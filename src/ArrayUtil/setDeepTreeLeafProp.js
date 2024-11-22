// 最底层节点增加属性
function setDeepTreeLeafProp(list, updateNode) {
  if (typeof updateNode !== 'function') return this

  // 塞入到指定对象中
  function loopDeepTree(list) {
    for (let item of list) {
      //　有子项继续遍历子项
      if (Array.isArray(item['children']) && item['children'].length) {
        loopDeepTree(item['children'])
      }
      // 没有子项, 则认为是叶子节点
      else {
        updateNode(item)
      }
    }
  }
  loopDeepTree(list)
  return list
}

export default setDeepTreeLeafProp
