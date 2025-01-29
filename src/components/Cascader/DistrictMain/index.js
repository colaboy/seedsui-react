import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import _ from 'lodash'
import { Toast, Loading, ArrayUtil } from 'seedsui-react'
import formatValue from './formatValue'
import formatList from './formatList'
import DistrictMain from './DistrictMain'
import api from './api'

// 地址选择
const CascaderDistrictMain = forwardRef(
  (
    {
      visible,
      value: externalValue,
      // 初始列表, 国家或省市区数据
      list: externalList,
      // 开始于国家country, 省份province
      startType,
      getCountry = api.getCountry,
      getProvinceCityDistrict = api.getProvince,
      getStreet = api.getStreet,
      ...props
    },
    ref
  ) => {
    let [list, setList] = useState(formatList(externalList))

    // 格式化value和list: 补充parentid, 外部更新value时, 内部使用最新的value
    let valueRef = useRef(null)
    valueRef.current = formatValue(externalValue)

    // Expose api
    const districtMainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return districtMainRef.current
    })

    useEffect(() => {
      if (visible) {
        initList()
      }
      // eslint-disable-next-line
    }, [visible])

    // 初始列表
    async function initList() {
      if (Array.isArray(list) && list.length) return
      Loading.show()

      // 起始类型: 国家
      if (startType === 'country') {
        list = await getCountry()
        if (typeof list === 'string') {
          Loading.hide()
          setList(list)
          return false
        }

        // 没有选中项，不知道补充哪个国家数据, 列表为国家数据
        let currentCountryId = externalValue?.[0]?.id
        if (!currentCountryId) {
          Loading.hide()
          setList(formatList(list))
          return true
        }

        // 获取国家省市区
        let country = list.filter((item) => item.id === currentCountryId)?.[0]
        let countryChildren = await loadCountryChildren(country)
        if (typeof countryChildren === 'string') {
          Loading.hide()
          setList(countryChildren)
          return false
        }
      }
      // 起始类型: 省
      else {
        list = await getProvinceCityDistrict()
        if (typeof list === 'string') {
          Loading.hide()
          setList(list)
          return false
        }
      }

      Loading.hide()
      setList(formatList(list))
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
        districtMainRef?.current?.updateValueType?.(tabs, list)
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
        districtMainRef.current.updateIsLeaf(tabs, lastTab.id)

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

    return (
      <DistrictMain
        visible={visible}
        value={valueRef.current}
        list={list}
        {...props}
        loadData={loadData}
        onReLoad={() => {
          initList()
        }}
        ref={districtMainRef}
      />
    )
  }
)

export default CascaderDistrictMain
