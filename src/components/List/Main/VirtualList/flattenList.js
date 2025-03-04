import isGroups from './../utils/isGroups'
function flattenList(list) {
  if (isGroups(list) === false) {
    return list
  }

  let flatList = []
  for (let group of list) {
    let { children, ...groupItem } = group
    groupItem.virtualData = {
      type: 'group'
    }
    flatList.push(groupItem)
    flatList.push(...children)
  }
  return flatList
}

export default flattenList
