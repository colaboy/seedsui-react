import React, { forwardRef, useEffect, useRef, useState } from 'react'
import CascaderCombo from './../Combo'

// 级联选择
export default forwardRef(
  (
    {
      type = '', // country | province | city | district (province、city、district只有中国时才生效, 因为只有中国有省市区)
      // 判断是否是国省市区
      isCountry,
      isProvince,
      isCity,
      isDistrict,
      list,
      loadList,
      onBeforeSelectOption,
      ...props
    },
    ref
  ) => {
    const listData = useRef(list)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      initList()
    }, []) // eslint-disable-line

    async function initList() {
      listData.current = list
      // 列表存在则显示弹窗
      if (Array.isArray(listData.current) && listData.current.length) {
        setVisible(true)
        return
      }
      // 异步加载列表
      if (typeof loadList === 'function') {
        listData.current = await loadList()
      }
      if (Array.isArray(listData.current) && listData.current.length) {
        setVisible(true)
        return
      }

      // 读取默认列表或者缓存
      if (Object.isEmptyObject(window.__SeedsUI_Cascader_DistrictCombo_list__)) {
        window.__SeedsUI_Cascader_DistrictCombo_list__ = require('./China')
        if (window.__SeedsUI_Cascader_DistrictCombo_list__.default) {
          window.__SeedsUI_Cascader_DistrictCombo_list__ =
            window.__SeedsUI_Cascader_DistrictCombo_list__.default
        }
      }
      listData.current = window.__SeedsUI_Cascader_DistrictCombo_list__ || null
      setVisible(true)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    function handleBeforeSelectOption(tabs) {
      if (!type) return true
      if (!Array.isArray(tabs) || !tabs.length) return true

      // 自行解决省市区判断
      if (onBeforeSelectOption) return onBeforeSelectOption(tabs)

      // 获取当前选中项
      let lastTab = tabs[tabs.length - 1]

      // 获取所有省市, 用于匹配选中的省市
      if (Object.isEmptyObject(window.__SeedsUI_Cascader_DistrictCombo_areaLevel__)) {
        window.__SeedsUI_Cascader_DistrictCombo_areaLevel__ = require('./ChinaAreaLevel')
        if (window.__SeedsUI_Cascader_DistrictCombo_areaLevel__.default) {
          window.__SeedsUI_Cascader_DistrictCombo_areaLevel__ =
            window.__SeedsUI_Cascader_DistrictCombo_areaLevel__.default
        }
      }
      let AreaLevel = window.__SeedsUI_Cascader_DistrictCombo_areaLevel__ || null
      if (!AreaLevel) return true

      // 匹配国家, id相同或者名称相近即可匹配, 因为国家是一级
      if (type === 'country') {
        if (typeof isCountry === 'function') {
          return isCountry(lastTab)
        }
        if (lastTab.isCountry) {
          return true
        }
        for (let province of AreaLevel.countries) {
          if (
            lastTab.id === province.id ||
            province.name.indexOf(lastTab.name) !== -1 ||
            lastTab.name.indexOf(province.name) !== -1
          ) {
            return false
          }
        }
      }
      // 匹配省名, id相同或者名称相近即可匹配, 因为省是一或者二级
      else if (type === 'province') {
        if (typeof isProvince === 'function') {
          return isProvince(lastTab)
        }
        if (lastTab.isProvince) {
          return true
        }
        for (let province of AreaLevel.provinces) {
          if (
            lastTab.id === province.id ||
            province.name.indexOf(lastTab.name) !== -1 ||
            lastTab.name.indexOf(province.name) !== -1
          ) {
            return false
          }
        }
      }
      // 匹配市名, id相同或者包含市, 因为吉林省吉林市不能根据名称匹配, 否则可能会选到省
      else if (type === 'city') {
        if (typeof isCity === 'function') {
          return isCity(lastTab)
        }
        if (lastTab.isCity) {
          return true
        }
        for (let city of AreaLevel.cities) {
          if (lastTab.id === city.id || lastTab.name.indexOf('市') !== -1) {
            return false
          }
        }
      }
      // 区判断
      else if (type === 'district') {
        if (typeof isDistrict === 'function') {
          return isDistrict(lastTab)
        }
        if (lastTab.isDistrict) {
          return false
        }
      }
      return true
    }

    if (!visible) return null
    return (
      <CascaderCombo
        onBeforeSelectOption={handleBeforeSelectOption}
        ref={ref}
        list={listData.current}
        {...props}
      />
    )
  }
)
