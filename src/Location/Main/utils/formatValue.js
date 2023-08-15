// 格式化value，精简出参，只保留有用的字段
function formatValue(value) {
  return {
    errMsg: value?.errMsg || '',
    latitude: value?.latitude || '',
    longitude: value?.longitude || '',
    title: value?.title || '',
    value: value?.value || ''
  }
}

export default formatValue
