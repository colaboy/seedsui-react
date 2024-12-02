import React, { forwardRef } from 'react'
import { compareType, defaultSetValueType, testStreet } from './utils'
import Main from './../Main'
import Tabs from './Tabs'

// 默认读取渲染数据window.districtData: [{id: '', name: '', children: []}]
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
      isPrefecture,
      isCity,
      isDistrict,
      isStreet,
      setValueType = defaultSetValueType,
      onChange,
      ...props
    },
    ref
  ) => {
    // 更新value的type
    function updateValueType(newValue) {
      let tabs = newValue || value
      // 没有type, 则先获取type
      if (tabs?.some?.((item) => !item.type)) {
        setValueType(tabs, {
          list: list,
          isCountry,
          isProvince,
          isMunicipality,
          isPrefecture,
          isCity,
          isDistrict,
          isStreet
        })
      }
    }

    // 校验选中类型是否已经符合传入的type, 符合则增加isLeaf
    function validateType(tabs) {
      let currentTypes = tabs[tabs.length - 1].type
      // 选中到目标类型，大于等于设定的类型, 不再下钻，直接onChange
      for (let currentType of currentTypes) {
        if (compareType(currentType, type) >= 0) {
          tabs[tabs.length - 1].isLeaf = true
          return true
        }
      }
      return false
    }

    // 点击选项前判断是否指定类型: 省, 市, 区, otherArguments: { list: externalList }
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

      updateValueType(tabs)

      // 校验选中类型是否已经符合传入的type, 符合则增加isLeaf
      validateType(tabs)

      onChange && onChange(tabs, otherArguments)
      return true
    }

    updateValueType(value)
    validateType(value)

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
            />
          )
        }}
        visible={visible}
        value={value}
        list={list}
        loadData={
          typeof loadData === 'function'
            ? (tabs, { list = null }) => {
                updateValueType(tabs)

                return loadData(tabs, {
                  list,
                  isCountry,
                  isProvince,
                  isMunicipality,
                  isPrefecture,
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
