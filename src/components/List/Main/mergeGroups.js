// 合并分组数据
function mergeGroups(groups, newGroups) {
  // 使用一个普通对象来存储 groups 中的分组，按 id 映射
  let groupMap = {}

  // 将原 groups 数据按 id 存入 groupMap
  for (let i = 0; i < groups.length; i++) {
    groupMap[groups[i].id] = groups[i]
  }

  // 使用新的数组来存储合并后的结果，保持原顺序
  let mergedGroups = groups.slice() // 创建 groups 的副本

  // 遍历 newGroups，进行合并
  for (let j = 0; j < newGroups.length; j++) {
    let newGroup = newGroups[j]
    let existingGroup = groupMap[newGroup.id]

    if (existingGroup) {
      // 如果存在相同 id 的分组，将 newGroup 的 children 添加到 existingGroup 的 children 前面
      existingGroup.children = existingGroup.children.concat(newGroup.children)
    } else {
      // 如果没有相同 id 的分组，直接追加到 mergedGroups 中
      mergedGroups.push(newGroup)
    }
  }

  return mergedGroups
}

export default mergeGroups
