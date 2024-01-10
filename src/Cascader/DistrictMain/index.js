import React, { forwardRef, useEffect, useState } from 'react'
import { matchType } from './utils'
import Main from './../Main'
import Tabs from './Tabs'

// window.__SeedsUI_Cascader_DistrictCombo_areaLevel__: {countries: [], provinces: [], cities: [], districts: [因数据量庞大, seedsui本地数据没有记录此数据]}
// window.__SeedsUI_Cascader_DistrictCombo_list__: [{id: '', name: '', children: []}]
// 级联选择
const DistrictMain = forwardRef(
  (
    {
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      value,
      list,
      loadList,
      editableOptions,
      // 判断是否是国省市区
      isCountry,
      isProvince,
      isCity,
      isDistrict,
      isStreet,
      onDrillDown,
      ...props
    },
    ref
  ) => {
    let [listData, setListData] = useState(list)

    // 初始化数据
    useEffect(() => {
      initList()
    }, []) // eslint-disable-line

    async function initList() {
      listData = list
      // 异步加载列表
      if (typeof loadList === 'function') {
        listData = await loadList()
      }
      if (Array.isArray(listData) && listData.length) {
        setListData(listData)
        return
      }

      // 读取默认列表或者缓存
      if (Object.isEmptyObject(window.__SeedsUI_Cascader_DistrictCombo_list__)) {
        window.__SeedsUI_Cascader_DistrictCombo_list__ = require('./chinaData')
        if (window.__SeedsUI_Cascader_DistrictCombo_list__.default) {
          window.__SeedsUI_Cascader_DistrictCombo_list__ =
            window.__SeedsUI_Cascader_DistrictCombo_list__.default
        }
      }
      listData = window.__SeedsUI_Cascader_DistrictCombo_list__ || null

      setListData(listData)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    async function handleDrillDown(tabs) {
      // 自定义是否允许下钻
      if (onDrillDown) {
        let goOn = await onDrillDown(tabs)
        if (goOn !== undefined) return goOn
      }

      // 匹配类型，没传类型则允许下钻
      if (!type) return true

      // 获取当前选中项
      let currentType = matchType(tabs, {
        data: listData,
        isCountry,
        isProvince,
        isCity,
        isDistrict,
        isStreet
      })

      // 选中到目标类型，不再下钻，直接onChange
      if (currentType === type) return false
      return true
    }

    return (
      <Main
        ref={ref}
        onDrillDown={handleDrillDown}
        TabsComponent={({ tabs, activeTab, onActiveTab }) => {
          return (
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onActiveTab={onActiveTab}
              // 禁用判断
              editableOptions={editableOptions}
              listData={listData}
              isCountry={isCountry}
              isProvince={isProvince}
              isCity={isCity}
              isDistrict={isDistrict}
              isStreet={isStreet}
            />
          )
        }}
        value={value}
        list={listData}
        {...props}
      />
    )
  }
)

export default DistrictMain
