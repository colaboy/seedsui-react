import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'

// 主方法: 匹配当前选中项的类型
function matchType(current, { type, isCountry, isProvince, isCity, isDistrict, isStreet }) {
  if (!window.AreaLevel) return null

  // 没有类型, 返回类型
  if (!type) {
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
  }
  // 匹配国家, id相同或者名称相近即可匹配, 因为国家是一级
  if (type === 'country') {
    return testCountry(current, isCountry)
  }
  // 匹配省名, id相同或者名称相近即可匹配, 因为省是一或者二级
  else if (type === 'province') {
    return testProvince(current, isProvince)
  }
  // 匹配市名, id相同或者包含市, 因为吉林省吉林市不能根据名称匹配, 否则可能会选到省
  else if (type === 'city') {
    return testCity(current, isCity)
  }
  // 区判断
  else if (type === 'district') {
    return testDistrict(current, isDistrict)
  }
  // 街道判断
  else if (type === 'street') {
    return testStreet(current, isStreet)
  }

  return null
}

export default matchType
