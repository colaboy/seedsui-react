import getFlattenTreeRootIds from './getFlattenTreeRootIds'

// 取出无父节点的顶层数据, 即[{id: '', name: '', parentid: '-404' 或没有parentid}]
function getFlattenTreeRoots(list) {
  let rootIds = getFlattenTreeRootIds(list)
  let roots = []
  // 取出顶层数据(没有parentid或者parentid===-1)
  list.forEach(function (item) {
    if (item['parentid'] && rootIds.indexOf(String(item['parentid'])) !== -1) roots.push(item)
  })
  return roots
}

export default getFlattenTreeRoots
