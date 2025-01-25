import _ from 'lodash'

// 判断此项是否过滤
function filterItem(item, keyword) {
  // When have children display parent
  if (!keyword || item?.children?.length) return true

  // Match title
  if (typeof item?.name === 'string' && item.name) {
    if (item.name.indexOf(keyword) !== -1) {
      return true
    }
  }

  // Match description
  if (typeof item?.description === 'string' && item.description) {
    if (item.description.indexOf(keyword) !== -1) {
      return true
    }
  }

  return false
}

// Format list data, filter valid data
function formatList(list, keyword, onSearch) {
  // List error
  if (!Array.isArray(list)) {
    console.error('Picker.Modal: Wrong parameter with "list"! You need pass a Array')
    return []
  }

  // Custom filter
  if (typeof onSearch === 'function') {
    let newList = onSearch({ keyword, list })
    if (Array.isArray(newList)) {
      return newList
    }
  }

  // Default filter
  let newList = _.cloneDeep(list)
  return newList.filter((item) => {
    // filter children in list item
    if (Array.isArray(item.children) && item.children.length) {
      item.children = item.children.filter((child) => filterItem(child, keyword))
    }
    // filter list
    return filterItem(item, keyword)
  })
}

export default formatList
