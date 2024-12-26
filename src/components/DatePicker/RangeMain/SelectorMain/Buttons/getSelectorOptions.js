// 将{key: value}转为[{id: key, name: value}]
function getSelectorOptions(ranges, filter) {
  let options = Object.entries(ranges).map(([name, value]) => {
    return { id: name, name: name, value: value }
  })
  // 独立显示自定义字段, 过滤到选项中
  if (filter) {
    options = options.filter((item) => {
      return filter(item)
    })
  }
  return options
}

export default getSelectorOptions
