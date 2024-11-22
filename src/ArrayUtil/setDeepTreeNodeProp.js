// 根据id, 在指定id节点下加入属性数据, 例如{children: [{id: '', name: '', parentid: ''}]}
function setDeepTreeNodeProp(id, updateNode) {
  if (!id || typeof updateNode !== 'function') return this
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let list = this

  // 塞入到指定对象中
  function loopDeepTree(list) {
    for (let item of list) {
      // 找到相同的id, 塞入属性, 并终止遍历
      if (item['id'] === id) {
        updateNode(item)
        return
      }
      //　继续遍历子项
      if (Array.isArray(item['children']) && item['children'].length) {
        loopDeepTree(item['children'])
      }
    }
  }
  loopDeepTree(list)
  return list
}

export default setDeepTreeNodeProp
