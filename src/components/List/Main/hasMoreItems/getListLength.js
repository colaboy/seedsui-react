function getListLength(list) {
  let length = 0
  for (let item of list) {
    if (Array.isArray(item?.children)) {
      length = item.children.length + length
    } else {
      length++
    }
  }
  return length
}

export default getListLength
