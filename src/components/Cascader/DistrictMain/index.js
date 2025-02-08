import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import _ from 'lodash'

import formatList from './formatList'
import DistrictMain from './DistrictMain'
import api from './api'

// 内库使用-start
import Toast from './../../Toast'
import Loading from './../../Loading'
import ArrayUtil from './../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { Toast, Loading, ArrayUtil } from 'seedsui-react'
测试使用-end */

// 地址选择
const CascaderDistrictMain = forwardRef(
  (
    {
      visible,
      value,
      // 初始列表, 国家或省市区数据
      list: externalList,
      // 开始于国家country, 省份province
      startType,
      type = 'street', // 'country', 'province', 'city', 'district', 'street'
      getCountry = api.getCountry,
      getProvinceCityDistrict = api.getProvince,
      getStreet = api.getStreet,
      ...props
    },
    ref
  ) => {
    // Cascader.Main并不记录与修改外部传入的list, 所以只能在外部格式化好再传入
    let [list, setList] = useState(formatList(externalList))

    // Expose api
    const districtMainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        ...districtMainRef.current,
        getList: getList
      }
    })

    useEffect(() => {
      if (visible) {
        initList()
      }
      // eslint-disable-next-line
    }, [visible])

    // 初始列表
    async function initList() {
      list = await getList()
      setList(list)
      return typeof list === 'string' ? false : true
    }

    // 获取国家省市区
    async function getList({ countryId } = {}) {
      if (Array.isArray(list) && list.length) {
        // 起始类型: 国家, 加载国家内的省市区数据
        if (startType === 'country') {
          let currentCountryId = countryId || value?.[0]?.id
          // 未选国家, 则先选国家
          if (!currentCountryId) {
            return list
          }

          // 已选国家, 补充国家省市区
          let country = null
          for (let item of list) {
            if (item.id === currentCountryId) {
              country = item
              break
            }
          }
          if (country?.children) {
            return list
          }

          // 国家无省市区数据, 加载省市区数据
          let province = await getProvinceCityDistrict(country?.id)
          if (typeof province === 'string') {
            return province
          }
          country.children = province
        }
        // 起始类型: 省, 直接返回列表即可
        else {
          return list
        }
      }

      let newList = null
      // 起始类型: 国家
      if (startType === 'country') {
        newList = await getCountry()
        if (typeof newList === 'string') {
          return newList
        }

        // 没有选中项，不知道补充哪个国家数据, 列表为国家数据
        let currentCountryId = value?.[0]?.id
        if (!currentCountryId) {
          return formatList(newList)
        }

        // 获取国家省市区
        let country = newList.filter((item) => item.id === currentCountryId)?.[0]

        // 没有此国家, list或者value不正确
        if (!country) {
          return `value参数错误, value开始应当为国家`
        }

        let province = await getProvinceCityDistrict(country?.id)
        if (typeof province === 'string') {
          return province
        }
        country.children = province
      }
      // 起始类型: 省
      else {
        newList = await getProvinceCityDistrict()
        if (typeof newList === 'string') {
          return newList
        }
      }

      return formatList(newList)
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
    async function loadData(tabs, { action } = {}) {
      if (!Array.isArray(tabs) || !tabs.length) {
        return null
      }

      // 获取下钻的子级
      let lastTab = tabs[tabs.length - 1]
      let parentTab = tabs?.[tabs.length - 2]

      // 没有国家省市区, 则先加载国家省市区
      Loading.show()
      list = await getList(startType === 'country' ? { countryId: tabs[0].id } : undefined)
      Loading.hide()

      // 只有加载和重新加载时, 只有错误时才能setList更新错误信息, setList([..])会触发Main中的useEffect list, 会再次执行update->loadData
      if (typeof list === 'string') {
        action === 'load' && setList(list)
        return list
      }

      // 获取下钻的子级: 同步获取
      let currentNode = ArrayUtil.getDeepTreeNode(list, lastTab.id)
      if (currentNode && !_.isEmpty(currentNode.children)) {
        return currentNode.children
      }

      // 获取下钻的子级: 异步获取
      Loading.show()
      let streets = await getStreet(lastTab.id, { parent: lastTab })

      // 接口报错
      if (typeof streets === 'string') {
        Loading.hide()
        // 只有加载和重新加载时, 错误时才能setList更新错误信息, setList([..])会触发Main中的useEffect list, 会再次执行update->loadData
        action === 'load' && setList(streets)
        return streets
      }

      // 如果已经是街道了, 则请求上级
      if (streets === null && parentTab?.id) {
        // 标识isLeaf
        districtMainRef.current.updateIsLeaf(tabs, lastTab.id)

        // 如果上级是区市, 则根据区市获取街道
        if (lastTab.type.includes('district')) {
          if (parentTab?.id) {
            let node = ArrayUtil.getDeepTreeNode(list, parentTab?.id)
            lastTab.isLeaf = true
            streets = node.children
          }
        }
        // 获取同级街道
        else {
          streets = await getStreet(parentTab.id, { parent: parentTab })

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
        value={value}
        type={type}
        list={
          ['country', 'province', 'city', 'district', 'street'].includes(type)
            ? list
            : LocaleUtil.locale(
                'Incorrect parameter. type can only pass country, province, city, district, street'
              )
        }
        {...props}
        loadData={loadData}
        onReLoad={async ({ update }) => {
          update({ action: 'load' })
        }}
        ref={districtMainRef}
      />
    )
  }
)

export default CascaderDistrictMain
