import testMunicipality from './testMunicipality'
import testPrefecture from './testPrefecture'
import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'

// 主方法: 匹配当前选中项的类型, tabs支持array和object两种方式, array匹配将会更准确
function defaultSetValueType(tabs, config) {
  const {
    list,
    isCountry,
    isProvince,
    isMunicipality,
    isPrefecture,
    isCity,
    isDistrict,
    isStreet
  } = config || {}
  // Array type parameter is invalid
  if (!Array.isArray(tabs) || !tabs.length) {
    return null
  }

  for (let [index, current] of tabs.entries()) {
    // No id is invalid
    if (!current?.id) {
      continue
    }

    // 直辖市判断
    if (testMunicipality(current, isMunicipality)) {
      current.type = ['province', 'city', 'municipality']
      continue
    } else if (testCountry(current, isCountry)) {
      current.type = ['country']
      continue
    } else if (testProvince(current, isProvince)) {
      current.type = ['province']
      continue
    }
    // 直筒子市判断
    else if (testPrefecture(current, isPrefecture)) {
      current.type = ['city', 'prefecture']
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

    // 获取对应列表中的节点类型
    let type = testNodeData(current, list)
    if (type) {
      current.type = [type]
      continue
    }

    // 有国的情况
    if (testCountry(tabs[0], isCountry)) {
      // 省市将在上面被匹配到
      if (index === 1) {
        current.type = ['province']
        continue
      }
      if (index === 2) {
        // 直辖市的下级为区
        if (tabs[1].type.includes('municipality')) {
          current.type = ['district']
        } else {
          current.type = ['city']
        }
        continue
      }
      if (index === 3) {
        // 直辖市或者直筒子市, 第3级为街道
        if (tabs[1].type.includes('municipality') || tabs[2].type.includes('prefecture')) {
          current.type = ['street']
        } else {
          current.type = ['district']
        }
        continue
      }
      if (index === 4) {
        current.type = ['street']
        continue
      }
    } else {
      // 省市将在上面被匹配到
      if (index === 0) {
        current.type = ['province']
        continue
      }
      if (index === 1) {
        // 直辖市的下级为区
        if (tabs[0].type.includes('municipality')) {
          current.type = ['district']
        } else {
          current.type = ['city']
        }
        continue
      }
      if (index === 2) {
        // 直辖市或者直筒子市, 第3级为街道
        if (tabs[0].type.includes('municipality') || tabs[1].type.includes('prefecture')) {
          current.type = ['street']
        } else {
          current.type = ['district']
        }
        continue
      }
      if (index === 3) {
        current.type = ['street']
        continue
      }
    }
    continue
  }

  return tabs
}

export default defaultSetValueType
