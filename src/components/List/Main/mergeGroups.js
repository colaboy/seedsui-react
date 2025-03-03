// 合并分组数据
function mergeGroups(groups, newGroups) {
  // 使用一个普通对象来存储 groups 中的分组，按 id 映射
  let groupMap = {}

  // 将原 groups 数据按 id 存入 groupMap
  for (let group of groups) {
    groupMap[group.id] = group
  }

  // 使用新的数组来存储合并后的结果，保持原顺序
  let mergedGroups = []

  // 遍历 newGroups，进行合并
  for (let newGroup of newGroups) {
    let { children: newChildren, ...newGroupItem } = newGroup

    let existingGroup = groupMap[newGroup.id]
    if (existingGroup) {
      mergedGroups.push({
        ...newGroupItem,
        children: [...newChildren, ...existingGroup.children]
      })
    } else {
      mergedGroups.push(newGroup)
    }
  }

  return mergedGroups
}

export default mergeGroups
