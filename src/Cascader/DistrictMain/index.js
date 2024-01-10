import React, { forwardRef, useEffect, useState } from 'react'
import { matchType } from './utils'
import Main from './../Main'
import Tabs from './Tabs'

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
      onBeforeSelect,
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

    // 校验只读
    function validateEditableOptions(item) {
      if (!item?.id || !item?.name) return true

      let type = matchType(item)
      if (type && editableOptions?.[type]?.editable === false) {
        return false
      }
      return true
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    async function handleBeforeSelect(item) {
      // 校验能否选择
      if (editableOptions && validateEditableOptions(item) === false) {
        return false
      }

      // 自定义是否允许选中
      if (onBeforeSelect) {
        let goOn = await onBeforeSelect(item)
        if (goOn !== undefined) return goOn
      }

      // 如果没有选项则允许选择
      if (!item?.id || !item?.name) return true

      // 匹配类型，没传类型则允许下钻
      if (!type) return true

      // 获取当前选中项
      let match = matchType(item, { type, isCountry, isProvince, isCity, isDistrict, isStreet })

      // 没有匹配到类型时null返回true不关闭，匹配到时返回false不允许下钻
      return match === null ? true : !match
    }

    return (
      <Main
        ref={ref}
        onBeforeSelect={handleBeforeSelect}
        TabsComponent={({ tabs, activeTab, onActiveTab }) => {
          return <Tabs tabs={tabs} activeTab={activeTab} onActiveTab={onActiveTab} />
        }}
        value={value}
        list={listData}
        {...props}
      />
    )
  }
)

export default DistrictMain
