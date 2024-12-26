// 获取自定义key
function getCustomRangeId(ranges) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customRangeId = null
  for (let id in ranges) {
    if (!Array.isArray(ranges[id])) {
      customRangeId = id
      break
    }
  }
  return customRangeId
}

export default getCustomRangeId
