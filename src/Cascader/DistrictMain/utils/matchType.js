import testMunicipality from './testMunicipality'
import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'

// 主方法: 匹配当前选中项的类型, tabs支持array和object两种方式, array匹配将会更准确
function matchType(tabs, config) {
  const { list, isCountry, isProvince, isMunicipality, isCity, isDistrict, isStreet } = config || {}
  // Array type parameter is invalid
  if (Array.isArray(tabs) && !tabs.length) {
    return null
  }

  for (let current of tabs) {
    // No id is invalid
    if (!current?.id) {
      continue
    }

    if (testMunicipality(current, isMunicipality)) {
      current.type = ['province', 'city']
      continue
    } else if (testCountry(current, isCountry)) {
      current.type = ['country']
      continue
    } else if (testProvince(current, isProvince)) {
      current.type = ['province']
      continue
    } else if (testCity(current, isCity)) {
      current.type = ['city']
      continue
    } else if (testStreet(current, isStreet)) {
      current.type = ['street']
      continue
    } else if (testDistrict(current, isDistrict)) {
      current.type = ['district']
      continue
    }

    // 不是省市，但在list中，则认为是区；不在list中，则认为是街道(街道在list中, 会有isStreet，所以在isStreet时就返回了)
    let hasData = testNodeData(current, list)
    if (hasData) {
      if (hasData === 'street') {
        current.type = ['street']
        continue
      }
      current.type = ['district']
      continue
    }

    // 没有类型则可能是街道，如果上级是区或者市，则必定是街道
    if (Array.isArray(tabs) && tabs.length > 2) {
      current.type = ['street']
      continue
    }
  }

  return tabs
}

export default matchType
