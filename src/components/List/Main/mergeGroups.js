// 合并分组数据
function mergeGroups(groups, newGroups) {
  // 使用新的数组来存储合并后的结果，保持原顺序
  let mergedGroups = groups.map((group) => {
    let { children, ...groupItem } = group
    return {
      ...groupItem,
      children: [...children]
    }
  })

  // 遍历 newGroups，进行合并
  for (let newGroup of newGroups) {
    let { children: newChildren, ...newGroupItem } = newGroup

    let existingGroup = mergedGroups.filter((group) => group.id === newGroupItem.id)?.[0]
    if (existingGroup) {
      existingGroup.children = existingGroup.children.concat(newChildren)
    } else {
      mergedGroups.push(newGroup)
    }
  }

  return mergedGroups
}

export default mergeGroups
