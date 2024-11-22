import getFlattenTreeChildren from './getFlattenTreeChildren'

/* -----------------------------------------------------
  树数据深度化, 将树的parentid深度为children, 必须有id和parentid
  @格式 [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
  @return [{id: '', name: '', children: {}}]
 ----------------------------------------------------- */
function deepTree(list) {
  if (!Array.isArray(list) || !list.length) return list

  // 深度化, 修改trees
  function _buildTreeToDeep(item) {
    let children = getFlattenTreeChildren(list, item['id'])
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
  let trees = getFlattenTreeRoots(list)
  for (let i = 0, tree; (tree = trees[i++]); ) {
    // eslint-disable-line
    _buildTreeToDeep(tree)
  }
  return trees
}

export default deepTree
