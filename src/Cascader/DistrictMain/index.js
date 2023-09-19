import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { getMinTypes, matchType, testCity, testDistrict } from './utils'
import Main from './../Main'

// 级联选择
const DistrictMain = forwardRef(
  (
    {
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      value,
      list,
      loadList,
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
      // 读取默认列表或者缓存
      if (Object.isEmptyObject(window.__SeedsUI_Cascader_DistrictCombo_list__)) {
        window.__SeedsUI_Cascader_DistrictCombo_list__ = require('./China')
        if (window.__SeedsUI_Cascader_DistrictCombo_list__.default) {
          window.__SeedsUI_Cascader_DistrictCombo_list__ =
            window.__SeedsUI_Cascader_DistrictCombo_list__.default
        }
      }
      listData = window.__SeedsUI_Cascader_DistrictCombo_list__ || null

      setListData(listData)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    async function handleBeforeSelect(tabs) {
      // 自定义是否允许选中
      if (onBeforeSelect) {
        let goOn = await onBeforeSelect(tabs)
        if (goOn !== undefined) return goOn
      }

      // 如果没有选项则允许选择
      if (!Array.isArray(tabs) || !tabs.length) return true

      // 匹配类型，没传类型则允许下钻
      if (!type) return true

      // 获取当前选中项
      let lastTab = tabs[tabs.length - 1]
      let match = matchType(lastTab, { type, isCountry, isProvince, isCity, isDistrict, isStreet })

      // 没有匹配到类型时null返回true不关闭，匹配到时返回false不允许下钻
      return match === null ? true : !match
    }

    return (
      <Main
        ref={ref}
        onBeforeSelect={handleBeforeSelect}
        value={value}
        list={listData}
        {...props}
      />
    )
  }
)

export default DistrictMain
