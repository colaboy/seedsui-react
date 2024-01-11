import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'

// 主方法: 匹配当前选中项的类型, tabs支持array和object两种方式, array匹配将会更准确
function matchType(tabs, config) {
  const { data, isCountry, isProvince, isCity, isDistrict, isStreet } = config || {}
  if (!window.AreaLevel) return null

  // Array type parameter is invalid
  if (Array.isArray(tabs) && !tabs.length) {
    return null
  }

  let current = Array.isArray(tabs) ? tabs[tabs.length - 1] : tabs

  // Current is invalid
  if (!current?.id && !current?.name) {
    return null
  }

  // Current No id and No parentid, It's root
  if (!current?.id && !current?.parentid && Array.isArray(data) && data.length) {
    current = data[0]
  }

  if (testCountry(current, isCountry)) {
    return 'country'
  }
  if (testProvince(current, isProvince)) {
    return 'province'
  }
  if (testCity(current, isCity)) {
    return 'city'
  }
  if (testDistrict(current, isDistrict)) {
    return 'district'
  }
  if (testStreet(current, isStreet)) {
    return 'street'
  }
  // 不是省市，但在data中，则认为是区，不在data中，则认为是街道(街道在data中, 会有isStreet，所以在isStreet时就返回了)
  if (testNodeData(current, data)) {
    return 'district'
  }

  // 没有类型则可能是街道，如果上级是区或者市，则必定是街道
  if (Array.isArray(tabs) && tabs.length > 2) {
    let prevTab = tabs[tabs.length - 2]
    if (testDistrict(prevTab, isDistrict)) {
      return 'street'
    }
    if (testCity(prevTab, isCity)) {
      return 'street'
    }
  }

  return null
}

export default matchType
