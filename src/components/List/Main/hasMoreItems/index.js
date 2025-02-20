import getListLength from './getListLength'

// Check list if there are more items to load
function hasMoreItems({ list, currentPage, currentList, pagination }) {
  let totalPages = currentList?.totalPages || pagination?.totalPages
  let totalItems = currentList?.totalItems || pagination?.totalItems
  let rows = currentList?.rows || pagination?.rows
  // 根据单页条数和总条数获取总页数
  if (!totalPages && totalItems && rows) {
    totalPages = Math.ceil(totalItems / rows)
  }

  if (typeof totalPages === 'number' && totalPages <= currentPage) {
    return false
  }
  if (typeof totalItems === 'number' && totalItems <= getListLength(list)) {
    return false
  }
  if (typeof rows === 'number' && rows > getListLength(currentList)) {
    return false
  }
  return true
}

export default hasMoreItems
