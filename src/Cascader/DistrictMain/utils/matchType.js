import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'

// 主方法: 匹配当前选中项的类型
function matchType(current, config) {
  const { data, isCountry, isProvince, isCity, isDistrict, isStreet } = config || {}
  if (!window.AreaLevel) return null

  if (testCountry(current, isCountry)) {
    return 'country'
  }
  if (testCity(current, isCity)) {
    return 'city'
  }
  if (testProvince(current, isProvince)) {
    return 'province'
  }
  if (testDistrict(current, isDistrict)) {
    return 'district'
  }
  if (testStreet(current, isStreet)) {
    return 'street'
  }
  // 不是省市，但在data中，则认为是区，不在data中，则认为是街道
  if (testNodeData(current, data)) {
    return 'district'
  }
  return 'street'
}

export default matchType
