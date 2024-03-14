import getChildTypes from './getChildTypes'
import getParentTypes from './getParentTypes'
import getSiblingType from './getSiblingType'
import matchType from './matchType'
import testCountry from './testCountry'
import testProvince from './testProvince'
import testCity from './testCity'
import testDistrict from './testDistrict'
import testStreet from './testStreet'
import testNodeData from './testNodeData'
import testEditableOptions from './testEditableOptions'

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
  getChildTypes,
  getParentTypes,
  getSiblingType,
  matchType,
  testCountry,
  testProvince,
  testCity,
  testDistrict,
  testStreet,
  testNodeData,
  testEditableOptions
}

export default {
  getChildTypes,
  getParentTypes,
  getSiblingType,
  matchType,
  testCountry,
  testProvince,
  testCity,
  testDistrict,
  testStreet,
  testNodeData,
  testEditableOptions
}
