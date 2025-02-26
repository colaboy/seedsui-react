// 合并分组数据
function mergeGroups(groups, newGroups) {
  // 使用一个新的数组来存储合并后的结果，保持原顺序
  const mergedGroups = [...groups]

  // 使用 Map 存储 groups 中的分组，按 id 映射
  const groupMap = new Map(groups.map((group) => [group.id, group]))

  // 遍历 newGroups，进行合并
  newGroups.forEach((newGroup) => {
    const existingGroup = groupMap.get(newGroup.id)

    if (existingGroup) {
      // 如果存在相同 id 的分组，将 newGroup 的 children 添加到 existingGroup 的 children 前面
      existingGroup.children = [...newGroup.children, ...existingGroup.children]
    } else {
      // 如果没有相同 id 的分组，直接追加到 mergedGroups 中
      mergedGroups.push(newGroup)
    }
  })

  return mergedGroups
}

export default mergeGroups
