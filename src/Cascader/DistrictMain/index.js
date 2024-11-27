import React, { forwardRef, useEffect, useState } from 'react'
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

      async,
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      list,
      loadList,
      loadData,
      onListLoad,
      editableOptions,
      // 判断是否是国省市区
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet,
      getType = matchType,
      onChange,
      ...props
    },
    ref
  ) => {
    let [listData, setListData] = useState(list)

    // 初始化数据
    useEffect(() => {
      // 隐藏时初始化列表
      if (!visible) {
        // 第一次不加载
        if (ref.notFirstLoad && ref.current?.update) {
          ref.current.update()
        }
        ref.notFirstLoad = true
        return
      }

      initList()
      // eslint-disable-next-line
    }, [visible])

    // 如果设置为同步加载，则不显示也需要加载
    useEffect(() => {
      if (async === false) {
        initList()
      }
      // eslint-disable-next-line
    }, [async])

    // 初始化列表
    async function initList() {
      listData = list
      // 异步加载列表
      if (list) {
        listData = list
      } else if (typeof loadList === 'function') {
        listData = await loadList()
      } else if (window.districtData) {
        listData = window.districtData
      }

      // 设置列表
      if (Array.isArray(listData) && listData.length) {
        setListData(listData)
        if (typeof onListLoad === 'function') onListLoad(listData)
      }
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    async function handleChange(tabs) {
      let lastTab = Array.isArray(tabs) && tabs.length ? tabs[tabs.length - 1] : null

      // 街道无需再发请求
      if (Array.isArray(tabs) && tabs.length && testStreet(tabs[tabs.length - 1], isStreet)) {
        lastTab.isLeaf = true
        onChange && onChange(tabs)
        return false
      }

      // 匹配类型，没传类型则允许下钻
      if (!type) {
        onChange && onChange(tabs)
        return true
      }

      // 获取当前选中项
      let currentType = getType(tabs, {
        data: list,
        isCountry,
        isProvince,
        isMunicipality,
        isCity,
        isDistrict,
        isStreet
      })

      // 选中到目标类型，大于等于设定的类型, 不再下钻，直接onChange
      if (
        currentType?.length &&
        getParentTypes(currentType[currentType.length - 1]).includes(type)
      ) {
        lastTab.isLeaf = true
        onChange && onChange(tabs)
        return false
      }

      onChange && onChange(tabs)
      return true
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
              listData={listData}
              isCountry={isCountry}
              isProvince={isProvince}
              isMunicipality={isMunicipality}
              isCity={isCity}
              isDistrict={isDistrict}
              isStreet={isStreet}
              getType={getType}
            />
          )
        }}
        visible={visible}
        value={value}
        list={listData}
        loadData={
          typeof loadData === 'function'
            ? (tabs, { list = null }) => {
                return loadData(tabs, {
                  list,
                  isCountry,
                  isProvince,
                  isMunicipality,
                  isCity,
                  isDistrict,
                  isStreet,
                  getType
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
