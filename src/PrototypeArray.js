// 兼容ES7的includes
if (!window.Array.prototype.includes) {
  window.Array.prototype.includes = function (searchElement) {
    return this.some(function (el) {
      return el === searchElement
    })
  }
}

// 幂集 如:[1,2],返回[[1],[2],[1,2]]
window.Array.prototype.powerset = function () {
  let ps = [[]]
  for (let i = 0; i < this.length; i++) {
    for (let j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(this[i]))
    }
  }
  return ps
}

// 二维数组转为一维数组
window.Array.prototype.toOneColumn = function () {
  let reg = /[\d\.]+\,([\d\.]+)/g // eslint-disable-line
  return this.join(',').replace(reg, '$1').split(',')
}

// 包含，支持传数组包含数组
window.Array.prototype.contains = function (arg) {
  if (toString.call(arg) !== '[object Array]') {
    return this.indexOf(arg) > -1
  }
  return (
    this.filter(function (elem) {
      return arg.indexOf(elem) > -1
    }).length === arg.length
  )
}

// 比较两个数组是否相同, 比较不了包含{x: 20}的数组
if (window.Array.prototype.equals) {
  console.warn(
    '覆盖现有的window.Array.prototype.equals。 可能的原因：新的API定义了方法，存在框架冲突，或者在代码中包含了双重包含。'
  )
}
window.Array.prototype.equals = function (array) {
  if (!array) return false

  // 比较长度可以节省很多时间
  if (this.length !== array.length) return false

  for (let i = 0; i < this.length; i++) {
    // 检查是否有嵌套的数组
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // 递归到嵌套数组中
      if (!this[i].equals(array[i])) return false
    }
    // 检查是否有JSON数据,只比较一层
    else if (this[i] instanceof Object && array[i] instanceof Object) {
      for (let n in this[i]) {
        if (this[i][n] !== array[i][n]) return false
      }
    } else if (this[i] !== array[i]) {
      // 警告 - 两个不同的对象实例永远不会相同：{x：20}!= {x：20}
      return false
    }
  }
  return true
}
// 从for-in循环隐藏方法
Object.defineProperty(window.Array.prototype, 'equals', { enumerable: false })

// 判断数组中是否有重复数据,只能比较数字字符串
window.Array.prototype.isRepeatArray = function () {
  let arrStr = this.join(',') + ','
  for (let item of this) {
    if (arrStr.replace(item + ',', '').indexOf(item + ',') >= 0) return true
  }
  return false
}
// 移除数组json中的项
window.Array.prototype.removeProperties = function (properties) {
  for (let item of this) {
    for (let n in item) {
      for (let property of properties) {
        if (n === property) delete item[n]
      }
    }
  }
  return this
}
// 将数组中的项都转成字符串
window.Array.prototype.toStringOption = function () {
  return this.map(function (item) {
    if (typeof item === 'object' || typeof item === 'function') return JSON.stringify(item)
    return item
  })
}
// 获取相同值的索引, 例如: [1,1,2,2] 返回: [[0, 1], [2, 3]]
window.Array.prototype.sameIndexs = function () {
  let arr = this
  // 去重得出分组值
  let group = [...new Set(arr)]
  // 归类, 得到重复索引, [[重复索引], []]
  let groupIndexs = []
  for (let groupValue of group) {
    let subGroupIndexs = []
    for (let [index, arrValue] of arr.entries()) {
      if (groupValue === arrValue) {
        subGroupIndexs.push(index)
      }
    }
    groupIndexs.push(subGroupIndexs)
  }
  return groupIndexs
}

/* -----------------------------------------------------
  树数据扁平化, 将树的children拉平
  @格式 [{id: '', name: '', children: {}}]
  @return [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
 ----------------------------------------------------- */
window.Array.prototype.flattenTree = function (propertyConfig) {
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = this
  if (!Array.isArray(list) || !list.length) return list
  return _buildTreeToFlatten(list, parentIdName, nodeIdName)
}
function _buildTreeToFlatten(list, parentIdName, nodeIdName) {
  // 扁平化, 将children拉平
  let tree = []
  let temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (let i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    let item = temp.shift()
    // 此项children合并到temp
    if (item.children && item.children.length) {
      // 添加parentid
      for (let c = 0; c < item.children.length; c++) {
        item.children[c][parentIdName || 'parentid'] = item[nodeIdName || 'id']
      }
      temp = item.children.concat(temp)
    } else {
      item.isLeaf = true
    }
    // 删除此项children
    delete item.children
    // 添加此项到tree
    tree.push(item)
  }
  return tree
}

// 取出无父节点的顶层数据, 即[{id: '', name: '', parentid: '-404' 或没有parentid}]
window.Array.prototype.getFlattenTreeRoots = function (propertyConfig) {
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'

  let list = this
  let rootIds = list.getFlattenTreeRootIds(propertyConfig)
  let roots = []
  // 取出顶层数据(没有parentid或者parentid===-1)
  list.forEach(function (item) {
    if (
      item[parentIdName || 'parentid'] &&
      rootIds.indexOf(String(item[parentIdName || 'parentid'])) !== -1
    )
      roots.push(item)
  })
  return roots
}

