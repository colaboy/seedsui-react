import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { getMinTypes, matchType, testCity, testDistrict } from './utils'
import CascaderCombo from './../Combo'

// 级联选择
export default forwardRef(
  (
    {
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      min = '',
      // 判断是否是国省市区
      isCountry,
      isProvince,
      isCity,
      isDistrict,
      isStreet,
      value,
      list,
      loadList,
      onBeforeSelectOption,
      // 确定按钮需要根据min来判断显隐
      submitProps,
      ...props
    },
    ref
  ) => {
    const listData = useRef(list)
    const [visible, setVisible] = useState(false)
    // 是否显示右上角确认按钮
    let [submitVisible, setSubmitVisible] = useState(null)

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

    // 根据min判断是否显示确定按钮
    function updateSubmitVisible() {
      let tabs = null
      // 默认读取点击后选中的最后一项
      if (Array.isArray(listData.tabs) && listData.tabs.length) {
        tabs = listData.tabs
      }
      // 如果没有选中项, 说明是初始化，则读取传入值的最后一项
      if (!tabs) tabs = Array.isArray(value) && value.length ? value : null

      // 如果即没点击, 又没有传入初始值，则默认不显示提交按钮
      if (!tabs) {
        submitVisible = false
        return
      }

      submitVisible = null

      // 选中的末级
      let lastTab = tabs[tabs.length - 1]

      // 获取末级类型
      let lastTabType = matchType(lastTab, {
        isCountry,
        isProvince,
        isCity,
        isDistrict,
        isStreet
      })
      // 没有类型则可能是街道，如果上级是区或者市，则必定是街道
      if (!lastTabType && tabs.length > 2) {
        let prevTab = tabs[tabs.length - 2]
        if (testDistrict(prevTab, isDistrict)) {
          lastTabType = 'street'
        } else if (testCity(prevTab, isCity)) {
          lastTabType = 'street'
        }
      }

      // 最小支持的类型集合
      if (getMinTypes(min).includes(lastTabType)) {
        submitVisible = true
      } else {
        submitVisible = false
      }
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    function handleBeforeSelectOption(tabs) {
      if (!type && !min) return true
      if (!Array.isArray(tabs) || !tabs.length) return true

      // 自行解决省市区判断
      if (onBeforeSelectOption) return onBeforeSelectOption(tabs)

      // 根据最小类型, 判定是否显示确定按钮
      if (min) {
        // 记录点击的最后一项
        listData.tabs = tabs
        updateSubmitVisible()
        setSubmitVisible(submitVisible)
      }

      // 匹配类型，没传类型则允许下钻
      if (!type) return true

      // 获取当前选中项
      let lastTab = tabs[tabs.length - 1]
      let match = matchType(lastTab, { type, isCountry, isProvince, isCity, isDistrict, isStreet })
      // 没有匹配到类型时null返回true不关闭，匹配到时返回false不允许下钻
      return match === null ? true : !match
    }

    if (!visible) return null

    // 根据最小类型, 判定是否显示确定按钮
    if (min) {
      updateSubmitVisible()
    }

    // 显示右上角的按钮
    // eslint-disable-next-line
    if (!submitProps) submitProps = {}
    if (submitVisible !== null) {
      // eslint-disable-next-line
      submitProps = {
        visible: submitVisible,
        ...submitProps
      }
    }

    return (
      <CascaderCombo
        onBeforeSelectOption={handleBeforeSelectOption}
        ref={ref}
        value={value}
        list={listData.current}
        submitProps={submitProps}
        {...props}
      />
    )
  }
)
