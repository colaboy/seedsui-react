import _ from 'lodash'

// 根据属性, 取出此指定属性的数据,例如: getDeepTreeNodesByAttr('isLoaded', true) 返回 [{isLoaded: true, id: '', name: '', parentid: ''}]
function getDeepTreeNodesByAttr(originList, attrName, attrValue) {
  let selected = [] // 构建选中项
  let list = _.cloneDeep(originList)
  let temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (let i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    let item = temp.shift()
    if (item[attrName] === attrValue) {
      selected.push(item)
      // 此项children合并到temp
      if (item.children && item.children.length) {
        temp = item.children
      }
      // 删除此项children
      delete item.children
    }
  }
  return selected
}

export default getDeepTreeNodesByAttr
