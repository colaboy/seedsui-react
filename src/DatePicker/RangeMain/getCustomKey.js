// 获取自定义key
function getCustomKey(ranges) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customKey = ''
  for (let key in ranges) {
    if (!Array.isArray(ranges[key])) {
      customKey = key
      break
    }
  }
  return customKey
}

export default getCustomKey
