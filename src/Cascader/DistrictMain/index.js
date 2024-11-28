import React, { forwardRef } from 'react'
import { getParentTypes, matchType, testStreet } from './utils'
import Main from './../Main'
import Tabs from './Tabs'

// window.districtLevelData: {countries: [], provinces: [], cities: [], districts: [因数据量庞大, seedsui本地数据没有记录此数据]}
// window.districtData: [{id: '', name: '', children: []}]
// 级联选择
const DistrictMain = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main
      value,

      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      list,
      loadData,
      editableOptions,
      // 判断是否是国省市区
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet,
      setValueType = matchType,
      onChange,
      ...props
    },
    ref
  ) => {
    // 点击选项前判断是否指定类型: 省, 市, 区
    async function handleChange(tabs, otherArguments) {
      if (!Array.isArray(tabs) || !tabs.length) {
        onChange && onChange(null, otherArguments)
        return true
      }

      let lastTab = tabs[tabs.length - 1]

      // 街道无需再发请求
      if (testStreet(tabs[tabs.length - 1], isStreet)) {
        lastTab.isLeaf = true
        onChange && onChange(tabs, otherArguments)
        return false
      }

      // 匹配类型，没传类型则允许下钻
      if (!type) {
        onChange && onChange(tabs, otherArguments)
        return true
      }

      // 设置value的type属性
      updateValueType(tabs)

      let currentType = tabs[tabs.length - 1].type
      if (currentType?.length) {
        currentType = currentType[currentType.length - 1]
      } else {
        currentType = null
      }

      // 选中到目标类型，大于等于设定的类型, 不再下钻，直接onChange
      if (currentType && getParentTypes(currentType).includes(type)) {
        lastTab.isLeaf = true
        onChange && onChange(tabs, otherArguments)
        return false
      }

      onChange && onChange(tabs, otherArguments)
      return true
    }

    // 设置value的type属性
    function updateValueType(tabs) {
      if (tabs?.some?.((item) => !item.type)) {
        setValueType(tabs, {
          list,
          isCountry,
          isProvince,
          isMunicipality,
          isCity,
          isDistrict,
          isStreet
        })
      }
    }

    return (
      <Main
        ref={ref}
        TabsComponent={({ tabs, activeTab, onActiveTab }) => {
          return (
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onActiveTab={onActiveTab}
              // 禁用判断
              editableOptions={editableOptions}
              list={list}
              isCountry={isCountry}
              isProvince={isProvince}
              isMunicipality={isMunicipality}
              isCity={isCity}
              isDistrict={isDistrict}
              isStreet={isStreet}
              setValueType={setValueType}
            />
          )
        }}
        visible={visible}
        value={value}
        list={list}
        loadData={
          typeof loadData === 'function'
            ? (tabs, { list = null }) => {
                // 设置value的type属性
                updateValueType(tabs)
                return loadData(tabs, {
                  list,
                  isCountry,
                  isProvince,
                  isMunicipality,
                  isCity,
                  isDistrict,
                  isStreet,
                  setValueType
                })
              }
            : null
        }
        {...props}
        onChange={handleChange}
      />
    )
  }
)

export default DistrictMain
