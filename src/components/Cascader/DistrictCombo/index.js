import React, { useRef, forwardRef, useEffect, useState } from 'react'
import _ from 'lodash'
import { Toast, Loading, ArrayUtil } from 'seedsui-react'
import formatValue from './formatValue'
import formatList from './formatList'
import getDisplayValue from './getDisplayValue'
import DistrictCombo from './DistrictCombo'
import api from './../DistrictMain/api'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

// 地址选择
const CascaderDistrictCombo = forwardRef(
  (
    {
      value: externalValue,
      // 初始列表, 国家或省市区数据
      list: externalList,
      // 开始于国家country, 省份province
      startType,
      getCountry = api.getCountry,
      getProvinceCityDistrict = api.getProvince,
      getStreet = api.getStreet,
      onChange,
      ...props
    },
    ref
  ) => {
    const districtComboRef = useRef(null)
    let [list, setList] = useState(externalList)

    // 格式化value和list: 补充parentid
    let valueRef = useRef(null)
    valueRef.current = formatValue(externalValue)

    formatList(list)

    useEffect(() => {
      initList()
      // eslint-disable-next-line
    }, [])

    // 开始于国家, 补充国家数据
    useEffect(() => {
      // 列表未初始化完成, 等待初始化完成后再匹配国家子数据
      if (!Array.isArray(list) || !list.length) return

      // 非国家选择
      if (startType !== 'country') return

      // 没有选中项，不知道补充哪个国家数据
      let currentCountryId = externalValue?.[0]?.id
      if (!currentCountryId) return

      // 获取国家
      let country = list.filter((item) => item.id === currentCountryId)?.[0]
      loadCountryChildren(country)

      // eslint-disable-next-line
    }, [JSON.stringify(externalValue)])

    // 初始列表
    async function initList() {
      if (Array.isArray(list) && list.length) return

      // 起始类型: 国家
      if (startType === 'country') {
        list = await getCountry()
        if (typeof list === 'string') {
          setList(list)
          return false
        }

        // 没有选中项，不知道补充哪个国家数据
        let currentCountryId = externalValue?.[0]?.id
        if (!currentCountryId) {
          setList(list)
          return true
        }

        // 获取国家省市区
        let country = list.filter((item) => item.id === currentCountryId)?.[0]
        let countryChildren = await loadCountryChildren(country)
        if (typeof countryChildren === 'string') {
          setList(countryChildren)
          return false
        }
      }
      // 起始类型: 省
      else {
        list = await getProvinceCityDistrict()
        if (typeof list === 'string') {
          setList(list)
          return false
        }
      }

      setList(list)
      return true
    }

    // 加载国家children省市区
    async function loadCountryChildren(country) {
      // 没有此国家, list或者value不正确
      if (!country) {
        let errMsg = `value或者list参数错误, list和value开始应当为国家`
        console.error(errMsg)
        return errMsg
      }

      if (_.isEmpty(country.children) && country?.id) {
        let regionData = await getProvinceCityDistrict(country.id)
        if (typeof regionData === 'string') {
          return regionData
        }
        country.children = regionData
      }
      return country.children
    }
    // 没有省市区数据先加载省市区
    // 加载街道
    async function loadData(tabs) {
      if (!Array.isArray(tabs) || !tabs.length) {
        return null
      }

      // 国家没有省市区, 则先补充省市区
      let countryOrProvince = list.filter((item) => item.id === tabs[0].id)?.[0]

      // value的第一项在list中找不到, 则报错
      if (!countryOrProvince) {
        console.error(`value参数错误, value应当从${startType === 'country' ? '国家' : '省'}开始`)
        return null
      }

      // 没有children, 肯定是country, 更新国家的children
      if (!countryOrProvince.children) {
        let country = countryOrProvince
        Loading.show()
        country.children = await getProvinceCityDistrict(country.id)
        Loading.hide()
        if (_.isEmpty(country.children)) {
          return null
        }

        // 后台返回的省市区数据parentid不正确, 强行纠正
        for (let child of country.children) {
          child.parentid = country.id
        }

        // 更新value的type属性
        districtComboRef?.current?.updateValueType?.(tabs, list)
      }

      // 获取下钻的子级
      let lastTab = tabs[tabs.length - 1]
      let parentTab = tabs?.[tabs.length - 2]

      // 获取下钻的子级: 同步获取
      let currentNode = ArrayUtil.getDeepTreeNode(list, lastTab.id)
      if (currentNode && !_.isEmpty(currentNode.children)) {
        return currentNode.children
      }

      // 获取下钻的子级: 异步获取
      Loading.show()
      let streets = await getStreet(lastTab.id)

      // 接口报错
      if (typeof streets === 'string') {
        Loading.hide()
        return streets
      }

      // 如果已经是街道了, 则请求上级
      if (streets === null && parentTab?.id) {
        // 标识isLeaf
        districtComboRef.current.updateIsLeaf(tabs, lastTab.id)

        // 如果是区获取不到街道, 则返回上级列表
        if (lastTab.type.includes('district')) {
          if (parentTab?.id) {
            let node = ArrayUtil.getDeepTreeNode(list, parentTab?.id)
            lastTab.isLeaf = true
            streets = node.children
          }
        }
        // 获取同级街道
        else {
          streets = await getStreet(parentTab.id)

          // 街道
          if (Array.isArray(streets) && streets.length) {
            // 因为是获取上级数据, 组件内根据lastTab.id无法设置children, 在此设置能提高加载性能
            ArrayUtil.setDeepTreeNode(list, parentTab.id, (node) => {
              node.children = streets
            })
          }
          // 无街道
          else {
            console.log('此级无街道')
          }
        }
      }

      if (typeof streets === 'string') {
        Toast.show({ content: streets })
      }
      Loading.hide()

      return streets
    }

    // 没有数据则不显示控件
    if (!list) return null

    // 数据错误
    if (typeof list === 'string') {
      let displayValue = props?.readOnly || props?.disabled ? getDisplayValue(externalValue) : ''
      return (
        <div className="input-wrapper">
          <div
            onClick={async () => {
              Loading.show()
              await initList()
              Loading.hide()
            }}
            style={props?.style}
            className={`input-text${displayValue ? '' : ' color-cancel'} ${props?.className || ''}`}
          >
            {displayValue ? displayValue : LocaleUtil.locale('获取地区数据失败, 点击重试')}
          </div>
        </div>
      )
    }

    // 单选
    return (
      <DistrictCombo
        value={valueRef.current}
        list={list}
        {...props}
        loadData={loadData}
        onChange={(newValue) => {
          onChange && onChange(newValue)
        }}
        ref={districtComboRef}
      />
    )
  }
)

export default CascaderDistrictCombo
