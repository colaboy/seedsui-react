import getMinTypes from './getMinTypes'
import getSiblingType from './getSiblingType'
import matchType from './matchType'
import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'

// 获取所有省市, 用于匹配选中的省市
if (Object.isEmptyObject(window.__SeedsUI_Cascader_DistrictCombo_areaLevel__)) {
  window.__SeedsUI_Cascader_DistrictCombo_areaLevel__ = require('./../chinaLvlData')
  if (window.__SeedsUI_Cascader_DistrictCombo_areaLevel__.default) {
    window.__SeedsUI_Cascader_DistrictCombo_areaLevel__ =
      window.__SeedsUI_Cascader_DistrictCombo_areaLevel__.default
  }
}

window.AreaLevel = window.__SeedsUI_Cascader_DistrictCombo_areaLevel__ || null

export {
  getMinTypes,
  getSiblingType,
  matchType,
  testCountry,
  testProvince,
  testCity,
  testDistrict,
  testStreet,
  testNodeData
}
