import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { updateValueType, testStreet } from './utils'
import Main from './../Main'
import Tabs from './Tabs'

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
      ...props
    },
    ref
  ) => {
    // Expose api
    const districtMainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        updateValueType: _updateValueType,
        ...districtMainRef.current
      }
    })

    // 更新value的type, 截取超出type部分
    function _updateValueType(newValue, newList) {
      let tabs = newValue || value
      let data = newList || list
      return updateValueType(tabs, data, {
        type,
        isCountry,
        isProvince,
        isMunicipality,
        isPrefecture,
        isCity,
        isDistrict,
        isStreet
      })
    }

    // 点击选项前判断是否指定类型和isLeaf
    async function handleSelect(tabs) {
      if (!Array.isArray(tabs) || !tabs.length) {
        return tabs
      }

      let lastTab = tabs[tabs.length - 1]

      // 街道无需再发请求
      if (testStreet(tabs[tabs.length - 1], isStreet)) {
        lastTab.isLeaf = true
        return tabs
      }

      // 匹配类型，没传类型则允许下钻
      if (!type) {
        return true
      }

      // 末级增加isLeaf
      _updateValueType(tabs)

      return tabs
    }

    // eslint-disable-next-line
    value = _updateValueType(value)

    return (
      <Main
        ref={districtMainRef}
        tabbar={({ tabs, activeTab, triggerActiveTab }) => {
          return (
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onActiveTab={triggerActiveTab}
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
                // eslint-disable-next-line
                tabs = _updateValueType(tabs, list)

                return loadData(tabs, {
                  list,
                  isCountry,
                  isProvince,
                  isMunicipality,
                  isPrefecture,
                  isCity,
                  isDistrict,
                  isStreet
                })
              }
            : null
        }
        {...props}
        onSelect={handleSelect}
      />
    )
  }
)

export default DistrictMain
