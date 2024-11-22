import _ from 'lodash'

// 根据name集合, 取出此name节点的数据, 例如: 北京, 东城 返回[{id: '', name: '', parentid: ''}]
function getDeepTreeNodesByNames(originList, names) {
  let selected = [] // 构建选中项
  let list = _.cloneDeep(originList)
  let temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (let i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  let level = 0
  while (temp.length) {
    // 取出一项, 并移除此项
    let item = temp.shift()
    let name = names[level]
    if (!name) break
    if (item['name'].indexOf(name) !== -1 || name.indexOf(item['name']) !== -1) {
      selected.push(item)
      // 此项children合并到temp
      if (item.children && item.children.length) {
        temp = item.children
      }
      // 删除此项children
      delete item.children
      level++
    }
  }
  return selected
}

export default getDeepTreeNodesByNames
