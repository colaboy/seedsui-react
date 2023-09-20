// 格式化value，精简出参，只保留有用的字段
function formatValue(value) {
  return {
    errMsg: value?.errMsg || '',
    latitude: value?.latitude || '',
    longitude: value?.longitude || '',
    title: value?.title || '',
    value: value?.value || '',
    address: value?.address || '',
    province: value?.province || value?.addressComponents?.province || '',
    city: value?.city || value?.addressComponents?.city || '',
    district: value?.district || value?.addressComponents?.district || '',
    street: value?.street || value?.addressComponents?.street || ''
  }
}

export default formatValue
