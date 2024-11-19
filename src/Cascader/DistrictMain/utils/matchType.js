import testMunicipality from './testMunicipality'
import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'

// 主方法: 匹配当前选中项的类型, tabs支持array和object两种方式, array匹配将会更准确
function matchType(tabs, config) {
  const { data, isCountry, isProvince, isMunicipality, isCity, isDistrict, isStreet } = config || {}
  // Array type parameter is invalid
  if (Array.isArray(tabs) && !tabs.length) {
    return null
  }

  let current = Array.isArray(tabs) ? tabs[tabs.length - 1] : tabs

  // 最后一级为请选择, 向上选一级
  if (!current?.id && current.parentid) {
    current = tabs[tabs.length - 2]
  }

  // No id is invalid
  if (!current?.id) {
    return null
  }

  // Neither id and nor parentid, It's root
  if (!current?.id && !current?.parentid && Array.isArray(data) && data.length) {
    current = data[0]
  }

  if (testMunicipality(current, isMunicipality)) {
    return ['province', 'city']
  }
  if (testCountry(current, isCountry)) {
    return ['country']
  }
  if (testProvince(current, isProvince)) {
    return ['province']
  }
  if (testCity(current, isCity)) {
    return ['city']
  }
  if (testStreet(current, isStreet)) {
    return ['street']
  }
  if (testDistrict(current, isDistrict)) {
    return ['district']
  }
  // 不是省市，但在data中，则认为是区；不在data中，则认为是街道(街道在data中, 会有isStreet，所以在isStreet时就返回了)
  let hasData = testNodeData(current, data)
  if (hasData) {
    if (hasData === 'street') {
      return ['street']
    }
    return ['district']
  }

  // 没有类型则可能是街道，如果上级是区或者市，则必定是街道
  if (Array.isArray(tabs) && tabs.length > 2) {
    return ['street']
  }

  return null
}

export default matchType
