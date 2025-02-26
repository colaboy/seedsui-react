function isGroups(list) {
  if (Array.isArray(list?.[0]?.children) && list[0].children.length) return true
  return false
}

export default isGroups