// 取出扁平数据的顶层id集合, 无parentid, 则修改为'-404'
window.Array.prototype.getFlattenTreeRootIds = function (propertyConfig) {
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'

  let list = this
  let parentIdMap = {}
  // 取出所有的parentid
  for (let item of list) {
    if (!item[parentIdName || 'parentid']) {
      item[parentIdName || 'parentid'] = '-404'
      parentIdMap['-404'] = '1'
    }
    parentIdMap[item[parentIdName || 'parentid']] = '1'
  }
  // 在id中出现的parentid说明不是顶层id
  for (let item of list) {
    if (!item.id) continue
    if (parentIdMap[item.id]) delete parentIdMap[item.id]
  }
  return Object.keys(parentIdMap)
}

// 根据id, 取出此id的下级节点数据, 即[{id: '', name: '', parentid: ''}]
window.Array.prototype.getFlattenTreeChildren = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'

  let list = this
  let children = []
  for (let i = 0, child; (child = list[i++]); ) {
    // eslint-disable-line
    if (id && child[parentIdName || 'parentid'] === id.toString()) {
      children.push(child)
    }
  }
  return children
}

// 根据id, 取出此id节点的先辈数据
window.Array.prototype.getFlattenTreePredecessor = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let current = this.getFlattenTreeNode(id, propertyConfig)
  let list = this
  let predecessor = []
  function buildPredecessor(list, parentId) {
    for (let i = 0, item; (item = list[i++]); ) {
      // eslint-disable-line
      if (parentId && item[nodeIdName] === parentId.toString()) {
        predecessor.push(item)
        buildPredecessor(list, item[parentIdName])
      }
    }
  }
  buildPredecessor(list, current[parentIdName])
  return predecessor
}

// 根据id, 取出此id的后代节点数据, 即[{id: '', name: '', parentid: ''}]
window.Array.prototype.getFlattenTreeDescendants = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = this
  let descendants = []
  function buildDescendants(list, id) {
    for (let i = 0, item; (item = list[i++]); ) {
      // eslint-disable-line
      if (id && item[parentIdName || 'parentid'] === id.toString()) {
        descendants.push(item)
        buildDescendants(list, item[nodeIdName || 'id'])
      }
    }
  }
  buildDescendants(list, id)
  return descendants
}

// 根据id, 取出此id的上级节点数据, 即[{id: '', name: '', parentid: ''}]
window.Array.prototype.getFlattenTreeParent = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = this
  let parents = []
  for (let i = 0, node; (node = list[i++]); ) {
    // eslint-disable-line
    if (id && node[nodeIdName || 'id'] === id.toString()) {
      parents.push(node)
    }
  }
  return parents
}

// 根据id, 取出此id的前代节点数据, 即[{id: '', name: '', parentid: ''}]
window.Array.prototype.getFlattenTreePredecessors = function (parentId, propertyConfig) {
  // eslint-disable-next-line
  if (typeof parentId === 'number') parentId = String(parentId)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = this
  let predecessors = []
  function buildParent(list, parentId) {
    for (let i = 0, node; (node = list[i++]); ) {
      // eslint-disable-line
      if (parentId && node[nodeIdName || 'id'] === parentId.toString()) {
        predecessors.push(node)
        buildParent(list, node[parentIdName || 'parentid'])
      }
    }
  }
  buildParent(list, parentId)
  return predecessors
}

// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
window.Array.prototype.getFlattenTreeNode = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = this
  let item = list.filter(function (option) {
    if (option[nodeIdName || 'id'] === id) return true
    return false
  })
  if (item && item.length > 0) {
    item = item[0]
  }
  return item
}

// 根据id, 在指定id节点下加入属性数据, 例如{childrenLoaded: true}
window.Array.prototype.setFlattenTreeNodeProp = function (id, updateNode, propertyConfig) {
  if (!id || typeof updateNode !== 'function') return this
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let list = this

  // let parentIdName = propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'
  for (let item of list) {
    if (item[nodeIdName] === id) {
      updateNode(item)
    }
  }
  return list
}

/* -----------------------------------------------------
  树数据深度化, 将树的parentid深度为children, 必须有id和parentid
  @格式 [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
  @return [{id: '', name: '', children: {}}]
 ----------------------------------------------------- */
window.Array.prototype.deepTree = function (propertyConfig) {
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = this
  if (!Array.isArray(list) || !list.length) return list

  // 深度化, 修改trees
  function _buildTreeToDeep(item) {
    let children = list.getFlattenTreeChildren(item[nodeIdName || 'id'], {
      parentIdName: parentIdName,
      nodeIdName: nodeIdName
    })
    if (children && children.length) {
      if (item.children) {
        item.children = item.children.concat(children)
      } else {
        item.children = children
      }
      for (let i = 0, child; (child = children[i++]); ) {
        // eslint-disable-line
        _buildTreeToDeep(child)
      }
    } else {
      item.isLeaf = true
    }
  }
  let trees = list.getFlattenTreeRoots({
    parentIdName: parentIdName,
    nodeIdName: nodeIdName
  })
  for (let i = 0, tree; (tree = trees[i++]); ) {
    // eslint-disable-line
    _buildTreeToDeep(tree)
  }
  return trees
}

// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
window.Array.prototype.getDeepTreeNode = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'

  let list = Object.clone(this)
  let temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (let i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    let item = temp.shift()
    if (item[nodeIdName || 'id'] === id) return item
    // 此项children合并到temp
    if (item.children && item.children.length) {
      // 添加parentid
      for (let c = 0; c < item.children.length; c++) {
        item.children[c][parentIdName || 'parentid'] = item[nodeIdName || 'id']
      }
      temp = item.children.concat(temp)
    }
    // 删除此项children
    delete item.children
  }
  return null
}

// 根据id, 取出此id节点的父级数据
window.Array.prototype.getDeepTreeParent = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'

  let current = this.getDeepTreeNode(id, propertyConfig)
  if (current && current[parentIdName || 'parentid']) {
    current = this.getDeepTreeNode(current[parentIdName || 'parentid'], propertyConfig)
  } else {
    current = null
  }
  return current
}

// 根据id, 取出此id节点的先辈数据
window.Array.prototype.getDeepTreePredecessor = function (id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'

  let list = this
  let predecessor = []

  function buildPredecessor(list, parentId) {
    let parent = list.getDeepTreeNode(parentId, propertyConfig)
    if (!parent) return
    predecessor.push(parent)
    if (parent[parentIdName]) {
      buildPredecessor(list, parent[parentIdName])
    }
  }

  let current = list.getDeepTreeNode(id, propertyConfig)
  if (current) {
    buildPredecessor(list, current[parentIdName])
  }
  return predecessor
}

// 根据id, 在指定id节点下加入属性数据, 例如{children: [{id: '', name: '', parentid: ''}]}
window.Array.prototype.setDeepTreeNodeProp = function (id, updateNode, propertyConfig) {
  if (!id || typeof updateNode !== 'function') return this
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)
  let list = this
  // let parentIdName = propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'
  let childrenName =
    propertyConfig && propertyConfig.childrenName ? propertyConfig.childrenName : 'children'

  // 塞入到指定对象中
  function loopDeepTree(list) {
    for (let item of list) {
      // 找到相同的id, 塞入属性, 并终止遍历
      if (item[nodeIdName] === id) {
        updateNode(item)
        return
      }
      //　继续遍历子项
      if (Array.isArray(item[childrenName]) && item[childrenName].length) {
        loopDeepTree(item[childrenName])
      }
    }
  }
  loopDeepTree(list)
  return list
}

// 根据name集合, 取出此name节点的数据, 例如: 北京, 东城 返回[{id: '', name: '', parentid: ''}]
window.Array.prototype.getDeepTreeNodesByNames = function (names, propertyConfig) {
  let nodeNameName =
    propertyConfig && propertyConfig.nodeNameName ? propertyConfig.nodeNameName : 'name'

  let selected = [] // 构建选中项
  let list = Object.clone(this)
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
    if (item[nodeNameName].indexOf(name) !== -1 || name.indexOf(item[nodeNameName]) !== -1) {
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

// 根据属性, 取出此指定属性的数据,例如: getDeepTreeNodesByAttr('isLoaded', true) 返回 [{isLoaded: true, id: '', name: '', parentid: ''}]
window.Array.prototype.getDeepTreeNodesByAttr = function (attrName, attrValue) {
  let selected = [] // 构建选中项
  let list = Object.clone(this)
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

// 最底层节点增加属性
window.Array.prototype.setDeepTreeLeafProp = function (updateNode, propertyConfig) {
  if (typeof updateNode !== 'function') return this
  let list = this
  let childrenName =
    propertyConfig && propertyConfig.childrenName ? propertyConfig.childrenName : 'children'

  // 塞入到指定对象中
  function loopDeepTree(list) {
    for (let item of list) {
      //　有子项继续遍历子项
      if (Array.isArray(item[childrenName]) && item[childrenName].length) {
        loopDeepTree(item[childrenName])
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

// 补充parentid
window.Array.prototype.setDeepTreeParentId = function (propertyConfig) {
  let list = this
  let parentIdName =
    propertyConfig && propertyConfig.parentIdName ? propertyConfig.parentIdName : 'parentid'
  let nodeIdName = propertyConfig && propertyConfig.nodeIdName ? propertyConfig.nodeIdName : 'id'
  let childrenName =
    propertyConfig && propertyConfig.childrenName ? propertyConfig.childrenName : 'children'

  function loopDeepTree(list, parentId) {
    for (let item of list) {
      // 补充parentid
      if (parentId) {
        item[parentIdName] = parentId
      }
      //　有子项继续遍历子项
      if (Array.isArray(item[childrenName]) && item[childrenName].length) {
        loopDeepTree(item[childrenName], item[nodeIdName])
      }
    }
  }
  loopDeepTree(list)
  return list
}
